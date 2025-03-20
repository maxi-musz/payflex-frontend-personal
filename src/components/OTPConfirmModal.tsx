"use client"

import React, { useEffect, useState } from 'react'
import ButtonOne from './button/ButtonOne';
import InputOne from './inputs/InputOne';
import { ErrorOutline, Restore } from '@mui/icons-material';
import ButtonNeutral from './button/ButtonNeutral';
import { usePathname, useRouter } from 'next/navigation';

interface OtpProps {
    handleModalToggle: () => void,
    cancelEmailVerification: () => void,
    emailAddress: string
}

const OTPConfirmModal = ({handleModalToggle, cancelEmailVerification, emailAddress}: OtpProps) => {
    const [otpTime, setOTPTime] = useState<number>(60);
    const [otpCode, setOTPCode] = useState<number | null>(null);
        const [error, setError] = useState<string>('');

    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        const interval = setInterval(() => {
            if (otpTime > 0) {
                setOTPTime(prev => prev-1);
            }
            if (otpTime === 0) {
                handleModalToggle();
            }
        }, 1000)
        return () => clearInterval(interval);
    }, [otpTime, handleModalToggle]);

    
    const onCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOTPCode(parseInt(e.target.value));
    }

    const handleOTPSubmit = () => {
        if (!otpCode) {
            setError('Enter the OTP code sent to your email address');
            return;
        } else if (otpCode < 6) {
            setError('Verification failed! Invalid OTP');
            return;
        } else {
            setError('');
            if (pathName === '/register') {
                handleModalToggle()
            }else {
                router.push('/change-password')
            };
        };
    }

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
                        <div className="w-full flex items-center justify-center gap-2">
                            <Restore style={{fontSize: '16px'}} />
                            <p>Resend confirmation code in <strong>{otpTime === 60 ? '01:00' : otpTime}</strong></p>
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