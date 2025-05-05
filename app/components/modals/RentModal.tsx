"use client";

import { useMemo, useState } from "react";

import useRentModal from "@/app/hooks/userRentModal";
import { FieldValues, useForm } from "react-hook-form";

import Modal from "./Modal";

import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";

import Heading from "../Heading";
import { categories } from "../Navbar/Categories";
import dynamic from "next/dynamic";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
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

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const wifiCount = watch("wifiCount");
  const bathroomCount = watch("bathroomCount");
  const acCount = watch("acCount");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step == STEPS.PRICE) {
      return "Anunciar";
    }

    return "Próximo";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step == STEPS.CATEGORY) {
      return undefined;
    }

    return "Voltar";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Qual a melhor CATEGORIA para o seu espaço?"
        subtitle="Escolha uma Categoria"
      />
      <div
        className="
                   grid 
                   grid-cols-1
                   md:grid-cols-2
                   gap-3
                   max-h-[50vh]
                   overflow-y-auto
                "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category == item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step == STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Qual o ENDEREÇO do seu local?"
          subtitle="Não fique fora do radar, mostre onde seu local está."
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />

        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step == STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Quais RECURSOS o seu local oferece?"
          subtitle="Mostre o que torna o seu espaço ainda melhor"
        />
        <Counter
          title="Quantidade de Pessoas"
          subtitle="Nos ajude a entender o movimento "
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <Counter
          title="Pontos de Wi-Fi"
          subtitle="Quanto mais, melhor a conectividade!"
          value={wifiCount}
          onChange={(value) => setCustomValue("wifiCount", value)}
        />
        <Counter
          title="Banheiros"
          subtitle="Quantos banheiros disponíveis para os visitantes?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
        <Counter
          title="Ar-condicionado"
          subtitle="Quantos aparelhos para garantir o conforto?"
          value={acCount}
          onChange={(value) => setCustomValue("acCount", value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
      title="Anuncie seu Espaço"
      body={bodyContent}
    />
  );
};

export default RentModal;
