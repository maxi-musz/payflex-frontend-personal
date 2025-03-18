'use client';

import { usePathname } from 'next/navigation';
import { useGeneralData } from '@/context/GeneralDataContext';
import ButtonNeutral from '../button/ButtonNeutral';

interface DropDownMenuProps {
    menu: {
        id: number,
        title: string,
        url: string
    }[],
    handleTabNavigation: (url: string) => void;
}

const DropDownMenu = ({menu, handleTabNavigation}: DropDownMenuProps) => {
    const pathName = usePathname();
    const {currentTab} = useGeneralData();
    // const [currentUrl, setCurrentUrl] = useState('/');
        
    // useEffect(() => {
    //     updateGeneralData(currentUrl);
    // }, [currentUrl, updateGeneralData]);

    // const handleTabNavigation = (url: string) => {
    //     setCurrentUrl(url);
    //     setCurrentData({currentTab: url});
    //     // console.log(currentUrl);
    // };

    const isActivePath = (route: string | null) => {
        if (!route) return false;
        return (currentTab || pathName) === route;
        // return pathName.includes(route);
    };
    
  return (
    <ul className={`top-10 w-full border absolute left-0 py-1 z-20 bg-white shadow-md rounded-radius-4`}>
        {menu.map(menuItem => 
            <li key={menuItem.id} className='group w-full whitespace-nowrap p-1'>
                <ButtonNeutral
                    onClick={() => handleTabNavigation(menuItem.url)}
                    btnText1={menuItem.title}
                    classes={`${isActivePath(menuItem.url) ? "text-white bg-blue-600" : "text-textGray bg-transparent"} border-0 focus:ring-transparent flex-1 flex items-center gap-3 w-full group-hover:text-white group-hover:bg-blue-600 py-1 px-3 rounded-radius-4 text-sm transition-all duration-300 ease-in-out`}
                />
            </li>
        )}
    </ul>
  )
}

export default DropDownMenu;