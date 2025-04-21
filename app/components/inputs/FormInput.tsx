"use client";

import { useFormContext } from "react-hook-form";

interface FormInputProps {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ name, label, type = "text", placeholder, required, disabled }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const hasError = !!errors[name];

    return (
        <div className="w-full">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                {...register(name, { required })}
                className={`
                    w-full 
                    border 
                    px-3 
                    py-2 
                    rounded-md 
                    transition 
                    outline-none
                    ${hasError ? "border-red-500" : "border-gray-300"}
                    ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
                `}
            />
            {hasError && <p className="text-sm text-red-500 mt-1">Este campo é obrigatório.</p>}
        </div>
    );
};

export default FormInput;
