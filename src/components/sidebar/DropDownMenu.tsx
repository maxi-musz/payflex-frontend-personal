'use client';

import React from 'react'
import ButtonLinkNeutral from '../button/ButtonLinkNeutral';
import { usePathname } from 'next/navigation';

interface DropDownMenuProps {
    menu: {
        id: number,
        title: string,
        url: string
    }[],
}

const DropDownMenu = ({menu}: DropDownMenuProps) => {
    const pathName = usePathname();
    
    const isActivePath = (route: string | null) => {
        if (!route) return false;
        return pathName === route;
        // return pathName.includes(route);
    };

  return (
    <ul className={`top-10 w-full border absolute left-0 py-1 z-20 bg-white shadow-md rounded-radius-4`}>
        {menu.map(menuItem => 
            <li key={menuItem.id} className='group w-full whitespace-nowrap p-1'>
                <ButtonLinkNeutral
                    href={menuItem.url}
                    btnText1={menuItem.title}
                    classes={`${isActivePath(menuItem.url) ? "text-white bg-blue-600" : "text-textGray bg-transparent"} border-0 focus:ring-transparent flex-1 flex items-center gap-3 w-full group-hover:text-white group-hover:bg-blue-600 py-1 px-3 rounded-radius-4 text-sm transition-all duration-300 ease-in-out`}
                />
            </li>
        )}
    </ul>
  )
}

export default DropDownMenu;