"use client"

import Loading from '@/app/loading';
import AuthPagesHeader from '@/components/AuthPagesHeader';
import AuthPagesRightSide from '@/components/AuthPagesRightSide';
import ButtonOne from '@/components/button/ButtonOne';
import InputOne from '@/components/inputs/InputOne';
import { useGeneralData } from '@/context/GeneralDataContext';
import { updatePassword } from '@/features/auth/actions';
import { Key, RemoveRedEyeOutlined } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const ChangenewPasswordPage = () => {
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);
    const [emailAddress, setEmailAddress] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [emailAddressError, setEmailAddressError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const {currentUserData, setCurrentUserData} = useGeneralData();
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const onFormSubmit = () => {
        setIsLoading(true);
        if (newPassword.length < 8) {
            setNewPasswordError("New Password must be at least 8 characters!");
        } else if (emailAddress.length < 3 || !emailAddress.includes('@')) {
            setEmailAddressError("Invalid email address!");
        } else if (emailAddress !== currentUserData.email) {
            setEmailAddressError("Wrong email address! Check your email.");
        } else {
            setEmailAddressError("");
            setNewPasswordError("");

            localStorage.setItem('userData', JSON.stringify({...currentUserData, password: newPassword}));
            setCurrentUserData({...currentUserData, password: newPassword});
            // console.log(currentUserData);
            updatePassword(emailAddress, newPassword);
            
            // console.log(emailAddress, newPassword);
            router.refresh();
            router.push('/login');
        }
        setIsLoading(false);
    };
    
    const handlePasswordToggle = () => setIsPasswordOpen(prev => !prev);

    if (isLoading) <Loading />
    
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
                    <form className="w-full space-y-3">
                        <div className="w-full mb-3 flex flex-col">
                            <InputOne onChange={(e) => setEmailAddress(e.target.value)} value={''} label='Email Address' name="email" placeholderText='Enter your email address' />
                            {emailAddressError && <p className='text-red-600 text-xs'>{emailAddressError}</p>}
                        </div>
                        <div className="w-full mb-3 flex-col">
                            <InputOne
                                icon2={!isPasswordOpen ? <RemoveRedEyeOutlined style={{fontSize: '19px', }} /> : <Key style={{fontSize: '19px', }} />}
                                onChange={(e) => setNewPassword(e.target.value)}
                                onClick={handlePasswordToggle}
                                value={''}
                                type={!isPasswordOpen ? 'password' : 'text'}
                                label='New Password'
                                name="newPassword"
                                placeholderText='Enter your new password'
                            />
                            {newPasswordError && <p className='text-red-600 text-xs'>{newPasswordError}</p>}
                        </div>

                        <ButtonOne onClick={onFormSubmit} classes='py-2 px-16 w-full' btnText1='Change Password' />
                        
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