'use client';

import { useGeneralData } from '@/context/GeneralDataContext';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../LoadingSpinner';

const UserSection = () => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const {user, contextLoading} = useGeneralData();

    useEffect(() => {
        if (user !== null) {
            setFirstName(user.name);
            setEmail(user.email);
        }
    }, [user?.name, user?.email, user]);
    
  return (
    <div>
        <div className="relative mb-16">
            <div className="relative w-full h-[100px]">
                <Image
                    src="/images/profile_banner.jpg"
                    alt="User's profile banner"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
            <div className="absolute -bottom-1/2 left-4 size-20 rounded-full border-2 border-white shadow-md">
                <Image
                    src="/images/default_avatar.png"
                    alt="User's profile picture"
                    fill
                    priority
                    className="object-cover rounded-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
        </div>

        <div className='px-4 mb-6'>
            {contextLoading ? <LoadingSpinner/> :
            <>
                <h2 className='font-semibold'>{firstName}</h2>
                <p className='text-textGray text-sm'>{email}</p>
            </>}
        </div>
    </div>
  )
}

export default UserSection;