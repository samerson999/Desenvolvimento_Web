"use client";

import { useMemo, useState, useEffect } from "react";
import useRentModal from "@/app/hooks/userRentModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import Heading from "../Heading";
import { categories } from "../Navbar/Categories";
import dynamic from "next/dynamic";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Filter } from 'bad-words'; // <-- 1. IMPORTAR O FILTRO AQUI

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  // <-- 2. CONFIGURAR O FILTRO DENTRO DO COMPONENTE
  // Usamos useMemo para que a lista não seja recriada a cada renderização
  const filter = useMemo(() => {
    const customFilter = new Filter();
    const palavrasInapropriadas = [
      "sexo", "puta", "caralho", "merda", "bosta", "porra", "cacete", "cu",
      "viado", "buceta", "pica", "arrombado", "foda", "fodido", "corno", "escroto",
      "otário", "fdp", "babaca", "desgraça", "vagabunda", "vagabundo", "nojento",
      "prostituta", "pau no cu", "pau no seu cu", "filho da puta", "cuzão",
      "retardado", "piranha", "enfia", "estupra", "estuprador", "estupro",
      "transa", "transar", "gozar", "gozo", "ejacular", "chupeta", "xereca",
      "rola", "anal", "oral", "boquete", "masturbação", "masturbar",
      "punheta", "siririca"
    ];
    customFilter.addWords(...palavrasInapropriadas);
    return customFilter;
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    trigger,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      wifiCount: 1,
      bathroomCount: 1,
      acCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });
  
  useEffect(() => {
    register('category', { required: 'Por favor, escolha uma categoria.' });
    register('location', { required: 'Por favor, selecione uma localização.' });
    register('imageSrc', { required: 'Por favor, envie uma imagem.' });
  }, [register]);

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const wifiCount = watch("wifiCount");
  const bathroomCount = watch("bathroomCount");
  const acCount = watch("acCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: unknown) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };
  
  const onNext = async () => {
    const fieldsByStep: (keyof FieldValues)[][] = [
        ['category'],
        ['location'],
        [],
        ['imageSrc'],
        ['title', 'description'],
        ['price']
    ];
    const currentFields = fieldsByStep[step];
    if (currentFields.length > 0) {
        const isValid = await trigger(currentFields);
        if (!isValid) {
            return;
        }
    }
    setStep((value) => value + 1);
  };
  
  const onFinalSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Espaço Anunciado!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch((error) => {
        toast.error(error?.response?.data || "Alguma coisa deu errado");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => (step === STEPS.PRICE ? "Anunciar" : "Próximo"), [step]);
  const secondaryActionLabel = useMemo(() => (step === STEPS.CATEGORY ? undefined : "Voltar"), [step]);
  
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Qual a melhor CATEGORIA para o seu espaço?" subtitle="Escolha uma Categoria" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput onClick={(cat) => setCustomValue("category", cat)} selected={category === item.label} label={item.label} icon={item.icon} />
          </div>
        ))}
      </div>
      {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message as string}</p>}
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Qual o ENDEREÇO do seu local?" subtitle="Não fique fora do radar, mostre onde seu local está." />
            <CountrySelect value={location} onChange={(value) => setCustomValue("location", value)} />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message as string}</p>}
            <Map center={location?.latlng} />
        </div>
    );
  }
  
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Quais RECURSOS o seu local oferece?" subtitle="Mostre o que torna o seu espaço ainda melhor" />
        <Counter title="Ambientes/Quartos" subtitle="Quantos ambientes seu espaço possui?" value={roomCount} onChange={(value) => setCustomValue("roomCount", value)} />
        <Counter title="Quantidade de Pessoas" subtitle="Qual a capacidade máxima?" value={guestCount} onChange={(value) => setCustomValue("guestCount", value)} />
        <Counter title="Pontos de Wi-Fi" subtitle="Quanto mais, melhor a conectividade!" value={wifiCount} onChange={(value) => setCustomValue("wifiCount", value)} />
        <Counter title="Banheiros" subtitle="Quantos banheiros disponíveis?" value={bathroomCount} onChange={(value) => setCustomValue("bathroomCount", value)} />
        <Counter title="Ar-condicionado" subtitle="Quantos aparelhos para garantir o conforto?" value={acCount} onChange={(value) => setCustomValue("acCount", value)} />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
     bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Inclua fotos do seu local" subtitle="Mostre o que torna seu espaço único" />
            <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
            {errors.imageSrc && <p className="text-red-500 text-sm mt-1">{errors.imageSrc.message as string}</p>}
        </div>
    )
  }
  
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Como você descreveria seu local?" subtitle=" Uma descrição simples já faz a diferença" />
        <Input id="title" label="Título" disabled={isLoading} register={register} errors={errors} required validation={{
            maxLength: { value: 50, message: "O título pode ter no máximo 50 caracteres." },
            validate: (value: string) => !filter.isProfane(value) || "O título contém palavras inadequadas."
        }} />
        <hr />
        <Input id="description" label="Descrição" disabled={isLoading} register={register} errors={errors} required validation={{
            maxLength: { value: 500, message: "A descrição pode ter no máximo 500 caracteres." },
            validate: (value: string) => !filter.isProfane(value) || "A descrição contém palavras inadequadas."
        }} />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
      bodyContent = (
          <div className="flex flex-col gap-8">
              <Heading title=" Estabeleça seu valor de locação" subtitle="Quanto você cobra pelo uso do espaço?" />
              <Input id="price" label="Preço" formatPrice type="number" disabled={isLoading} register={register} errors={errors} required validation={{
                  min: { value: 1, message: "O preço mínimo é R$1." },
                  max: { value: 100000, message: "O preço máximo é R$100.000." }
              }} />
          </div>
      )
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={step === STEPS.PRICE ? handleSubmit(onFinalSubmit) : onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Anuncie seu Espaço"
      body={bodyContent}
    />
  );
};

export default RentModal;