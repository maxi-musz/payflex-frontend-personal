"use client"

import Loading from '@/app/loading';
import AuthPagesHeader from '@/components/AuthPagesHeader';
import AuthPagesRightSide from '@/components/AuthPagesRightSide';
import ButtonOne from '@/components/button/ButtonOne';
import InputOne from '@/components/inputs/InputOne';
import { resetPassword } from '@/features/auth/actions';
// import OTPConfirmModal from '@/components/OTPConfirmModal';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';

const OTPConfirmModal = dynamic(() => import("@/components/OTPConfirmModal"), {
    loading: () => <Loading />,
  });

const ForgotPasswordPage = () => {
    const [isOTPOpen, setIsOTPOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [emailAddress, setEmailAddress] = useState('');
    const [error, setError] = useState('');
    
    
    const confirmOTP = () => {
        if (isOTPOpen) {
            toast.success(`Your email address has been verified!`, {
                className: 'custom-toast-success w-fit',
                icon: '✅',
                duration: 3000,
            });
        }
        
        setError('');
        setIsOTPOpen(true);
    };
    
    const toggleOTPModal = () => {
        setIsLoading(true);
        if (!isOTPOpen) {
            if (error && !emailAddress) return;
            if (emailAddress) setError('');

            if (!emailAddress) {
                setError('Enter the email address you registered with');
                return;
            } else if (emailAddress.length < 4 || !emailAddress.includes('@')) {
                setError('Invalid email address');
                return;
            } else {
                resetPassword(emailAddress);
                setIsOTPOpen(true);
            }
            setIsLoading(false);
        } else {
            confirmOTP();
            setIsOTPOpen(false);
        }
    };
    
    
    const cancelEmailVerification = () => {
        setError('');
        setIsOTPOpen(false);

        if (!isOTPOpen) {
            toast.error(`Your email address has not been verified!`, {
                className: 'custom-toast-error w-fit',
                icon: '❌',
                duration: 3000,
            });
        }
    };

    if (isLoading) <Loading />

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
                        <form className="w-full space-y-3">
                            <div className="w-full flex items-center gap-2">
                                <div className="w-[80%]">
                                    <InputOne required={true} onChange={(e) => setEmailAddress(e.target.value)} value={''} name="email" placeholderText='Enter your email' />
                                </div>
                                
                                <ButtonOne onClick={toggleOTPModal} classes='py-2 px-2 w-[20%] text-sm rounded-' btnText1='Verify' />
                            </div>
                            
                            {error && <p className='text-center text-xs text-red-700'>{error}</p>}
                            <p className='text-center text-sm'>Don&apos;t have an account? <Link href='/register' className='text-blue-600'>Sign up</Link></p>
                        </form>
                    </div>
                </div>
                    
                {isOTPOpen && <OTPConfirmModal handleModalToggle={toggleOTPModal} cancelEmailVerification={cancelEmailVerification}  emailAddress={emailAddress} setEmailError={setError} />}
            </div>

            <AuthPagesRightSide />
        </div>
    </div>
  )
}

export default ForgotPasswordPage;