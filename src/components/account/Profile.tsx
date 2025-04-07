'use client';

import { HomeOutlined, PersonOutlined, Save } from '@mui/icons-material';
import React, { useState } from 'react';
import InputField from '../inputs/InputField';
import ButtonOne from '../button/ButtonOne';
import { showToast } from '../HotToast';
import { Toaster } from 'react-hot-toast';

const Profile = () => {
    const [loading, setLoading] = useState(false);
    
    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            showToast("Profile updated successfully");
            setLoading(false);
        }, 2000);
    };
    console.log(loading);
    
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
                            // {...register("first_name")}
                            label="First Name"
                            // error={errors.first_name}
                            required
                            classes='w-full'
                            placeholderText='eg. Mikel'
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <InputField
                            // {...register("last_name")}
                            label="Last Name"
                            // error={errors.last_name}
                            required
                            classes='w-full'
                            placeholderText='eg. Adeyemi'
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
                            // {...register("first_name")}
                            label="Street Address"
                            // error={errors.first_name}
                            required
                            classes='w-full'
                            placeholderText='eg. Mikel'
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <InputField
                            // {...register("last_name")}
                            label="House Number"
                            // error={errors.last_name}
                            required
                            classes='w-full'
                            placeholderText='eg. Adeyemi'
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-3">
                    <div className="w-full md:w-1/2">
                        <InputField
                            // {...register("first_name")}
                            label="City"
                            // error={errors.first_name}
                            required
                            classes='w-full'
                            placeholderText='eg. Mikel'
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <InputField
                            // {...register("last_name")}
                            label="State/Province"
                            // error={errors.last_name}
                            required
                            classes='w-full'
                            placeholderText='eg. Adeyemi'
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-3">
                    <div className="w-full md:w-1/2">
                        <InputField
                            // {...register("first_name")}
                            label="Postal Code"
                            // error={errors.first_name}
                            required
                            classes='w-full'
                            placeholderText='eg. Mikel'
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <InputField
                            // {...register("last_name")}
                            label="Country"
                            // error={errors.last_name}
                            required
                            classes='w-full'
                            placeholderText='eg. Adeyemi'
                        />
                    </div>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-end pt-6 pb-1 px-5">
            <ButtonOne
                type='submit'
                classes='py-2 px-8 font-semibold'
                btnText1={loading ? 'Saving...' : 'Save Profile'}
                icon1={<Save style={{fontSize: '17px'}} />}
            />
        </div>
    </form>
  )
}

export default Profile;