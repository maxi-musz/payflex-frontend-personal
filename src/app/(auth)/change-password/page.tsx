"use client"

import AuthPagesHeader from '@/components/AuthPagesHeader';
import AuthPagesRightSide from '@/components/AuthPagesRightSide';
import ButtonLinkOne from '@/components/button/ButtonLinkOne';
import InputOne from '@/components/inputs/InputOne';
import Link from 'next/link';
import React from 'react'

const ChangePasswordPage = () => {
  return (
    <div className='h-full min-h-screen w-full flex flex-col md:flex-row '>
        <div className='order-2 md:order-1 w-full md:w-1/2 h-fit py-8 md:h-screen min-h-full flex items-center justify-center'>
            <div className="flex flex-col gap-6 w-[90%] md:w-[50%]">
                <AuthPagesHeader />

                <div className="self-start">
                    <h1 className='text-2xl font-semibold'>Change password</h1>
                    <p className='text-base'>Please enter your new password.</p>
                </div>

                <div className="w-full">
                    <form className="w-full space-y-3">
                        <div className="w-full mb-3">
                            <InputOne onChange={(e) => e.target.value} value={''} label='Password' name="password" placeholderText='Enter your password' />
                        </div>
                        <div className="w-full mb-3">
                            <InputOne onChange={(e) => e.target.value} value={''} label='Confirm Password' name="confirmPassword" placeholderText='Confirm your password' />
                        </div>

                        <ButtonLinkOne href='/login' classes='py-2 px-16 w-full' btnText1='Change password' />
                        
                        <p className='text-center text-sm'>Don&apos;t have an account? <Link href='/register' className='text-blue-600'>Sign up</Link></p>
                    </form>
                </div>
            </div>
        </div>

        <AuthPagesRightSide />
    </div>
  )
}

export default ChangePasswordPage;