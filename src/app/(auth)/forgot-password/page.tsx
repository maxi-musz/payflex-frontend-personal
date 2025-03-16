"use client"

import AuthPagesHeader from '@/components/AuthPagesHeader';
import AuthPagesRightSide from '@/components/AuthPagesRightSide';
import ButtonLinkOne from '@/components/button/ButtonLinkOne';
import ButtonOne from '@/components/button/ButtonOne';
import InputOne from '@/components/inputs/InputOne';
import Link from 'next/link';
import React, { useState } from 'react'

const ForgotPasswordPage = () => {
    const [isOTPOpen, setIsOTPOpen] = useState<boolean>(false);

    const openOTP = () => {
        setIsOTPOpen(prev => !prev);
    };

  return (
    <div className='h-full min-h-screen w-full flex flex-col md:flex-row '>
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
                                    <InputOne onChange={(e) => e.target.value} value={''} name="email" placeholderText='Enter your email' />
                                </div>
                                
                                <ButtonOne onClick={openOTP} classes='py-2 px-2 w-[20%] text-sm rounded-' btnText1='Verify' />
                            </div>
                            
                            <p className='text-center text-sm'>Don&apos;t have an account? <Link href='/register' className='text-blue-600'>Sign up</Link></p>
                        </form>
                    </div>
                </div>
                    
                <div className={`${isOTPOpen ? 'translate-y-0' : 'translate-y-full'} transition-all duration-500 ease-in-out flex flex-col gap-6 w-[90%] md:w-[50%] h-1/2 mx-auto`}>
                    <div className="w-full mx-auto py-16">
                        <form className="w-full space-y-3">
                            <p className='text-center font-semibold'>Enter OTP</p>
                            <div className="w-full flex items-center justify-center gap-2 py-2">
                                <div className="w-[10%] pl-1 font-bold">
                                    <InputOne onChange={(e) => e.target.value} value={''} />
                                </div>
                                <div className="w-[10%] pl-1 font-bold">
                                    <InputOne onChange={(e) => e.target.value} value={''} />
                                </div>
                                <div className="w-[10%] pl-1 font-bold">
                                    <InputOne onChange={(e) => e.target.value} value={''} />
                                </div>
                                <div className="w-[10%] pl-1 font-bold">
                                    <InputOne onChange={(e) => e.target.value} value={''} />
                                </div>
                                
                            </div>
                            
                            <ButtonLinkOne href='/change-password' classes='py-2 px-2 w-full text-sm rounded-' btnText1='Send' />
                        </form>
                    </div>
                </div>
            </div>

            <AuthPagesRightSide />
        </div>
    </div>
  )
}

export default ForgotPasswordPage;