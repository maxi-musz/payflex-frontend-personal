import { p2pLendingTabs } from '@/utils/data';
import React, { useState } from 'react'
import ButtonOne from '../button/ButtonOne';
import ButtonNeutral from '../button/ButtonNeutral';
import Lend from './Lend';
import History from './History';
import Borrow from './Borrow';
import { CampaignOutlined, Tune } from '@mui/icons-material';

const P2PLending = () => {
  const [activeTab, setActiveTab] = useState<string>('Lend');

  const handleTabToggle = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <section className='space-y-5'>
      <div className="w-full flex items-center justify-between flex-wrap gap-4">
        <h1 className='text-lg font-semibold'>P2P Lending</h1>
        <div className="flex items-center  gap-2">
          <ButtonNeutral icon1={<Tune style={{fontSize: '20px'}} />} btnText1='Filter' classes='flex items-center gap-2 rounded-radius-8 hover:shadow-md border border-primary hover:border-transparent text-primary_hover hover:text-white font-semibold hover:bg-primary py-2 px-3 rounded-radius-4 text-sm transition-all duration-300 ease-in-out'/>
          <ButtonOne icon1={<CampaignOutlined style={{fontSize: '22px'}} className='transform -rotate-45' />} btnText1='New Borrow Request' classes='py-2 px-3' />
        </div>
      </div>

      <div className="w-full mt-3">
        <ul className='flex items-center gap border-b'>
          {p2pLendingTabs.map(tab => 
            <li key={tab.id} className='group'>
              <button onClick={() => handleTabToggle(tab.title)} className={`cursor-pointer py- px-6`}>
                <span className="flex items-center gap-2 overflow-hidden">
                  <span className="">
                    <span className={`${activeTab === tab.title ? 'text-primary' : 'text-gray-700 group-hover:text-blue-700'} text-[15px] font-semibold`}>{tab.title}</span>
                    <div className={`${activeTab === tab.title ? '-translate-x-0 bg-primary' : '-translate-x-full group-hover:-translate-x-0 bg-transparent group-hover:bg-primary'} transform h-[1.7px] w-full transition-all duration-300 ease-in-out`}></div>
                  </span>
                </span>
              </button>
            </li>
          )}
        </ul>

        <div className="w-full space-y-3 py-4">
          {activeTab === 'Lend' && <Lend />}
          {activeTab === 'Borrow' && <Borrow />}
          {activeTab === 'History' && <History />}
        </div>
      </div>
    </section>
  )
}

export default P2PLending;