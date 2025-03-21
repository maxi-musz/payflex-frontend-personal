"use client"

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ButtonOne from './button/ButtonOne';
import InputOne from './inputs/InputOne';
import { ErrorOutline, Restore } from '@mui/icons-material';
import ButtonNeutral from './button/ButtonNeutral';
import { usePathname, useRouter } from 'next/navigation';
import { requestEmailOTP, resetPassword, verifyEmail, verifyPasswordReset } from '@/features/auth/actions';
import Loading from '@/app/loading';

interface OtpProps {
    handleModalToggle: () => void,
    cancelEmailVerification: () => void,
    emailAddress: string,
    setEmailError: Dispatch<SetStateAction<string>>,
}

const OTPConfirmModal = ({handleModalToggle, cancelEmailVerification, emailAddress, setEmailError}: OtpProps) => {
    const [otpTime, setOTPTime] = useState(60);
    const [otpCode, setOTPCode] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        const interval = setInterval(() => {
            if (otpTime > 0) {
                setOTPTime(prev => prev-1);
            }
            if (otpTime === 0 && otpCode.length < 4) {
                setEmailError('OTP error! Verify email please.');
            }
        }, 1000)
        return () => clearInterval(interval);
    }, [otpTime, otpCode, handleModalToggle, setEmailError]);

    const resendOTP = () => {
        setOTPTime(60);

        if (pathName === '/register') {
            requestEmailOTP(emailAddress);
        }
        if (pathName === '/forgot-password') {
            resetPassword(emailAddress);
        }

        const interval = setInterval(() => {
            if (otpTime > 0) {
                setOTPTime(prev => prev-1);
            }
        }, 1000)
        return () => clearInterval(interval);
    }
    
    const onCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => setOTPCode(e.target.value);

    const handleOTPSubmit = () => {
        setIsLoading(true);
        if (!otpCode) {
            setError('Enter the OTP code sent to your email address');
            return;
        } else if (otpCode.length < 4) {
            setError('Verification failed! Invalid OTP');
            return;
        } else {
            setError('');
            if (pathName === '/register') {
                verifyEmail(emailAddress, otpCode);
                handleModalToggle();
            }

            if (pathName === '/forgot-password') {
                verifyPasswordReset(emailAddress, otpCode);
                router.push('/change-password');
            };
        };
        setIsLoading(false);
    }

    if (isLoading) <Loading />

  return (
    <section className="fixed inset-0 -top-5 bg-gray-800 bg-opacity-80 flex justify-center items-center p-2 z-[999999]">
        <div className="bg-white w-[27rem] rounded-radius-12 shadow-lg flex flex-col justify-center items-center">
            <div className="w-full p-6 flex flex-col items-start justify-between gap-4 rounded-radius-12">
                <div className='rounded-radius-12 size-10 border border-gray-200 flex items-center justify-center'>
                    <span className='text-yellow-500'><ErrorOutline /></span>
                </div>
            
                <div className='pt-3 pb-5 space-y-3'>
                    <h3 className='text-textGrayDarker text-2xl font-semibold'>Enter OTP</h3>
                    <p className='text-sm'>A confirmation code has been sent to your email address at <strong>{emailAddress || 'my.info@example.com'}</strong></p>
                    <div className="w-full space-y-2">
                        <InputOne label='Enter confirmation code' required={true} onChange={onCodeChange} value={''} name="OTPConfirmationCode" classes='placeholder:text-center placeholder:text-xs placeholder:text-red-700' placeholderText={error ? error : ''} />
                        <div className="w-full flex items-center justify-start gap-2">
                            <p className='flex-1 flex items-center justify-between gap-3'>
                                {otpTime === 0 ?
                                <>
                                    <span>OTP code has expired.</span>
                                    <button onClick={resendOTP} className='cursor-pointer text-textGrayDarker underline flex items-center gap-1 text-sm font-semibold'>
                                        <Restore style={{fontSize: '16px'}} />
                                        Resend OTP
                                    </button>
                                </>
                                : 
                                <span>Confirmation code expires in <strong>{otpTime === 60 ? '01:00' : otpTime}</strong></span>}
                            </p>
                        </div>
                    </div>

                </div>
                
                <div className="w-full flex items-center justify-end gap-3">
                    <ButtonNeutral onClick={cancelEmailVerification} classes='py-2 px-8 text-sm border rounded-radius-8' btnText1='Cancel' />
                    <ButtonOne onClick={handleOTPSubmit} classes='py-2 px-8 text-sm' btnText1='Verify' />
                </div>
            </div>
        </div>
    </section>
  )
}

export default OTPConfirmModal;