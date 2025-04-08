'use client';

import React, { useState } from 'react'
import ButtonOne from '../button/ButtonOne';
import { Save, ShieldOutlined, TaskOutlined } from '@mui/icons-material';
import InputField from '../inputs/InputField';
import { Toaster } from 'react-hot-toast';
import { showToast } from '../HotToast';
import SelectInputField from '../inputs/InputSelectField';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { kycSchema, KYCType } from '@/features/dashboard/validations';
import { updateKYC } from '@/features/dashboard/actions';

interface ProfileProps {
    data?: KYCType;
}

const id_types = ['NIGERIAN BVN VERIFICATION', 'NIGERIAN_NIN', 'NIGERIAN_INTERNATIONAL_PASSPORT', 'NIGERIAN_PVC', 'NIGERIAN_DRIVERS_LICENSE']

const Verification: React.FC<ProfileProps> = ({ data }) => {
    const [loading, setLoading] = useState(false);
    // const [updatedKYCInfo, setUpdatedKYCInfo] = useState<
    // {
    //     id_type: '',
    //     id_no: '',
    // } | null>(null);
    
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm<KYCType>({
        resolver: zodResolver(kycSchema),
        defaultValues: data,
        });
    
        const onFormSubmit = handleSubmit(async (data) => {
        console.log(data);
            
        const token = sessionStorage.getItem("accessToken");
        if (!token) return router.push('/login');
        
        setLoading(true);
        const UserData = {
            id_type: data.id_type,
            id_no: data.id_no,
        }

        try {
            const res = await updateKYC(token, UserData);
            console.log(res);
            if (res.success) {
                const { data } = res;
                setLoading(false);
                setTimeout(() => {
                    showToast(`${res.message}` || "KYC information updated successfully");
                }, 500);
                
                // setUpdatedKYCInfo({
                //     id_type: data.id_type,
                //     id_no: data.id_no,
                // })
            }
        } catch (error) {
            setLoading(false);
            setTimeout(() => {
                showToast(`Error: ${(error as Error).message || 'An unexpected error occurred'}`, 'error');
            }, 500);
        }
    });
        
  return (
    <form onSubmit={onFormSubmit} className='py-3 divide-y'>
        <Toaster position="top-center" reverseOrder={false} />
        <div className='py-6 px-5'>
            <div className='flex items-center gap-2 pb-3'>
                <ShieldOutlined className='text-primary' />
                <h2 className='text-xl font-semibold'>Identity Verification (KYC)</h2>
            </div>
            
            <div className="w-full space-y-3 md:space-y-5">
                <div className="w-full">
                    <SelectInputField
                        valueArray={id_types}
                        {...register("id_type")}
                        // value={updatedKYCInfo?.id_type ? updatedKYCInfo.id_type : ''}
                        label="ID Type"
                        error={errors.id_type}
                        required
                        classes='w-full'
                        placeholderText='Select ID Type'
                    />
                </div>
                <div className="w-full">
                    <InputField
                        {...register("id_no")}
                        // value={updatedKYCInfo?.id_no ? updatedKYCInfo.id_no : ''}
                        label="ID Number"
                        error={errors.id_no}
                        required
                        classes='w-full'
                        placeholderText='Enter your ID number'
                    />
                </div>
                <div className="text-primary w-full flex items-start gap-3 p-5 bg-blue-50 border border-blue-100 rounded-radius-12">
                    <TaskOutlined />
                    <p className=''>Your identity information is securely stored and encrypted. We only use this information for verification purposes as required by regulations.</p>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-end pt-6 pb-1 px-5">
            <ButtonOne
                type='submit'
                classes='py-2 px-8 font-semibold w-full sm:w-fit'
                btnText1={loading ? 'Submitting...' : 'Submit Verification'}
                icon1={<Save style={{fontSize: '17px'}} />}
            />
        </div>
    </form>
  )
}

export default Verification;