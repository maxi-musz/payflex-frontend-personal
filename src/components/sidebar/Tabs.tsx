'use client;'

import { menuItems } from '@/utils/data';
import React, { useEffect, useState } from 'react'
import ButtonNeutral from '../button/ButtonNeutral';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import ButtonLinkNeutral from '../button/ButtonLinkNeutral';
import DropDownMenu from './DropDownMenu';

interface TabsProps {
    start: number,
    stop: number,
    type: 'link' | 'lowerLink' | 'btn' | 'lowerBtn'
}

const Tabs = ({start, stop, type}: TabsProps) => {
    const [currentDropdownTab, setCurrentDropdownTab] = useState<string | null>(null);
    const [currentActiveTab, setCurrentActiveTab] = useState<string | null>(null);
    const pathName = usePathname();

    useEffect(() => {
        const activeTab = menuItems.find(item => {
            if (item.url === pathName) return true;
            if (item.dropdownMenu) {
                return item.dropdownMenu.some(subItem => subItem.url === pathName);
            }
            return false;
        });
        if (activeTab) {
            setCurrentActiveTab(activeTab.title);
        }
        // console.log(currentActiveTab, currentDropdownTab)
    }, [pathName, currentActiveTab, currentDropdownTab]);

    const isActivePath = (route: string | null) => {
        if (!route) return false;
        return route === '/' ? pathName === route : pathName.startsWith(route);
    };

    const toggleDropdownMenu = (tab: string) => {
        setCurrentDropdownTab((prevId) => (prevId === tab ? null : tab));
    };

  return (
    <>
    {menuItems.slice(start, stop).map(item =>
        <li key={item.id} className='w-full'>
            {type === 'btn' && 
            <span key={item.id} className='relative'>
                <ButtonNeutral
                    key={item.id}
                    btnText1={item.title}
                    onClick={() => toggleDropdownMenu(item.title)}
                    classes={`${(isActivePath(item.url) || currentDropdownTab === item.title || currentActiveTab === item.title) ? "text-white bg-blue-600" : "text-textGray bg-transparent border-transparent"} focus:ring-transparent focus:text-white focus:bg-blue-600 flex-1 flex items-center gap-3 w-full hover:text-white hover:bg-blue-600 py-2 px-3 rounded-radius-4 text-sm transition-all duration-300 ease-in-out`}
                    icon1={<div className="relative size-[16px]"><Image src={`/icons/${item.icon}`} fill alt={`${item.title} icon`} title={`Go to ${item.title} page`} className={`object-contain`} sizes="(max-width: 768px) 100vw, 50vw" /></div>}
                    icon2={<div className="relative size-[16px]"><Image src={`/icons/chevron-down.svg`} fill alt={`${item.title} icon`} title={`Go to ${item.title} page`} className={`object-contain ${currentDropdownTab === item.title ? 'transform rotate-180' : ''}`} sizes="(max-width: 768px) 100vw, 50vw" /></div>}
                />

                {currentDropdownTab === item.title && <DropDownMenu menu={item.dropdownMenu} tab={item.title} /> }
            </span>
            }

            {type === 'lowerBtn' && 
            <span key={item.id} className='relative'>
                <ButtonNeutral
                    btnText1={item.title}
                    onClick={() => toggleDropdownMenu(item.title)}
                    classes={`${(isActivePath(item.url) || currentDropdownTab === item.title || currentActiveTab === item.title) ? "text-blue-700 font-semibold" : "text-textGrayDarker"} flex-1 flex items-center gap-3 w-full hover:text-blue-700 text-sm transition-all duration-300 ease-in-out`}
                    icon2={<div className="relative size-[16px]"><Image src={`/icons/chevron-down.svg`} fill alt={`${item.title} icon`} title={`Go to ${item.title} page`} className={`object-contain ${currentDropdownTab === item.title ? 'transform rotate-180' : ''}`} sizes="(max-width: 768px) 100vw, 50vw" /></div>}
                />
                
                {currentDropdownTab === item.title && <DropDownMenu menu={item.dropdownMenu} tab={item.title} /> }
            </span>
            }

            {type === 'link' &&
            <ButtonLinkNeutral
                href={item.url}
                key={item.id}
                btnText1={item.title}
                classes={`${isActivePath(item.url) ? "text-white bg-blue-600" : "text-textGray bg-transparent border-transparent"} focus:ring-transparent flex-1 flex items-center gap-3 w-full hover:text-white hover:bg-blue-600 py-2 px-3 rounded-radius-4 text-sm transition-all duration-300 ease-in-out`}
                icon1={<div className="relative size-[16px]"><Image src={`/icons/${item.icon}`} fill alt={`${item.title} icon`} title={`Go to ${item.title} page`} className={`object-contain`} sizes="(max-width: 768px) 100vw, 50vw" /></div>}
            />
            }

            {type === 'lowerLink' &&
            <ButtonLinkNeutral
                href={item.url}
                key={item.id}
                btnText1={item.title}
                classes={`${isActivePath(item.url) ? "text-blue-700 font-semibold" : "text-textGrayDarker"} flex-1 flex items-center gap-3 w-full hover:text-blue-700 text-sm transition-all duration-300 ease-in-out`}
            />
            }
        </li>
    )}
    </>
  )
}

export default Tabs;