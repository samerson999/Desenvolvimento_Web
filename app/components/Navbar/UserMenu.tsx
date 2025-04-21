"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useReducer, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/userRegisterModal";
import useLoginModal from "@/app/hooks/userLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface UserMenuProps {
    currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <Link
                    href="/advertisePage"
                    onClick={() => {}}
                    className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-neutral-100
                        transition
                        cursor-pointer
                    "
                >
                    Anuncie seu Espaço
                </Link>
                <div
                    onClick={toggleOpen}
                    className="
                        p-4
                        md:py-1
                        md: px-3
                        border-[1px]
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                    "
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    className="
                        absolute
                        rounded-xl
                        shadow-md
                        w-[40vw]
                        md:w-3/4
                        bg-white
                        overflow-hidden
                        right-0
                        top-12
                        text-sm
                    "
                >
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem onClick={() => {}} label="Minhas Reservas" />
                                <MenuItem onClick={() => {}} label="Meus Favoritos" />
                                <MenuItem onClick={() => signOut()} label="Sair da Conta" />
                            </>
                        ) : (
                            <>
                                <MenuItem onClick={loginModal.onOpen} label="Entrar" />
                                <MenuItem onClick={registerModal.onOpen} label="Cadastrar" />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
