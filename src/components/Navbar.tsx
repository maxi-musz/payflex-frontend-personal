'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import Sidebar from './sidebar/Sidebar';
import ButtonNeutral from './button/ButtonNeutral';
import MenuIcon from './icons/MenuIcon';

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  
  const closeSidebar = () => setOpen(false);

  return (
    <>
      <nav className="flex lg:hidden items-center justify-between gap-3 z-30 py-1 md:py-2 pl-[2px] pr-3 sm:px-3 md:px-5 border-b border-customGray">
        <div className="w-full flex items-center justify-between">
          <Link href="/" className={`lg:hidden sm:mr-4 relative w-[138.32px] h-[45px]`}>
            <Image
              src="/images/LAPO_Logo_2022-removebg-preview 1.svg"
              alt="Lapo's Logo"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </Link>
        </div>

        {/* Hamburger menu */}
        <ButtonNeutral onClick={() => setOpen(!open)} icon1={<MenuIcon />} classes='lg:hidden text-gray-700 focus:outline-primary' />
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
