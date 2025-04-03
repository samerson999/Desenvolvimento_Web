'use client';

import { signIn } from 'next-auth/react'
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useRegisterModal from '@/app/hooks/userRegisterModal';
import useLoginModal from '@/app/hooks/userLoginModal';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);

            if(callback?.ok){
                toast.success('Acessado com sucesso!');
                router.refresh()
                loginModal.onClose();
            }

            if(callback?.error){
                toast.error(callback.error)
            }
        })
    };

    const handleValidationErrors = () => {
        const { name, email, password } = getValues();
        
        if (!name && !email && !password) {
            toast.error('Preencha todos os campos antes de continuar.');
            return;
        }
        if (errors.email) {
            toast.error('O email é obrigatório.');
        }
        if (errors.password) {
            toast.error('A senha é obrigatória.');
        }
    };

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title="Bem-vindo de volta ao LocaFy" subtitle="Acesse sua conta" center />
            <Input id="email" label="Digite seu Email" disabled={isLoading} register={register} errors={errors} required />

            <Input id="password" type="password" label="Digite uma Senha" disabled={isLoading} register={register} errors={errors} required />
        </div>
    );

    const footerContent = (
       <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
                outline
                label="Cadastre-se com o Google"
                icon={FcGoogle}
                onClick={() => {}}
            />

            <div 
                className='
                text-neutral-600 
                text-center
                mt-4
                font-light
                '
                >
                <div className='flex flex-row items-center justify-center gap-2'>
                    <div>Não tem uma conta?</div>
                    <div
                    onClick={registerModal.onClose}
                        className='
                            text-blue-900
                            cursor-pointer
                            hover:underline
                        '
                    >Cadastre-se</div>
                </div>
            </div>
       </div> 
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Acessar Conta"
            actionLabel="Continuar"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit, handleValidationErrors)} 
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;
