'use client;'

import { menuItems } from '@/utils/data';
import React, { useEffect, useState } from 'react'
import ButtonNeutral from '../button/ButtonNeutral';
import { usePathname } from 'next/navigation';
import ButtonLinkNeutral from '../button/ButtonLinkNeutral';
import DropDownMenu from './DropDownMenu';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

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
                    classes={`${(isActivePath(item.url) || currentDropdownTab === item.title || currentActiveTab === item.title) ? "text-white bg-blue-600" : "text-textGray bg-transparent border-transparent"} focus:ring-transparent focus:text-white focus:bg-blue-600 flex-1 flex items-center gap-2 w-full hover:text-white hover:bg-blue-600 py-2 px-3 rounded-radius-4 text-sm transition-all duration-300 ease-in-out`}
                    icon1={<item.icon style={{fontSize: '16px'}} />}
                    icon2={currentDropdownTab === item.title ? <KeyboardArrowUp style={{fontSize: '16px'}} /> : <KeyboardArrowDown style={{fontSize: '16px'}} />}
                />

                {currentDropdownTab === item.title && <DropDownMenu menu={item.dropdownMenu} /> }
            </span>
            }

            {type === 'link' &&
            <ButtonLinkNeutral
                href={item.url}
                key={item.id}
                btnText1={item.title}
                classes={`${isActivePath(item.url) ? "text-white bg-blue-600" : "text-textGray bg-transparent border-transparent"} focus:ring-transparent flex-1 flex items-center gap-2 w-full hover:text-white hover:bg-blue-600 py-2 px-3 rounded-radius-4 text-sm transition-all duration-300 ease-in-out`}
                icon1={<item.icon style={{fontSize: '16px'}} />}
            />
            }
        </li>
    )}
    </>
  )
}

export default Tabs;