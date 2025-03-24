"use client"

import Loading from '@/app/loading';
import AuthPagesHeader from '@/components/AuthPagesHeader';
import AuthPagesRightSide from '@/components/AuthPagesRightSide';
import ButtonOne from '@/components/button/ButtonOne';
import { showToast } from '@/components/HotToast';
import InputFieldFloatingLabel from '@/components/inputs/InputFieldFloatingLabel';
import { resetPassword } from '@/features/auth/actions';
import { passwordRecoverySchema, PasswordRecoveryType } from '@/features/auth/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';

const OTPConfirmModal = dynamic(() => import("@/components/OTPConfirmModal"), {
    loading: () => <Loading />,
  });

  interface ForgotPasswordProps {
    data?: PasswordRecoveryType;
}

const ForgotPasswordPage: React.FC<ForgotPasswordProps> = ({ data }) => {
    const [isOTPOpen, setIsOTPOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
        const [isVerified, setIsVerified] = useState(false);
    const [emailAddress, setEmailAddress] = useState('');
    
    
    const closeOTPModal = () => {
        setIsOTPOpen(false);
        
        if (!isOTPOpen && !isVerified) {
            showToast(`Your email address has not been verified!`);
        }
    };

    
    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm<PasswordRecoveryType>({
        resolver: zodResolver(passwordRecoverySchema),
        defaultValues: data,
    });
    
    const onFormSubmit = handleSubmit(async (data) => {
        // console.log('zod form data', data);
        try {
            setIsLoading(true);
            const res = await resetPassword(data.email);
            // console.log('res data', res);
            
            if (res.success) {
                showToast(`${res.message}`);
                setIsOTPOpen(true);
            }
            setIsLoading(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // console.error(error.message);
                throw new Error(error.response?.data?.message || 'Something went wrong');
            } else {
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
        <Toaster position="top-center" reverseOrder={false} />
        <div className='w-full flex flex-col md:flex-row items-center justify-center'>
            <div className='overflow-hidden order-2 md:order-1 w-full md:w-1/2 h-fit py-8 md:h-screen min-h-full'>
                <div className="flex flex-col gap-6 w-[90%] md:w-[50%] h-1/2 mx-auto pt-1 md:pt-16">
                    <AuthPagesHeader />

                    <div className="self-start">
                        <h1 className='text-2xl font-semibold'>Forgot password</h1>
                        <p className='text-base'>Please enter your email.</p>
                    </div>

                    <div className="w-full">
                        <form onSubmit={onFormSubmit} className="w-full space-y-3">
                            <div className="w-full flex items-center gap-2">
                                <div className="w-[75%]">
                                    <InputFieldFloatingLabel
                                        {...register("email")}
                                        floatingLabel="Enter your email address"
                                        error={errors.email}
                                        required
                                        classes='w-full'
                                        onChange={(e) => setEmailAddress(e.target.value)}
                                    />                                    
                                </div>
                                
                                <ButtonOne type='submit' classes='py-[10px] px-2 w-[25%] text-sm text-center rounded-xl' btnText1='Verify' />
                            </div>
                            
                            <p className='text-center text-sm'>Don&apos;t have an account? <Link href='/register' className='text-blue-600'>Sign up</Link></p>
                        </form>
                    </div>
                </div>

                {isOTPOpen && 
                <OTPConfirmModal
                    cancelEmailVerification={closeOTPModal}
                    handleModalToggle={closeOTPModal}
                    emailAddress={emailAddress} 
                    setIsVerified={setIsVerified} 
                />}
            </div>

            <AuthPagesRightSide />
        </div>
    </div>
  )
}

export default ForgotPasswordPage;