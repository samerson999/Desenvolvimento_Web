"use client";

import { FormProvider, useForm } from "react-hook-form";
import FormInput from "../components/inputs/FormInput";

export default function AdvertisePage() {
    const form = useForm<{
        title: string;
        price: number;
        locationValue: string;
        roomCount: number;
        bathroomCount: number;
        guestCount: number;
        category: string;
        description: string;
    }>();

    const {
        formState: { errors },
    } = form;

    function onSubmit(data: any) {
        console.log(data);
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto px-4 py-32">
                <h1 className="text-2xl font-bold mb-6">Informações do local</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput name="title" label="Nome do local" placeholder="Nome do local" required />
                    <FormInput name="price" label="Valor" type="number" placeholder="Valor" required />
                    <FormInput name="locationValue" label="Endereço completo" type="text" placeholder="Endereço completo" required />
                    <FormInput name="roomCount" label="Quartos" type="number" placeholder="Quartos" required />
                    <FormInput name="bathroomCount" label="Banheiros" type="number" placeholder="Banheiros" required />
                    <FormInput name="guestCount" label="Capacidade" type="number" placeholder="Capacidade" required />

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                            Categoria
                        </label>
                        <select
                            {...form.register("category", { required: "Selecione uma categoria" })}
                            id="category"
                            name="category"
                            className={`w-full border border-gray-300 rounded-md px-3 py-2 ${errors.category ? "border-red-500" : "border-gray-300"}`}
                        >
                            <option value="">Selecione uma categoria</option>
                            <option value="casa">Casa</option>
                            <option value="apartamento">Apartamento</option>
                            <option value="quarto">Quarto</option>
                            <option value="comercial">Comercial</option>
                            <option value="temporada">Temporada</option>
                        </select>

                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Descrição
                        </label>
                        <textarea
                            {...form.register("description", {
                                required: "A descrição é obrigatória",
                                minLength: {
                                    value: 10,
                                    message: "Descrição deve ter no mínimo 10 caracteres",
                                },
                            })}
                            id="description"
                            name="description"
                            rows={4}
                            className={`w-full border rounded-md px-3 py-2 ${errors.description ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Descrição"
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2">Upload de mídia</h2>
                    <button type="button" className="border-2 border-dashed border-gray-400 w-full py-12 text-center text-gray-600 hover:bg-gray-50">
                        Selecionar arquivo
                    </button>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2">Nossa política de cancelamento</h2>
                    <div className="space-y-2">
                        {[1, 2, 3].map((num) => (
                            <details key={num} className="border rounded p-4">
                                <summary className="font-medium text-gray-700">Política {num}</summary>
                                <p className="text-gray-600 mt-2">Explicação da política {num}.</p>
                            </details>
                        ))}
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2">Métodos de pagamento</h2>
                    <div className="flex gap-4">
                        <label>
                            <input type="checkbox" /> Pix
                        </label>
                        <label>
                            <input type="checkbox" /> Cartão de crédito
                        </label>
                        <label>
                            <input type="checkbox" /> Dinheiro
                        </label>
                    </div>
                </div>
                <button type="submit" className="mt-8 bg-blue-500 text-white px-4 py-2 rounded">
                    Adicionar novo local
                </button>
            </form>
        </FormProvider>
    );
}
