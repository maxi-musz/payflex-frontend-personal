'use client';

import { rowDropdownMenu } from '@/utils/data';
import ButtonNeutral from '../button/ButtonNeutral';
import { useRouter } from 'next/navigation';
// import { toast } from 'react-toastify';


interface RowDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  // item: User;
}

const RowDropdown: React.FC<RowDropdownProps> = ({ isOpen }) => {
  // const rowDropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  if (!isOpen) return null;

  const handleMenuItemClick = (tab: string) => {
    if (tab === 'Accept') {
      alert('This user has been activated!');
    } else if (tab === 'View User') {
      router.push('');
    } else if (tab === 'Report User') {
      alert('This user has been reported!');
    } else if (tab === 'Block User') {
      alert('This user has been blocked!');
    }
  };

  return (
    <ul id='rowDropDownMenu' className={`absolute left-0 top-11 w-fit border py-1 z-50 bg-white shadow-md rounded-radius-4`}>
        {rowDropdownMenu.map(menuItem => 
            <li key={menuItem.id} className='group w-full whitespace-nowrap p-1'>
                <ButtonNeutral
                  onClick={() => handleMenuItemClick(menuItem.title)}
                  btnText1={menuItem.title}
                  classes={`border-0 focus:ring-transparent flex-1 flex items-center gap-3 w-full group-hover:text-white group-hover:bg-primary py-1 px-3 rounded-radius-4 text-sm transition-all duration-300 ease-in-out`}
                />
            </li>
        )}
    </ul>
    // <div ref={rowDropdownRef} className={`dataDropDownMenu open`}>
    //   <ul>
    //     <li>
    //       <Link href={`/dashboard/users/${user.id}`} className='' tabIndex={-1}>
    //         <button className='menuBtn'>
    //           <div className='menuIcon'>
    //             <Image
    //               src="/images/np_view_1214519_000000 1.svg"
    //               alt="View details"
    //               fill
    //               className="object-cover rounded-full"
    //               sizes="(max-width: 768px) 100vw, 50vw"
    //             />
    //           </div>
    //           <span>View details</span>
    //         </button>
    //       </Link>
    //     </li>
    //     <li>
    //       <button className='menuBtn' onClick={handleBlacklistUser}>
    //         <div className='menuIcon'>
    //           <Image
    //             src="/images/np_delete-friend_3248001_000000 1.svg"
    //             alt="Blacklist user"
    //             fill
    //             className="object-cover rounded-full"
    //             sizes="(max-width: 768px) 100vw, 50vw"
    //           />
    //         </div>
    //         <span>Blacklist user</span>
    //       </button>
    //     </li>
    //     <li>
    //       <button className='menuBtn' onClick={handleActivateUser}>
    //         <div className='menuIcon'>
    //           <Image
    //             src="/images/np_user_2995993_000000 1.svg"
    //             alt="Activate user"
    //             fill
    //             className="object-cover rounded-full"
    //             sizes="(max-width: 768px) 100vw, 50vw"
    //           />
    //         </div>
    //         <span>Activate user</span>
    //       </button>
    //     </li>
    //   </ul>
    // </div>
  );
};

export default RowDropdown;
