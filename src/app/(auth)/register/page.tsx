"use client"

import AuthPagesHeader from '@/components/AuthPagesHeader';
import AuthPagesRightSide from '@/components/AuthPagesRightSide';
import ButtonLinkOne from '@/components/button/ButtonLinkOne';
import InputOne from '@/components/inputs/InputOne';
import InputSelect from '@/components/inputs/InputSelect';
import OTPConfirmModal from '@/components/OTPConfirmModal';
import Link from 'next/link';
import React, { useState } from 'react'

const RegisterPage = () => {
    const [isOTPOpen, setIsOTPOpen] = useState<boolean>(false);
    const [emailAddress, setEmailAddress] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isOTPEntered, setIsOTPEntered] = useState<boolean>(false);
    
    const openOTP = () => {
        if (!emailAddress) {
            setError('Enter the email address you registered with');
            return;
        } else if (emailAddress.length < 4 || !emailAddress.includes('@')) {
            setError('Invalid email address');
            return;
        } else {
            setError('');
            setIsOTPEntered(true);
            setIsOTPOpen(prev => !prev);
        }

    };

  return (
    <div className='h-full min-h-screen w-full flex flex-col md:flex-row '>
        <div className='order-2 md:order-1 w-full md:w-1/2 h-fit py-8 md:h-screen min-h-full flex items-center justify-center'>
            <div className="flex flex-col gap-6 w-[90%] md:w-[85%]">
                <AuthPagesHeader />

                <div className="self-start">
                    <h1 className='text-2xl font-semibold'>Sign up</h1>
                    <p className='text-base'>Welcome back! Please enter your details.</p>
                </div>

                <div className="w-full">
                    <form className="w-full space-y-2 md:space-y-3">
                        <div className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-3">
                            <div className="w-full md:w-1/2">
                                <InputOne onChange={(e) => e.target.value} value={''} label='First Name' name="firstName" placeholderText='ex: John' />
                            </div>
                            <div className="w-full md:w-1/2">
                                <InputOne onChange={(e) => e.target.value} value={''} label='Last Name' name="lastName" placeholderText='ex: Doe' />
                            </div>
                        </div>

                        <div className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-3">
                            <div className="w-full md:w-1/2">
                                <InputOne required={true} disabled={isOTPEntered} onChange={(e) => setEmailAddress(e.target.value)} value={''} label='Email' name="email" placeholderText='Enter your email address' />
                                <div className="flex items-center justify-between">
                                    {error ? <p className='text-center text-xs text-red-700'>{error}</p>
                                    : (emailAddress && !isOTPEntered) && <p className='text-center text-xs text-neutral-600'>Click the &apos;verify&apos; button to verify email</p>}
                                    {(emailAddress && !isOTPEntered) && <button type='button' onClick={openOTP} className='px-2 text-sm'>Verify</button>}
                                </div>
                            </div>

                            <div className={`w-full md:w-1/2 ${!isOTPEntered && emailAddress ? 'pb-5': ''}`}>
                                <InputOne onChange={(e) => e.target.value} value={''} label='Phone Number' name="phoneNumber" placeholderText='Enter your phone number' />
                            </div>
                        </div>
                        
                        <div className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-3">
                            <div className="w-full md:w-1/3">
                                <InputOne onChange={(e) => e.target.value} value={''} label='City' name="city" placeholderText='ex: NY City' />
                            </div>
                            <div className="w-full md:w-1/3">
                                <InputOne onChange={(e) => e.target.value} value={''} label='State' name="state" placeholderText='ex: NY' />
                            </div>
                            <div className="w-full md:w-1/3">
                                <InputOne onChange={(e) => e.target.value} value={''} label='Country' name="country" placeholderText='Enter your country' />
                            </div>
                        </div>

                        <div className="w-full">
                            <InputOne onChange={(e) => e.target.value} value={''} label='Home Address' name="homeAddress" placeholderText='Enter your home address' />
                        </div>

                        <div className="w-full flex items-center gap-2 md:gap-3">
                            <div className="w-1/2">
                                <InputSelect onChange={(e) => e.target.value} valueArray={['Male', 'Female']} label='Gender' name="gender" />
                            </div>
                            <div className="w-1/2">
                                <InputOne onChange={(e) => e.target.value} value={''} label='Date of Birth' name="dob" placeholderText='yyyy-mm-dd' />
                            </div>
                        </div>
                        
                        <ButtonLinkOne href='/login' classes='py-2 px-16 w-full' btnText1='Sign up' />
                        
                        <p className='text-center text-sm'>Already have an account? <Link href='/login' className='text-blue-600'>Login</Link></p>
                    </form>
                </div>
            </div>

            {isOTPOpen && <OTPConfirmModal handleModalToggle={openOTP} emailAddress={emailAddress} />}
        </div>

        <AuthPagesRightSide />
    </div>
  )
}

export default RegisterPage;