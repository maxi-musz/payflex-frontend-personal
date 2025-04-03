"use client"

import Loading from '@/app/loading';
import AuthPagesHeader from '@/components/AuthPagesHeader';
import AuthPagesRightSide from '@/components/AuthPagesRightSide';
import ButtonOne from '@/components/button/ButtonOne';
import { showToast } from '@/components/HotToast';
import InputField from '@/components/inputs/InputField';
import InputSelectField from '@/components/inputs/InputSelectField';
import OTPConfirmModal from '@/components/OTPConfirmModal';
import { registerUser, requestEmailOTP } from '@/features/auth/actions';
import { registerSchema, RegisterType } from '@/features/auth/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';


interface RegisterProps {
    data?: RegisterType;
}

const RegisterPage: React.FC<RegisterProps> = ({ data }) => {
    const [isOTPOpen, setIsOTPOpen] = useState(false);
    const [isOTPEntered, setIsOTPEntered] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [emailAddress, setEmailAddress] = useState('');

    const router = useRouter();

    const toggleOTPModal = async () => {
        if (!isOTPOpen) {
            try {
                setIsLoading(true);
                const res = await requestEmailOTP(emailAddress);
                setIsLoading(false);
                setIsOTPOpen(true);
                
                setTimeout(() => {
                    showToast(`${res.message}`);
                }, 500);
            } catch (error) {
                setIsLoading(false);
                setTimeout(() => {
                    showToast(`Error: ${(error as Error).message || 'An unexpected error occurred'}`, 'error');
                }, 500);
            }
        } else {
            setIsOTPOpen(false);
        }
    };
    
    
    
    const cancelEmailVerification = () => {
        setIsOTPEntered(false);
        setIsOTPOpen(false);
        setTimeout(() => {
            showToast(`Your email address has not been verified!`, 'error');
        }, 500);
    };


    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<RegisterType>({
        resolver: zodResolver(registerSchema),
        defaultValues: data,
      });
    
      const onFormSubmit = handleSubmit(async (data) => {        
        setIsLoading(true);
        // console.log(data);
        const UserData = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone_number: data.phone_number,
            address: {
                country: data.country,
                state: data.state,
                city: data.city,
                home_address: data.home_address,
            },
            gender: data.gender,
            date_of_birth: data.date_of_birth,
            password: data.password,
            confirm_password: data.confirm_password,
        }

        try {
            const res = await registerUser(UserData);
            console.log(res);
            if (res.success) {
                // const { user } = res.data;
                setIsLoading(false);
                router.push('/login');
                setTimeout(() => {
                    showToast(`${res.message}`);
                }, 500);
                // localStorage.setItem('userData', JSON.stringify(res.data));
            }
        } catch (error) {
            setIsLoading(false);
            setTimeout(() => {
                showToast(`Error: ${(error as Error).message || 'An unexpected error occurred'}`, 'error');
            }, 500);
        }
    });
      
    if (isLoading) {
        return <Loading />;
    };

  return (
    <div className='h-full min-h-screen w-full flex flex-col md:flex-row '>
        <Toaster position="top-center" reverseOrder={false} />
        <div className='order-2 md:order-1 w-full md:w-1/2 h-fit py-8 md:h-screen min-h-full flex items-center justify-center'>
            <div className="flex flex-col gap-6 w-[90%] md:w-[90%]">
                <AuthPagesHeader />

                <div className="self-start">
                    <h1 className='text-2xl font-semibold'>Sign up</h1>
                    <p className='text-base'>Welcome back! Please enter your details.</p>
                </div>

                <div className="w-full">
                    <form onSubmit={onFormSubmit} className="w-full space-y-2 md:space-y-3">
                        <div className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-3">
                            <div className="w-full md:w-1/2">
                                <InputField
                                    {...register("first_name")}
                                    label="First Name"
                                    error={errors.first_name}
                                    required
                                    classes='w-full'
                                    placeholderText='eg. Mikel'
                                />
                            </div>
                            <div className="w-full md:w-1/2">
                                <InputField
                                    {...register("last_name")}
                                    label="Last Name"
                                    error={errors.last_name}
                                    required
                                    classes='w-full'
                                    placeholderText='eg. Adeyemi'
                                />
                            </div>
                        </div>

                        <div className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-3">
                            <div className="w-full md:w-1/2">
                                <InputField
                                    disabled={isVerified}
                                    {...register("email")}
                                    label="Email Address"
                                    // error={errors.email}
                                    required
                                    value={emailAddress}
                                    onChange={(e) => setEmailAddress(e.target.value)}
                                    classes='w-full'
                                    placeholderText='eg. mikel.adeyemi@gmail.com'
                                />
                                {
                                // (emailAddress && !errors.email && !isOTPEntered) && 
                                (emailAddress && !isOTPEntered) && 
                                <div className="flex items-center justify-between">
                                    <p className='text-center text-xs text-neutral-600'>Click the &apos;verify&apos; button to verify email</p>
                                    <button type='button' onClick={toggleOTPModal} className='px-2 text-sm underline'>Verify</button>
                                </div>
                                }
                            </div>

                            <div className={`${emailAddress ? 'mb-4' : ''} w-full md:w-1/2`}>
                                <InputField
                                    {...register("phone_number")}
                                    label="Phone Number"
                                    error={errors.phone_number}
                                    required
                                    classes='w-full'
                                    placeholderText='eg. +2348037746378'
                                />
                            </div>
                        </div>
                        
                        <div className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-3">
                            <div className="w-full md:w-1/3">
                                <InputField
                                    {...register("city")}
                                    label="City"
                                    error={errors.city}
                                    required
                                    classes='w-full'
                                    placeholderText='eg. Lagos'
                                />
                            </div>
                            <div className="w-full md:w-1/3">
                                <InputField
                                    {...register("state")}
                                    label="State"
                                    error={errors.state}
                                    required
                                    classes='w-full'
                                    placeholderText='eg. Lagos'
                                />
                            </div>
                            <div className="w-full md:w-1/3">
                                <InputField
                                    {...register("country")}
                                    label="Country"
                                    error={errors.country}
                                    required
                                    classes='w-full'
                                    placeholderText='eg. Nigeria'
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <InputField
                                {...register("home_address")}
                                label="Home Address"
                                error={errors.home_address}
                                required
                                classes='w-full'
                                placeholderText='eg. No.7 Azikiwe Close, Maitama Abuja Nigeria'
                            />
                        </div>

                        <div className="w-full flex items-center gap-2 md:gap-3">
                            <div className="w-1/2">
                                <InputSelectField
                                    {...register("gender")}
                                    placeholderText='Select your gender'
                                    defaultValue={data?.gender}
                                    label="Gender"
                                    name="gender"
                                    error={errors.gender}
                                    valueArray={["male", "female"]}
                                />
                            </div>
                            <div className="w-1/2">
                                <InputField
                                    type='date'
                                    {...register("date_of_birth")}
                                    placeholder="dd-mm-yyyy"
                                    label="Date of Birth"
                                    error={errors.date_of_birth}
                                />
                            </div>
                        </div>

                        <div className="w-full flex items-center gap-2 md:gap-3">
                            <div className="w-1/2">
                                <InputField
                                    type="password"
                                    {...register("password")}
                                    label="Password"
                                    error={errors.password}
                                    required
                                    classes='w-full'
                                />
                            </div>
                            <div className="w-1/2">
                                <InputField
                                    type="password"
                                    {...register("confirm_password")}
                                    label="Confirm Password"
                                    error={errors.confirm_password}
                                    required
                                    classes='w-full'
                                />
                            </div>
                        </div>
                        
                        <ButtonOne type='submit' classes='py-2 px-16 w-full' btnText1='Sign up' />
                        
                        <p className='text-center text-sm'>Already have an account? <Link href='/login' className='text-blue-600'>Login</Link></p>
                    </form>
                </div>
            </div>

            {isOTPOpen && 
            <OTPConfirmModal
                cancelEmailVerification={cancelEmailVerification}
                handleModalToggle={toggleOTPModal} 
                emailAddress={emailAddress} 
                setIsVerified={setIsVerified} 
            />}
        </div>

        <AuthPagesRightSide />
    </div>
  )
}

export default RegisterPage;