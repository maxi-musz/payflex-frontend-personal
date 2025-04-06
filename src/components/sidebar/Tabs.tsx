'use client';

import { menuItems } from '../../data/base';
import React, { useState } from 'react';
import ButtonNeutral from '../button/ButtonNeutral';
import { usePathname, useRouter } from 'next/navigation';
import DropDownMenu from './DropDownMenu';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useGeneralData } from '@/context/GeneralDataContext';

interface TabsProps {
  start: number;
  stop: number;
}

const Tabs = ({ start, stop }: TabsProps) => {
  const [currentDropdownTab, setCurrentDropdownTab] = useState<string | null>(null);
  const pathName = usePathname();
  const router = useRouter();
  const { updateGeneralData, currentData } = useGeneralData();

  const isActivePath = (route: string | null) => {
    if (!route) return false;
    return pathName === route;
  };

  const handleDirectTabClick = (itemUrl: string) => {
    updateGeneralData(itemUrl);
    router.push(itemUrl);
  };

  const handleDropdownTabClick = (dropdownUrl: string, parentUrl: string) => {
    updateGeneralData(dropdownUrl);
    router.push(parentUrl);
    setCurrentDropdownTab(null);
  };

  const isParentActive = (itemUrl: string, dropdownMenu?: { url: string }[]) => {
    if (isActivePath(itemUrl)) return true;
    if (dropdownMenu && dropdownMenu.length > 0) {
      return dropdownMenu.some(subItem => subItem.url === currentData.currentTab);
    }
    return false;
  };

  const toggleDropdownMenu = (tab: string) => {
    setCurrentDropdownTab((prev) => (prev === tab ? null : tab));
  };

  return (
    <>
      {menuItems.slice(start, stop).map((item, index) => (
        <li key={index} className="w-full">
          <span className="relative">
            <ButtonNeutral
              btnText1={item.title}
              onClick={() => item.dropdownMenu.length > 0 ? toggleDropdownMenu(item.title) : handleDirectTabClick(item.url)}
              classes={`${
                isParentActive(item.url, item.dropdownMenu)
                  ? 'text-white bg-primary'
                  : 'text-textGray bg-transparent border-transparent'
              } flex-1 flex items-center gap-2 w-full hover:text-white hover:bg-primary py-2 px-3 rounded-radius-4 text-sm transition-all duration-300 ease-in-out`}
              icon1={<item.icon style={{ fontSize: '16px' }} />}
              icon2={
                item.dropdownMenu.length > 0 ? (
                  currentDropdownTab === item.title ? (
                    <KeyboardArrowUp style={{ fontSize: '16px' }} />
                  ) : (
                    <KeyboardArrowDown style={{ fontSize: '16px' }} />
                  )
                ) : null
              }
            />

            {currentDropdownTab === item.title && item.dropdownMenu.length > 0 && (
              <DropDownMenu
                menu={item.dropdownMenu}
                handleTabNavigation={(dropdownUrl) =>
                  handleDropdownTabClick(dropdownUrl, item.url)
                }
              />
            )}
          </span>
        </li>
      ))}
    </>
  );
};

export default Tabs;
