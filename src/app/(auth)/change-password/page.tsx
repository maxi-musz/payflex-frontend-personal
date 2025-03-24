"use client"

import Loading from '@/app/loading';
import AuthPagesHeader from '@/components/AuthPagesHeader';
import AuthPagesRightSide from '@/components/AuthPagesRightSide';
import ButtonOne from '@/components/button/ButtonOne';
import { showToast } from '@/components/HotToast';
import InputFieldFloatingLabel from '@/components/inputs/InputFieldFloatingLabel';
import { updatePassword } from '@/features/auth/actions';
import { newPasswordSchema, NewPasswordType } from '@/features/auth/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { Key, RemoveRedEyeOutlined } from '@mui/icons-material';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

interface ChangenewPasswordPageProps {
    data?: NewPasswordType;
}

const ChangenewPasswordPage: React.FC<ChangenewPasswordPageProps> = ({ data }) => {
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handlePasswordToggle = () => setIsPasswordOpen(prev => !prev);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm<NewPasswordType>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: data,
    });
    
    const onFormSubmit = handleSubmit(async (data) => {
        // console.log('zod form data', data);
        try {
            setIsLoading(true);
            const res = await updatePassword(data.email, data.new_password);
            // console.log('res data', res);
            
            if (res.success) {
                router.push('/login');
                showToast(`${res.message}`);
            }
            setIsLoading(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                showToast(`${error.message}`, 'error');
                setIsLoading(false);
                // console.error(error.message);
                // throw new Error(error.response?.data?.message || 'Something went wrong');
            } else {
                showToast(`Something went wrong`, 'error');
                console.error('An unexpected error occurred');
                throw new Error('Something went wrong');
            }
        }
    });
    
    if (isLoading) {
        return <Loading />;
    };
    
  return (
    <div className='h-full min-h-screen w-full flex flex-col md:flex-row '>
        <div className='order-2 md:order-1 w-full md:w-1/2 h-fit py-8 md:h-screen min-h-full flex items-center justify-center'>
            <div className="flex flex-col gap-6 w-[90%] md:w-[50%]">
                <AuthPagesHeader />

                <div className="self-start">
                    <h1 className='text-2xl font-semibold'>Change Password</h1>
                    <p className='text-base'>Please enter your new Password.</p>
                </div>

                <div className="w-full">
                    <form onSubmit={onFormSubmit} className="w-full space-y-5">
                        <div className="w-full mb-3">
                            <InputFieldFloatingLabel
                                {...register("email")}
                                floatingLabel="Email Address"
                                error={errors.email}
                                required
                                classes='w-full'
                            />
                        </div>
                        <div className="w-full mb-3">
                            <InputFieldFloatingLabel
                                floatingLabel='Your New Password'
                                icon2={!isPasswordOpen ? <RemoveRedEyeOutlined style={{fontSize: '19px', }} /> : <Key style={{fontSize: '19px', }} />}
                                onClick={handlePasswordToggle}
                                type={!isPasswordOpen ? 'password' : 'text'}
                                {...register("new_password")}
                                error={errors.new_password}
                                required
                                classes='w-full'
                            />
                        </div>

                        <ButtonOne type='submit' classes='py-2 px-16 w-full' btnText1='Change Password' />
                        
                        <p className='text-center text-sm'>Don&apos;t have an account? <Link href='/register' className='text-blue-600'>Sign up</Link></p>
                    </form>
                </div>
            </div>
        </div>

        <AuthPagesRightSide />
    </div>
  )
}

export default ChangenewPasswordPage;