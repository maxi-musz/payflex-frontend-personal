'use client';

import { Edit, HomeOutlined, PersonOutlined, Save } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import InputField from '../inputs/InputField';
import ButtonOne from '../button/ButtonOne';
import { showToast } from '../HotToast';
import { Toaster } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { profileSchema, ProfileType } from '@/features/dashboard/validations';
import { updateProfile } from '@/features/dashboard/actions';
import { useRouter } from 'next/navigation';
import ButtonNeutral from '../button/ButtonNeutral';
import LoadingSpinner from '../LoadingSpinner';
import { useGeneralData } from '@/stores/useGeneralData';
import { useUserData } from '@/hooks/useUserData';
import StatusHandler from '../shared/StatusHandler';

interface ProfileProps {
    data?: ProfileType;
}

const Profile: React.FC<ProfileProps> = () => {
    const [loading, setLoading] = useState(false);
    const [inputDisabled, setInputDisabled] = useState(true);
    const [inputMode, setInputMode] = useState<string>('editable');

    // const userProfile = useGeneralData((state) => state.userProfile);
    // const userAddress = useGeneralData((state) => state.userAddress);
    const loggedInUser = useGeneralData((state) => state.loggedInUser);
    // const contextLoading = useGeneralData((state) => state.contextLoading);

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
    
    // const {loggedInUser} = useGeneralData();

    
      const {
        userProfileData,
        isPending,
        hasError,
        refetchProfile,
        refetchDashboard
      } = useUserData();

      const { profile_data, addres, user_kyc_data } = userProfileData || {};
    //   console.log(profile_data, addres, user_kyc_data);
      

    const {register, handleSubmit, formState: { errors }, reset, } = useForm<ProfileType>({resolver: zodResolver(profileSchema),});

    useEffect(() => {
        if (inputMode !== 'editable') {
          reset({
            first_name: profile_data?.first_name || '',
            last_name: profile_data?.last_name || '',
            home_address: addres?.house_address || '',
            house_number: addres?.house_no || '',
            city: addres?.city || '',
            state: addres?.state || '',
            country: addres?.country || '',
            postal_code: addres?.postal_code || '',
          });
        }
      }, [inputMode, profile_data, addres, reset]);

    const router = useRouter();

    const handleEditForm = () => {
        setInputMode('');
        setInputDisabled(false);
    }
    
    const onFormSubmit = handleSubmit(async (data) => {
        // console.log(data);
            
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
            // console.log(res);
            if (res.success) {
                const { data } = res;
                setLoading(false);
                setTimeout(() => {
                    showToast(`${res.message}` || 'Profile updated successfully');
                }, 500);
                
                localStorage.setItem('loggedInUserInfo', JSON.stringify({
                    ...loggedInUser,
                    name: `${data.first_name} ${data.last_name}`,
                }));
            }

            // window.location.reload();
            
            await refetchProfile();
            await refetchDashboard();
            setInputMode('editable');
            setInputDisabled(true);
        } catch (error) {
            setLoading(false);
            setTimeout(() => {
                showToast(`Error: ${(error as Error).message || 'An unexpected error occurred'}`, 'error');
            }, 500);
        }
    });

    // if (contextLoading) {
    //     return (<div className="w-full h-[12rem] flex items-center justify-center">
    //       <LoadingSpinner dynamicSize='size-12' />
    //     </div>)
    // }

    // Checking loading state and error state
    if (isPending || !!hasError) return (
      <StatusHandler
        isLoading={isPending}
        isError={!!hasError}
        errorMessage="Failed to load providers. Please try again."
      />
    );
    
  return (
    <form onSubmit={onFormSubmit} className='py-3 divide-y'>
        <Toaster position="top-center" reverseOrder={false} />
        <div className='py-6 px-5'>
            <div className="w-full flex items-center justify-between gap-3 pb-5">
                <div className='flex items-center gap-2'>
                    <PersonOutlined className='text-primary' />
                    <h2 className='text-xl font-semibold'>Personal Information</h2>
                </div>
                
                <div className="flex items-center gap-2">
                    {inputMode === 'editable' ?
                    <ButtonNeutral
                        onClick={handleEditForm}
                        classes='py-2 px-8 font-semibold space-x-2 border hover:border-primary hover:text-primary rounded-radius-12 w-full sm:w-fit transition-all duration-300 ease-in-out'
                        btnText1='Edit Profile'
                        icon1={<Edit style={{fontSize: '17px'}} />}
                    /> : 
                    <ButtonOne
                        type='submit'
                        classes='py-2 px-8 font-semibold w-full sm:w-fit'
                        btnText1={loading ? 'Saving...' : 'Save Profile'}
                        disabled={loading}
                        icon1={loading ? <LoadingSpinner color='text-white' /> : <Save style={{fontSize: '17px'}} />}
                    />}
                </div>
            </div>
            
            <div className="w-full space-y-3 md:space-y-5">
                <div className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-3">
                    <div className="w-full md:w-1/2">
                        <InputField
                            {...register("first_name")}
                            label="First Name"
                            error={errors.first_name}
                            disabled={inputDisabled}
                            defaultValue={inputMode !== 'editable' ? profile_data?.first_name : ''}
                            mode={inputMode}
                            classes={`${inputMode === 'editable' ? 'placeholder:text-neutral-800 placeholder:text-base' : ''} w-full`}
                            placeholderText={profile_data?.first_name || 'Enter your first name'}
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <InputField
                            mode={inputMode}
                            {...register("last_name")}
                            disabled={inputDisabled}
                            label="Last Name"
                            defaultValue={inputMode !== 'editable' ? profile_data?.last_name : ''}
                            error={errors.last_name}
                            classes={`${inputMode === 'editable' ? 'placeholder:text-neutral-800 placeholder:text-base' : ''} w-full`}
                            placeholderText={profile_data?.last_name || 'Enter your last name'}
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
                            mode={inputMode}
                            disabled={inputDisabled}
                            label="Home Address"
                            defaultValue={inputMode !== 'editable' ? addres?.house_address : ''}
                            error={errors.home_address}
                            classes={`${inputMode === 'editable' ? 'placeholder:text-neutral-800 placeholder:text-base' : ''} w-full`}
                            placeholderText={addres?.house_address || 'Enter your home address'}
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <InputField
                            {...register("house_number")}
                            mode={inputMode}
                            disabled={inputDisabled}
                            label="House Number"
                            defaultValue={inputMode !== 'editable' ? addres?.house_no : ''}
                            error={errors.house_number}
                            classes={`${inputMode === 'editable' ? 'placeholder:text-neutral-800 placeholder:text-base' : ''} w-full`}
                            placeholderText={addres?.house_no || 'Enter your house number'}
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-3">
                    <div className="w-full md:w-1/2">
                        <InputField
                            {...register("city")}
                            mode={inputMode}
                            disabled={inputDisabled}
                            label="City"
                            defaultValue={inputMode !== 'editable' ? addres?.city : ''}
                            error={errors.city}
                            classes={`${inputMode === 'editable' ? 'placeholder:text-neutral-800 placeholder:text-base' : ''} w-full`}
                            placeholderText={addres?.city || 'Enter your city'}
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <InputField
                            {...register("state")}
                            mode={inputMode}
                            disabled={inputDisabled}
                            label="State/Province"
                            defaultValue={inputMode !== 'editable' ? addres?.state : ''}
                            error={errors.state}
                            classes={`${inputMode === 'editable' ? 'placeholder:text-neutral-800 placeholder:text-base' : ''} w-full`}
                            placeholderText={addres?.state || 'Enter your state'}
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-3">
                    <div className="w-full md:w-1/2">
                        <InputField
                            {...register("postal_code")}
                            mode={inputMode}
                            disabled={inputDisabled}
                            label="Postal Code"
                            defaultValue={inputMode !== 'editable' ? addres?.postal_code : ''}
                            error={errors.postal_code}
                            classes={`${inputMode === 'editable' ? 'placeholder:text-neutral-800 placeholder:text-base' : ''} w-full`}
                            placeholderText={addres?.postal_code || 'Enter your postal code'}
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <InputField
                            {...register("country")}
                            mode={inputMode}
                            disabled={inputDisabled}
                            label="Country"
                            defaultValue={inputMode !== 'editable' ? addres?.country : ''}
                            error={errors.country}
                            classes={`${inputMode === 'editable' ? 'placeholder:text-neutral-800 placeholder:text-base' : ''} w-full`}
                            placeholderText={addres?.country || 'Enter your country'}
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* <div className="flex items-center justify-end gap-3 pt-6 pb-1 px-5">
            <ButtonOne
                type='submit'
                classes='py-2 px-8 font-semibold w-full sm:w-fit'
                btnText1={loading ? 'Saving...' : 'Save Profile'}
                icon1={<Save style={{fontSize: '17px'}} />}
            />
        </div> */}
    </form>
  )
}

export default Profile;