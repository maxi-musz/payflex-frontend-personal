'use client';

import { HomeOutlined, PersonOutlined, Save } from '@mui/icons-material';
import React, { useState } from 'react';
import InputField from '../inputs/InputField';
import ButtonOne from '../button/ButtonOne';
import { showToast } from '../HotToast';
import { Toaster } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { profileSchema, ProfileType } from '@/features/dashboard/validations';
import { updateProfile } from '@/features/dashboard/actions';
import { useRouter } from 'next/navigation';

interface ProfileProps {
    data?: ProfileType;
}

const Profile: React.FC<ProfileProps> = ({ data }) => {
    const [loading, setLoading] = useState(false);
    // const [updatedUserInfo, setUpdatedUserInfo] = useState<
    // {
    //     first_name: '',
    //     last_name: '',
    //     home_address: '',
    //     city: '',
    //     state: '',
    //     country: '',
    //     postal_code: '',
    //     house_number: '',
    // } | null>(null);

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm<ProfileType>({
        resolver: zodResolver(profileSchema),
        defaultValues: data,
        });
    
        const onFormSubmit = handleSubmit(async (data) => {
        console.log(data);
            
        const token = sessionStorage.getItem("accessToken");
        if (!token) return router.push('/login');
     
        setLoading(true);
        const UserData = {
            first_name: data.first_name,
            last_name: data.last_name,
            home_address: data.home_address,
            city: data.city,
            state: data.state,
            country: data.country,
            postal_code: data.postal_code,
            house_number: data.house_number,
        }

        try {
            const res = await updateProfile(token, UserData);
            console.log(res);
            if (res.success) {
                const { data } = res;
                setLoading(false);
                setTimeout(() => {
                    showToast(`${res.message}` || 'Profile updated successfully');
                }, 500);
                
                // setUpdatedUserInfo({
                //     first_name: data.first_name,
                //     last_name: data.last_name,
                //     home_address: data.address.home_address,
                //     city: data.address.city,
                //     state: data.address.state,
                //     country: data.address.country,
                //     postal_code: data.address.postal_code,
                //     house_number: data.address.house_number,
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
                <PersonOutlined className='text-primary' />
                <h2 className='text-xl font-semibold'>Personal Information</h2>
            </div>
            
            <div className="w-full space-y-3 md:space-y-5">
                <div className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-3">
                    <div className="w-full md:w-1/2">
                        <InputField
                            {...register("first_name")}
                            // value={updatedUserInfo?.first_name ? updatedUserInfo.first_name : ''}
                            label="First Name"
                            error={errors.first_name}
                            required
                            classes='w-full'
                            placeholderText='Enter your first name'
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <InputField
                            {...register("last_name")}
                            // value={updatedUserInfo?.last_name  ? updatedUserInfo.last_name : ''}
                            label="Last Name"
                            error={errors.last_name}
                            required
                            classes='w-full'
                            placeholderText='Enter your last name'
                        />
                    </div>
                </div>
            </div>
        </div>

        <div className='py-6 px-5'>
            <div className='flex items-center gap-2 pb-3'>
                <HomeOutlined className='text-primary' />
                <h2 className='text-xl font-semibold'>Address Information</h2>
            </div>
            
            <div className="w-full space-y-3 md:space-y-5">
                <div className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-3">
                    <div className="w-full md:w-1/2">
                        <InputField
                            {...register("home_address")}
                            // value={updatedUserInfo?.home_address ? updatedUserInfo.home_address : ''}
                            label="Home Address"
                            error={errors.home_address}
                            required
                            classes='w-full'
                            placeholderText='Enter your home address'
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <InputField
                            {...register("house_number")}
                            // value={updatedUserInfo?.house_number ? updatedUserInfo.house_number : ''}
                            label="House Number"
                            error={errors.house_number}
                            required
                            classes='w-full'
                            placeholderText='Enter your house number'
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-3">
                    <div className="w-full md:w-1/2">
                        <InputField
                            {...register("city")}
                            // value={updatedUserInfo?.city ? updatedUserInfo.city : ''}
                            label="City"
                            error={errors.city}
                            required
                            classes='w-full'
                            placeholderText='Enter your city'
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <InputField
                            {...register("state")}
                            // value={updatedUserInfo?.state ? updatedUserInfo.state : ''}
                            label="State/Province"
                            error={errors.state}
                            required
                            classes='w-full'
                            placeholderText='Enter your state'
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-3">
                    <div className="w-full md:w-1/2">
                        <InputField
                            {...register("postal_code")}
                            // value={updatedUserInfo?.postal_code ? updatedUserInfo.postal_code : ''}
                            label="Postal Code"
                            error={errors.postal_code}
                            required
                            classes='w-full'
                            placeholderText='Enter your postal code'
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <InputField
                            {...register("country")}
                            // value={updatedUserInfo?.country ? updatedUserInfo.country : ''}
                            label="Country"
                            error={errors.country}
                            required
                            classes='w-full'
                            placeholderText='Enter your conutry'
                        />
                    </div>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-end pt-6 pb-1 px-5">
            <ButtonOne
                type='submit'
                classes='py-2 px-8 font-semibold w-full sm:w-fit'
                btnText1={loading ? 'Saving...' : 'Save Profile'}
                icon1={<Save style={{fontSize: '17px'}} />}
            />
        </div>
    </form>
  )
}

export default Profile;