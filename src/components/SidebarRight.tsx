'use client';

import Image from 'next/image';
import ButtonNeutral from './button/ButtonNeutral';
import { budgets } from '@/utils/data';
// import { useGeneralData } from '@/context/GeneralDataContext';

interface SidebarProps {
    show?: string;
    closeSidebar?: () => void;
}
  
const SidebarRight: React.FC<SidebarProps> = ({ show = 'hidden', closeSidebar = () => {} }) => {
    // const {currentData} = useGeneralData();
    
    return (
        <nav className={`${show === 'block' ? 'fixed md:hidden' : 'hidden'} md:block top-0 left-0 z-50 lg:z-auto w-4/6 sm:w-3/6 md:w-[33.5%] lg:w-[23%] h-full min-h-fit bg-white md:bg-transparent`}>
            <div className="relative mb-16">
                <div className="relative w-full h-[100px]">
                    <Image
                        src="/images/profile_banner.jpg"
                        alt="User's profile banner"
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
                <div className="absolute -bottom-1/2 left-4 size-20 rounded-full border-2 border-white shadow-md">
                    <Image
                        src="/images/3.jpeg"
                        alt="User's profile picture"
                        fill
                        priority
                        className="object-cover rounded-full"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
            </div>

            <div className='px-4 mb-6'>
                <h2 className='font-semibold'>Joseph Mark</h2>
                <p className='text-textGray text-sm'>joseph.mark@gmail.com</p>
                {/* <h2 className='font-semibold'>{currentData.userName}</h2>
                <p className='text-textGray text-sm'>{currentData.userEmail}</p> */}
            </div>

            <div className="divide-y divide-customGray space-y-64">
                <div className='px-4'>
                    <div className="flex items-center justify-between">
                        <h2 className=''>My Banks</h2>
                        <ButtonNeutral btnText2='+' btnText1='Add bank' classes='text-sm space-x-2' btnText2Classes='text-lg' />
                    </div>

                    <div className="relative my-6">
                        <div className="absolute right-0 top-7 w-[90%] h-[170px] rounded-xl">
                            <Image
                                src="/images/gold-debit-new.png"
                                alt="Gold debit card"
                                fill
                                priority
                                className="object-cover rounded-xl"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        <div className="absolute left-0 top-0 w-[90%] h-[170px] rounded-xl">
                            <Image
                                src="/images/uba-debit-mastercard.png"
                                alt="UBA debit card"
                                fill
                                priority
                                className="object-cover rounded-xl"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>

                <div className='px-4'>
                    <div className="flex items-center justify-between pt-4">
                        <h2 className=''>My Budgets</h2>
                        <ButtonNeutral btnText2='...' btnText1='' classes='text-sm space-x-2' btnText2Classes='text-lg' />
                    </div>

                    {budgets.slice(0,2).map(budget => 
                        <div key={budget.id} className={`flex items-center justify-between gap-3 ${budget.overallColor === 'green' ? 'bg-green-50' : budget.overallColor === 'blue' ? 'bg-blue-50' : 'bg-red-50'} w-full my-4 p-3 rounded-radius-8`}>
                            <div className={`rounded-full p-2 ${budget.overallColor === 'green' ? 'bg-green-300' : budget.overallColor === 'blue' ? 'bg-blue-300' : 'bg-red-300'} `}>
                                <div className={`relative size-4 rounded-full bg-${budget.overallColor}-300`}>
                                    <Image
                                        src={`/icons/${budget.icon}`}
                                        alt="Lapo's Logo"
                                        fill
                                        priority
                                        className="object-cover rounded-full"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </div>

                            <div className="w-[85%]">
                                <p className='flex items-center justify-between gap-x-3 flex-wrap pb-2'>
                                    <span className={`${budget.overallColor === 'green' ? 'text-green-800' : budget.overallColor === 'blue' ? 'text-blue-800' : 'text-red-800'} text-sm`}>{budget.text1}</span>
                                    <span className={`${budget.overallColor === 'green' ? 'text-green-700' : budget.overallColor === 'blue' ? 'text-blue-700' : 'text-red-700'} text-sm`}>{budget.text2}</span>
                                </p>
                                <span className={`${budget.overallColor === 'green' ? 'bg-green-200' : budget.overallColor === 'blue' ? 'bg-blue-200' : 'bg-red-200'} rounded-full flex items-center justify-start`}>
                                    <span className={`${budget.overallColor === 'green' ? 'bg-green-700' : budget.overallColor === 'blue' ? 'bg-blue-700' : 'bg-red-700'} px-2 py-1 w-[30%] rounded-full flex items-center justify-center`}></span>
                                </span>
                            </div>
                        </div>
                    )}
                </div>
                <button className='self-end mr-3 md:mr-8 mt-2 text-3xl md:hidden' onClick={closeSidebar}>&times;</button>
            </div>
        </nav>
    );
};

export default SidebarRight;
