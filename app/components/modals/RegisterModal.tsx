'use client';

import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/userRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios
            .post('/api/register', data)
            .then(() => {
                toast.success('Conta criada com sucesso!');
                registerModal.onClose();
            })
            .catch(() => {
                toast.error('Erro ao cadastrar. Tente novamente!');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleValidationErrors = () => {
        const { name, email, password } = getValues();
        
        if (!name && !email && !password) {
            toast.error('Preencha todos os campos antes de continuar.');
            return;
        }
        if (errors.name) {
            toast.error('O nome é obrigatório.');
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
            <Heading title="Bem-vindo ao LocaFy" subtitle="Crie uma conta" center />
            <Input id="email" label="Digite seu Email" disabled={isLoading} register={register} errors={errors} required />
            <Input id="name" label="Digite o seu Nome" disabled={isLoading} register={register} errors={errors} required />
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
                    <div>Já tem uma conta?</div>
                    <div
                    onClick={registerModal.onClose}
                        className='
                            text-blue-900
                            cursor-pointer
                            hover:underline
                        '
                    >Acessar a conta</div>
                </div>
            </div>
       </div> 
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Cadastrar"
            actionLabel="Continuar"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit, handleValidationErrors)} 
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default RegisterModal;
