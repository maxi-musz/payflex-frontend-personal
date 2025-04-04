'use client;'

import { menuItems } from '../../data/base';
import React, { useEffect, useState } from 'react'
import ButtonNeutral from '../button/ButtonNeutral';
import { usePathname, useRouter } from 'next/navigation';
import DropDownMenu from './DropDownMenu';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useGeneralData } from '@/context/GeneralDataContext';
import ButtonLinkNeutral from '../button/ButtonLinkNeutral';

interface TabsProps {
    start: number,
    stop: number,
    type: 'link' | 'lowerLink' | 'btn' | 'lowerBtn'
}

const Tabs = ({start, stop, type}: TabsProps) => {
    const [currentDropdownTab, setCurrentDropdownTab] = useState<string | null>(null);
    const [currentActiveTab, setCurrentActiveTab] = useState<string | null>(null);

    const {setCurrentData, currentData, updateGeneralData} = useGeneralData();
    const pathName = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (pathName !== '/') {
            updateGeneralData(pathName);
        } else {
            updateGeneralData(currentData.currentTab);
        }
    }, [currentData.currentTab, updateGeneralData, pathName]);

    const handleTabNavigation = (url: string) => {
        if (url === '/') router.push('/');
        // setCurrentUrl(url);
        if (pathName === '/') setCurrentData({currentTab: url});
        // console.log(currentUrl);
    };

    useEffect(() => {
        const activeTab = menuItems.find(item => {
            if (item.url === (currentData.currentTab || pathName)) return true;
            if (item.dropdownMenu) {
                return item.dropdownMenu.some(subItem => subItem.url === (currentData.currentTab || pathName));
            }
            return false;
        });
        if (activeTab) {
            setCurrentActiveTab(activeTab.title);
        }
        // console.log(currentActiveTab, currentDropdownTab)
    }, [pathName, currentData.currentTab, currentActiveTab, currentDropdownTab]);

    const isActivePath = (route: string) => {
        if (!route) return false;
        return route === '/' || route === '/api-docs' || route === '/whatsapp' || route === '/contact-support' ? (currentData.currentTab || pathName) === route : (currentData.currentTab || pathName).startsWith(route);
    };

    const toggleDropdownMenu = (tab: string) => {
        // handleTabNavigation(url);
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
                    classes={`${(isActivePath(item.url) || currentDropdownTab === item.title || currentActiveTab === item.title) ? "text-white bg-primary" : "text-textGray bg-transparent border-transparent"} flex-1 flex items-center gap-2 w-full hover:text-white hover:bg-primary py-2 px-3 rounded-radius-4 text-sm transition-all duration-300 ease-in-out`}
                    icon1={<item.icon style={{fontSize: '16px'}} />}
                    icon2={currentDropdownTab === item.title ? <KeyboardArrowUp style={{fontSize: '16px'}} /> : <KeyboardArrowDown style={{fontSize: '16px'}} />}
                />

                {currentDropdownTab === item.title && <DropDownMenu menu={item.dropdownMenu} handleTabNavigation={handleTabNavigation} /> }
            </span>}

            {type === 'link' &&
            <ButtonNeutral
                onClick={() => handleTabNavigation(item.url)}
                key={item.id}
                btnText1={item.title}
                classes={`${isActivePath(item.url) ? "text-white bg-primary" : "text-textGray bg-transparent border-transparent"} flex-1 flex items-center gap-2 w-full hover:text-white hover:bg-primary py-2 px-3 rounded-radius-4 text-sm transition-all duration-300 ease-in-out`}
                icon1={<item.icon style={{fontSize: '16px'}} />}
            />}

            {type === 'lowerLink' &&
            <ButtonLinkNeutral
                href={item.url}
                key={item.id}
                btnText1={item.title}
                classes={`${isActivePath(item.url) ? "text-white bg-primary" : "text-textGray bg-transparent border-transparent"} flex-1 flex items-center gap-2 w-full hover:text-white hover:bg-primary py-2 px-3 rounded-radius-4 text-sm transition-all duration-300 ease-in-out`}
                icon1={<item.icon style={{fontSize: '16px'}} />}
            />}
        </li>
    )}
    </>
  )
}

export default Tabs;