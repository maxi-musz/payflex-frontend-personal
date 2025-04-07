'use client';

import ButtonNeutral from '../button/ButtonNeutral';
import BankTransactionTable from './dataDisplay/BankTransactionTable';
import TransactionOptions from './dataDisplay/TransactionOptions';
import { useGeneralData } from '@/context/GeneralDataContext';
import { quickActions, walletBalanceInfo } from '@/data/base';
import QuickAction from './dataDisplay/QuickAction';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import CountUp from 'react-countup';
import { Key, RemoveRedEyeOutlined } from '@mui/icons-material';
import { parseFormattedAmountToNumber } from '@/utils/formatters';
import { getUserDashboard } from '@/features/dashboard/actions';
import { showToast } from '../HotToast';
import { useRouter } from 'next/navigation';
import { verifyPaystackFunding } from '@/features/banking/actions';
import DashboardHeader from '../DashboardHeader';

interface WalletProps {
  id: string,
  current_balance: number,
  all_time_fuunding: number,
  all_time_withdrawn: number,
  isActive: boolean,
  createdAt: string,
  updatedAt: string,
}

const Dashboard = () => {
  // const [activeTab, setActiveTab] = useState<string>('General');
  const [isBalanceOpen, setIsBalanceOpen] = useState(false);
  const [wallet, setWallet] = useState<WalletProps | null>(null);
  const [transactionHistory, setTransactionHistory] = useState(null);
  // const [accessToken, setAccessToken] = useState('');
  
  const {currentTab, currentData, setCurrentData} = useGeneralData();
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const token = sessionStorage.getItem("accessToken");
  
      if (!token) {
        router.push("/login");
        return;
      }
  
      // setAccessToken(token); // Set it for any later use
  
      // Handle paystack verification if reference exists
      const urlParams = new URLSearchParams(window.location.search);
      const reference = urlParams.get("reference");
  
      if (reference) {
        try {
          const res = await verifyPaystackFunding(token, { reference });
          if (res.success) {
            setCurrentData({...currentData, currentTab: '/'});
            // console.log(res);
            showToast(`${res.message}`);
          } 
          // else {
          //   showToast(
          //     "Something went wrong! Could not finish initialization of paystack funding.",
          //     "error"
          //   );
          // }
        } catch (error) {
          setTimeout(() => {
            showToast(
              `Error: ${(error as Error).message || "An unexpected error occurred"}`,
              "error"
            );
          }, 500);
        }
      }
  
      // Fetch dashboard data
      try {
        const res = await getUserDashboard(token);
        const { wallet, transactionHistory } = res.data;
  
        if (!res.success) {
          showToast("No data was gotten", "error");
        } else {
          setWallet(wallet);
          setTransactionHistory(transactionHistory);
        }
      } catch (error) {
        router.push("/login");
      }
    };
  
    init();
  }, [currentData, router, setCurrentData]);

  const handleBalanceToggle = () => setIsBalanceOpen(prev => !prev);

  return (
      <div className='w-full pt-2 pb-4 space-y-2 md:space-y-4'>
        <DashboardHeader/>

        {currentTab === '/' && 
        <>
          <TransactionOptions />

          <div className="flex items-center justify-between">
            <h2 className='text-3xl mt-10 font-semibold'>Recent transactions</h2>
            <ButtonNeutral btnText1='View all' classes='px-3 py-2 rounded-radius-8 border text-sm' />
          </div>

          <BankTransactionTable transactionHistory={transactionHistory} />

          {/* <div className='space-y-2'>
            <ul className='flex items-center gap border-b'>
              {dashboardTabs.map(tab => 
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

            {activeTab === 'General' && <BankTransactionTable transactionHistory={transactionHistory} />}
            {activeTab === 'VTU' && <VTU />}
            {activeTab === 'Bills' && <Bills />}
          </div> */}
        </>
      }
      {/* {currentTab === '/transaction-history' && <TransactionHistory />} */}
    </div>
  )

}

export default Dashboard;