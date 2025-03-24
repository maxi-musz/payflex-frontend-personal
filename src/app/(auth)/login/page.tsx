"use client"

import Loading from '@/app/loading';
import AuthPagesHeader from '@/components/AuthPagesHeader';
import AuthPagesRightSide from '@/components/AuthPagesRightSide';
import ButtonOne from '@/components/button/ButtonOne';
import { showToast } from '@/components/HotToast';
import InputFieldFloatingLabel from '@/components/inputs/InputFieldFloatingLabel';
import { loginUser } from '@/features/auth/actions';
import { loginSchema, LoginType } from '@/features/auth/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { Key, RemoveRedEyeOutlined } from '@mui/icons-material';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';

interface LoginProps {
    data?: LoginType;
}

const LoginPage: React.FC<LoginProps> = ({ data }) => {
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // console.log(currentUserData);

    const router = useRouter();

    const handlePasswordToggle = () => setIsPasswordOpen(prev => !prev);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm<LoginType>({
        resolver: zodResolver(loginSchema),
        defaultValues: data,
    });
        
    
    const onFormSubmit = handleSubmit(async (data) => {
        console.log('zod form data', data);
        try {
            setIsLoading(true);
            const res = await loginUser(data.email, data.password);
            
            if (res.success) {
                console.log('res data', res);
                localStorage.setItem('loggedInUserInfo', JSON.stringify({
                    email: res.data.email,
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,
                    password: ''
                }));

                router.push('/');
            }
            setIsLoading(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                showToast(`${error.message}`, 'error');
                // console.error('Error logging in:', error.message);
                setIsLoading(false);
                throw new Error(error.response?.data?.message || 'Something went wrong');
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
        <Toaster position="top-center" reverseOrder={false} />
        <div className='order-2 md:order-1 w-full md:w-1/2 h-fit py-8 md:h-screen min-h-full flex items-center justify-center'>
            <div className="flex flex-col gap-6 w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
                <AuthPagesHeader />

                <div className="self-start">
                    <h1 className='text-2xl font-semibold'>Log in</h1>
                    <p className='text-base'>Welcome back! Please enter your details.</p>
                </div>

                <div className="w-full">
                    <form onSubmit={onFormSubmit} className="w-full space-y-5">
                        <div className="w-full flex-col">
                            <InputFieldFloatingLabel
                                {...register("email")}
                                floatingLabel="Your email address"
                                error={errors.email}
                                required
                                classes='w-full'
                            />
                        </div>
                        
                        <div className="w-full mb-3 flex-col">
                            <InputFieldFloatingLabel
                                floatingLabel='Your password'
                                icon2={!isPasswordOpen ? <RemoveRedEyeOutlined style={{fontSize: '19px', }} /> : <Key style={{fontSize: '19px', }} />}
                                onClick={handlePasswordToggle}
                                type={!isPasswordOpen ? 'password' : 'text'}
                                {...register("password")}
                                error={errors.password}
                                required
                                classes='w-full'
                            />
                        </div>

                        <div className='my-2 w-full flex items-center justify-end'>
                            <Link href='/forgot-password' className='text-red-600 text-sm'>Forgot password</Link>
                        </div>
                        <ButtonOne type='submit' classes='py-2 px-16 w-full' btnText1='Login' />
                        
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