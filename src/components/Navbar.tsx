'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import ButtonNeutral from './button/ButtonNeutral';
import MenuIcon from './icons/MenuIcon';
import { HelpCenterOutlined, NotificationsOutlined, QrCodeScannerOutlined } from '@mui/icons-material';
import { useGeneralData } from '@/context/GeneralDataContext';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useGeneralData } from '@/context/GeneralDataContext';

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const {loggedInUser} = useGeneralData();

  useEffect(() => {
      setFirstName(loggedInUser.first_name);
  }, [loggedInUser.first_name]);
  
  const closeSidebar = () => setOpen(false);

  return (
    <>
      <nav className="flex items-center justify-between gap-3 z-30 py-2 sm:px-3 md:px-2">
        <div className="w-full flex items-center gap-2">
          {/* <Link href="/" className={`lg:hidden sm:mr-4 relative w-16 h-[35px] sm:w-20 sm:h-[40px] md:w-28 md:h-[45px]`}>
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
              <p className="font-semibold md:text-3xl lg:text-4xl hidden md:inline">PayFlex</p>
          </Link> */}
          <h1 className='text-base md:text-xl font-semibold py-1'>Hi, <span className='text-blue-700'>{firstName || 'Victor'}</span></h1>
        </div>
        

        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <ButtonNeutral icon2={<HelpCenterOutlined style={{fontSize: '20px'}} />} classes='text-sm bg-transparent text-neutral-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 eas-in-out rounded-full size-8' />
            <ButtonNeutral icon2={<QrCodeScannerOutlined style={{fontSize: '20px'}} />} classes='text-sm bg-transparent text-neutral-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 eas-in-out rounded-full size-8' />
            <ButtonNeutral icon2={<NotificationsOutlined style={{fontSize: '20px'}} />} classes='text-sm bg-transparent text-neutral-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 eas-in-out rounded-full size-8' />
          </div>

          {/* Hamburger menu */}
          <ButtonNeutral onClick={() => setOpen(!open)} icon1={<MenuIcon />} classes='lg:hidden focus:outline-primary bg-transparent text-neutral-700 hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 eas-in-out rounded-radius-8 p-1' />
        </div>
      </nav>

      {open && (
        <>
          <Sidebar show="block" closeSidebar={closeSidebar} />

          <div
            onClick={closeSidebar}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          />
        </>
      )}
    </>
  );
};

export default Navbar;
