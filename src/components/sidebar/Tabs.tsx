'use client';

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

    // First effect: Update general data based on pathname
    useEffect(() => {
        // Always update with the current pathname to keep state in sync
        updateGeneralData(pathName);
    }, [pathName, updateGeneralData]);

    const handleTabNavigation = (url: string) => {
        // Always update the current tab data
        setCurrentData({currentTab: url});
        
        // Navigate to the URL if it's a direct link
        if (url) {
            router.push(url);
        }
    };

    // Second effect: Track active tab based on current path or state
    useEffect(() => {
        const currentPath = currentData.currentTab || pathName;
        
        const activeTab = menuItems.find(item => {
            if (item.url === currentPath) return true;
            if (item.dropdownMenu && item.dropdownMenu.length > 0) {
                return item.dropdownMenu.some(subItem => subItem.url === currentPath);
            }
            return false;
        });

        if (activeTab) {
            setCurrentActiveTab(activeTab.title);
        }
    }, [pathName, currentData.currentTab]);

    const isActivePath = (route: string) => {
        if (!route) return false;
        
        const currentPath = currentData.currentTab || pathName;
        
        // For root paths or specific full paths, require exact match
        if (route === '/' || route === '/api-docs' || route === '/whatsapp' || route === '/contact-support') {
            return currentPath === route;
        }
        // For other paths, check if current path starts with the route
        return currentPath.startsWith(route);
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
                        classes={`${(isActivePath(item.url) || currentDropdownTab === item.title || currentActiveTab === item.title) ? "text-white bg-primary" : "text-textGray bg-transparent border-transparent"} flex-1 flex items-center gap-2 w-full hover:text-white hover:bg-primary py-2 px-3 rounded-radius-4 text-sm transition-all duration-300 ease-in-out`}
                        icon1={<item.icon style={{fontSize: '16px'}} />}
                        icon2={currentDropdownTab === item.title ? <KeyboardArrowUp style={{fontSize: '16px'}} /> : <KeyboardArrowDown style={{fontSize: '16px'}} />}
                    />

                    {currentDropdownTab === item.title && 
                     <DropDownMenu menu={item.dropdownMenu} handleTabNavigation={handleTabNavigation} />
                    }
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