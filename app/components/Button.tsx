'use client'

import { IconType } from "react-icons";


interface ButtonProps{
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disable?: boolean
    outline?: boolean
    small?: boolean
    icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disable,
    outline,
    small,
    icon: Icon
}) => {
    return ( 
        <button
            onClick={onClick}
            disabled={disable}
            className={`
                    relative
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    rounded-lg
                    hover:opacity-80
                    transition
                    w-full
                    ${outline ? 'bg-white' : 'bg-blue-900'}
                    ${outline ? 'text-black' : 'text-white'}
                    ${small ? 'py-1' : 'py-3'}
                    ${small ? 'text-sm' : 'text-md'}
                    ${small ? 'font-light' : 'font-semibold'}
                    ${small ? 'border-[1px]' : 'border-2'}
                `}

        >
            {Icon && (
                <Icon
                    size={24}
                    className="absolute left-4 top-3"
                />
            )}
            {label}
        </button>
     );
}
 
export default Button;