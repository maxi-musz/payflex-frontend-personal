'use client';

import { menuItems } from '../../data/base';
import Image from 'next/image';
import Link from 'next/link';
import ButtonNeutral from '../button/ButtonNeutral';
import { useRouter } from 'next/navigation';
import Tabs from './Tabs';
import { Logout } from '@mui/icons-material';
import { useGeneralData } from '@/context/GeneralDataContext';
import { useEffect, useState } from 'react';

interface SidebarProps {
    show?: string;
    closeSidebar?: () => void;
}
  
const Sidebar: React.FC<SidebarProps> = ({ show = 'hidden', closeSidebar = () => {} }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const {loggedInUser, dropLoggedInUserInfo} = useGeneralData();
    
    const router = useRouter();

    useEffect(() => {
        setFirstName(loggedInUser.first_name)
        setLastName(loggedInUser.last_name)
        setEmail(loggedInUser.email)
    }, [loggedInUser.first_name, loggedInUser.last_name, loggedInUser.email]);

    const logout = () => {
        dropLoggedInUserInfo();
        sessionStorage.removeItem('accessToken');
        router.push('/login');
    }

    return (
        <nav className={`${show === 'block' ? 'fixed lg:hidden' : 'hidden'} px-2 lg:block top-0 left-0 z-50 lg:z-auto w-4/6 sm:w-3/6 lg:w-[21%] xl:w-1/6 h-full min-h-screen bg-white lg:bg-transparent`}>
            <div className={`relative overflow-y-scroll custom-scrollbar2 w-full h-screen min-h-screen flex flex-col justify-between items-start px-1 pt-10 md:pt-0`}>
                <button className='absolute top-2 right-2 text-3xl lg:hidden hover:text-red-500' onClick={closeSidebar}>&times;</button>
                <div className="h-full min-h-full flex flex-col justify-start items-start gap-4 pb-5 md:py-6">
                    <Link href="/" className="flex items-center gap-1">
                        <div className="relative size-14 px-3 rounded-full">
                            <Image
                                src="/images/PayFlex-Logo.jpg"
                                alt="PayFlex's Logo"
                                fill
                                priority
                                className="object-contai rounded-full"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        <p className="font-semibold text-3xl lg:text-4xl">PayFlex</p>
                    </Link>
                    
                    <div className="flex-1 flex flex-col items-start justify-between gap-5">
                        {/* <div className="w-full px-1 bg-white border border-customGray flex items-center justify-between rounded-radius-8 focus-within:ring-1 focus-within:ring-primary hover:ring-primary">
                            <ButtonNeutral classes='p-0 ml-1 rounded-full' icon1={<div className='relative size-[16px]'><Image src="/icons/search-md.svg" fill alt="search icon" className={`object-contain`} sizes="(max-width: 768px) 100vw, 50vw" /></div>} />
                            <Search onChange={handleSearch} />
                        </div> */}
                        <ul className="flex flex-col items-start justify-start gap-3 w-full">
                            <Tabs start={0} stop={3} type="link" />
                            <Tabs start={3} stop={4} type="btn" />
                            <Tabs start={4} stop={6} type="link" />
                            <Tabs start={6} stop={9} type="btn" />
                            <Tabs start={9} stop={10} type="link" />
                        </ul>

                        <div className="border-t">
                            <ul className="flex flex-col items-start justify-start gap-3 w-full py-2">
                                <Tabs start={10} stop={11} type="btn" />
                                <Tabs start={11} stop={menuItems.length} type="lowerLink" />
                            </ul>

                            <div className="pl-2 pt-2 pb-5 flex items-center gap-3 border-t">
                                <div className="relative size-9 rounded-full">
                                    <Image
                                        src="/images/3.jpeg"
                                        alt="User's profile image"
                                        fill
                                        className="object-contain rounded-full"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <p className='capitalize text-[12px] text-textGray font-semibold'>{`${firstName} ${lastName}` || 'Victor Okoye'}</p>
                                    <p className='text-[10px] text-textGray'>{`${email}` || 'victor.c.okoye@gmail.com'}</p>
                                </div>
                                <ButtonNeutral
                                    onClick={logout}
                                    classes={`focus:ring-transparent bg-transparent border-transparent hover:bg-[#F6F6F6] border hover:border-customGray p-1 rounded-radius-4 transition-all duration-300 ease-in-out`}
                                    icon1={<Logout style={{fontSize: '20px'}} />}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
