'use client';

import React, { useState } from 'react'
import ButtonOne from '../button/ButtonOne';
import { Edit, Save, ShieldOutlined, TaskOutlined } from '@mui/icons-material';
import InputField from '../inputs/InputField';
import { Toaster } from 'react-hot-toast';
import { showToast } from '../HotToast';
import SelectInputField from '../inputs/InputSelectField';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { kycSchema, KYCType } from '@/features/dashboard/validations';
import { updateKYC } from '@/features/dashboard/actions';
import { useGeneralData } from '@/context/GeneralDataContext';
import ButtonNeutral from '../button/ButtonNeutral';
import LoadingSpinner from '../LoadingSpinner';

interface ProfileProps {
    data?: KYCType;
}

const id_types = ['NIGERIAN_BVN_VERIFICATION', 'NIGERIAN_NIN', 'NIGERIAN_INTERNATIONAL_PASSPORT', 'NIGERIAN_PVC', 'NIGERIAN_DRIVERS_LICENSE']

const Verification: React.FC<ProfileProps> = ({ data }) => {
    const [loading, setLoading] = useState(false);
    const [inputDisabled, setInputDisabled] = useState(true);
    const [inputMode, setInputMode] = useState<string>('editable');

    const {userKYC, contextLoading} = useGeneralData();
    // const [updatedKYCInfo, setUpdatedKYCInfo] = useState<
    // {
    //     id_type: '',
    //     id_no: '',
    // } | null>(null);
    
    const router = useRouter();
    
    const handleEditForm = () => {
        setInputMode('');
        setInputDisabled(false);
    }

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
            window.location.reload();
            setInputMode('editable');
            setInputDisabled(true);
        } catch (error) {
            setLoading(false);
            setTimeout(() => {
                showToast(`Error: ${(error as Error).message || 'An unexpected error occurred'}`, 'error');
            }, 500);
        }
    });
        // console.log(userKYC?.id_number);
  return (
    <form onSubmit={onFormSubmit} className='py-3 divide-y'>
        <Toaster position="top-center" reverseOrder={false} />
        <div className='py-6 px-5'>
            <div className="w-full flex items-center justify-between gap-3 flex-wrap pb-8">
                <div className='flex items-center gap-2'>
                    <ShieldOutlined className='text-primary' />
                    <h2 className='text-xl font-semibold'>Identity Verification (KYC)</h2>
                </div>

                <div className="flex items-center gap-2">
                    {userKYC?.id_number === null ? inputMode === 'editable' ?
                    <ButtonNeutral
                        onClick={handleEditForm}
                        classes='py-2 px-8 font-semibold space-x-2 border hover:border-primary hover:text-primary rounded-radius-12 w-full sm:w-fit transition-all duration-300 ease-in-out'
                        btnText1='Edit Profile'
                        icon1={<Edit style={{fontSize: '17px'}} />}
                    /> :
                    <ButtonOne
                        type='submit'
                        classes='py-2 px-8 font-semibold w-full sm:w-fit'
                        disabled={loading}
                        icon1={loading ? <LoadingSpinner color='text-white' /> : <Save style={{fontSize: '17px'}} />}
                        btnText1={loading ? 'Updating...' : 'Update KYC'}
                    /> 
                    : null}
                </div>
            </div>
            
            <div className="w-full sm:w-96 mx-auto space-y-3 md:space-y-5">
                <div className="w-full">
                    <SelectInputField
                        valueArray={id_types}
                        {...register("id_type")}
                        label="ID Type"
                        error={errors.id_type}
                        disabled={inputDisabled}
                        mode={inputMode}
                        classes={`${userKYC?.id_number !== null && inputMode === 'editable' ? 'placeholder:text-neutral-800 placeholder:text-base' : ''} w-full`}
                        placeholderText={userKYC?.id_type || 'Select ID Type'}
                    />
                </div>
                <div className="w-full">
                    <InputField
                        {...register("id_no")}
                        label="ID Number"
                        error={errors.id_no}
                        disabled={inputDisabled}
                        mode={inputMode}
                        classes={`${userKYC?.id_number !== null && inputMode === 'editable' ? 'placeholder:text-neutral-800 placeholder:text-base' : ''} w-full`}
                        placeholderText={userKYC?.id_number || 'Enter your ID number'}
                    />
                </div>
                <div className="text-primary w-full flex items-start gap-3 p-5 bg-blue-50 border border-blue-100 rounded-radius-12">
                    <TaskOutlined />
                    <p className=''>Your identity information is securely stored and encrypted. We only use this information for verification purposes as required by regulations.</p>
                </div>
            </div>
        </div>

        {/* <div className="flex items-center justify-end pt-6 pb-1 px-5">
            <ButtonOne
                type='submit'
                classes='py-2 px-8 font-semibold w-full sm:w-fit'
                btnText1={loading ? 'Updating...' : 'Update KYC'}
                icon1={<Save style={{fontSize: '17px'}} />}
            />
        </div> */}
    </form>
  )
}

export default Verification;