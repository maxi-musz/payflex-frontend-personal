"use client"

import AuthPagesHeader from '@/components/AuthPagesHeader';
import AuthPagesRightSide from '@/components/AuthPagesRightSide';
import ButtonLinkOne from '@/components/button/ButtonLinkOne';
import InputOne from '@/components/inputs/InputOne';
import { Key, RemoveRedEyeOutlined } from '@mui/icons-material';
import Link from 'next/link';
import React, { useState } from 'react'

const LoginPage = () => {
    const [isPasswordOpen, setIsPasswordOpen] = useState<boolean>(false);

    const handlePasswordToggle = () => setIsPasswordOpen(prev => !prev);

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
                        <div className="w-full">
                            <InputOne onChange={(e) => e.target.value} value={''} label='Email' name="email" placeholderText='Enter your email' />
                        </div>
                        <div className="w-full mb-3">
                            <InputOne
                                icon2={!isPasswordOpen ? <RemoveRedEyeOutlined style={{fontSize: '19px', }} /> : <Key style={{fontSize: '19px', }} />}
                                onChange={(e) => e.target.value}
                                onClick={handlePasswordToggle}
                                value={''}
                                type={!isPasswordOpen ? 'password' : 'text'}
                                label='Password'
                                name="password"
                                placeholderText='Enter your password'
                            />
                        </div>

                        <div className='my-2 w-full flex items-center justify-end'>
                            <Link href='/forgot-password' className='text-red-600 text-sm'>Forgot password</Link>
                        </div>
                        <ButtonLinkOne href='/' classes='py-2 px-16 w-full' btnText1='Login' />
                        
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