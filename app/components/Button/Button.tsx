"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
}

const Button: React.FC<ButtonProps> = ({ children, variant = "primary", className, ...props }) => {
    const baseStyles = "rounded-md font-medium px-4 py-2 transition duration-200";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-black text-white hover:bg-gray-800",
        outline: "border border-gray-500 text-gray-700 hover:bg-gray-100",
    };

    return (
        <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
