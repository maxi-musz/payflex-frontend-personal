"use client"

import Loading from '@/app/loading';
import AuthPagesHeader from '@/components/AuthPagesHeader';
import AuthPagesRightSide from '@/components/AuthPagesRightSide';
import ButtonOne from '@/components/button/ButtonOne';
import InputOne from '@/components/inputs/InputOne';
import { useGeneralData } from '@/context/GeneralDataContext';
import { loginUser } from '@/features/auth/actions';
import { Key, RemoveRedEyeOutlined } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const LoginPage = () => {
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [emailAddressError, setEmailAddressError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const {currentUserData} = useGeneralData();
        const [isLoading, setIsLoading] = useState(false);
    // console.log(currentUserData);

    const router = useRouter();

    const handlePasswordToggle = () => setIsPasswordOpen(prev => !prev);
    
    const onFormSubmit = () => {
        setIsLoading(true);
        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters!");
        } else if (emailAddress.length < 3 || !emailAddress.includes('@')) {
            setEmailAddressError("Invalid email address!");
        } else {
            if (emailAddress !== currentUserData.email) {
                setEmailAddressError("Wrong email address!");
            } else if (password !== currentUserData.password) {
                setPasswordError("Wrong password!");
            } else if (emailAddress === currentUserData.email && password === currentUserData.password) {
                setEmailAddressError("");
                setPasswordError("");
                
                localStorage.setItem('loggedInUserInfo', JSON.stringify({
                    email: emailAddress,
                    password: password,
                    first_name: currentUserData.first_name,
                    last_name: currentUserData.last_name
                }));

                loginUser(emailAddress, password);
    
                console.log(emailAddress, password);
                router.push('/');
            }
        }
        setIsLoading(false);
    };

    if (isLoading) <Loading />

  return (
    <div className='h-full min-h-screen w-full flex flex-col md:flex-row '>
        <div className='order-2 md:order-1 w-full md:w-1/2 h-fit py-8 md:h-screen min-h-full flex items-center justify-center'>
            <div className="flex flex-col gap-6 w-[90%] md:w-[50%]">
                <AuthPagesHeader />

                <div className="self-start">
                    <h1 className='text-2xl font-semibold'>Log in</h1>
                    <p className='text-base'>Welcome back! Please enter your details.</p>
                </div>

                <div className="w-full">
                    <form className="w-full space-y-3">
                        <div className="w-full flex-col">
                            <InputOne onChange={(e) => setEmailAddress(e.target.value)} value={''} label='Email' name="email" placeholderText='Enter your email' />
                            {emailAddressError && <p className='text-red-600 text-xs'>{emailAddressError}</p>}
                        </div>
                        <div className="w-full mb-3 flex-col">
                            <InputOne
                                icon2={!isPasswordOpen ? <RemoveRedEyeOutlined style={{fontSize: '19px', }} /> : <Key style={{fontSize: '19px', }} />}
                                onClick={handlePasswordToggle}
                                onChange={(e) => setPassword(e.target.value)}
                                value={''}
                                type={!isPasswordOpen ? 'password' : 'text'}
                                label='Password'
                                name="password"
                                placeholderText='Enter your password'
                            />
                            {passwordError && <p className='text-red-600 text-xs'>{passwordError}</p>}
                        </div>

                        <div className='my-2 w-full flex items-center justify-end'>
                            <Link href='/forgot-password' className='text-red-600 text-sm'>Forgot password</Link>
                        </div>
                        <ButtonOne onClick={onFormSubmit} classes='py-2 px-16 w-full' btnText1='Login' />
                        
                        <p className='text-center text-sm'>Don&apos;t have an account? <Link href='/register' className='text-blue-600'>Sign up</Link></p>
                    </form>
                </div>
            </div>
        </div>

        <AuthPagesRightSide />
    </div>
  )
}

export default LoginPage;