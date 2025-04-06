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

interface AccountsProps {
  id: string,
  account_number: string,
  account_type: string,
  balance: string,
  bank_name: string,
  bank_code: string
}

const Dashboard = () => {
  // const [activeTab, setActiveTab] = useState<string>('General');
  const [isBalanceOpen, setIsBalanceOpen] = useState(false);
  const [accounts, setAccounts] = useState<AccountsProps[] | null>(null);
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
        const { accounts, transactionHistory } = res.data;
  
        if (!res.success) {
          showToast("No data was gotten", "error");
        } else {
          setAccounts(accounts);
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
          <Toaster position="top-center" reverseOrder={false} />

          <div className="flex items-center gap-2 md:gap-4 xl:gap-6 flex-wrap">
              <div className='space-y-2'>
                  {walletBalanceInfo.slice(0,1).map(item =>
                    <div key={item.id} className='w-72 flex-1 sm:flex-none h-40 py-6 pl-5 pr-3 bg-blue-200 rounded-3xl flex flex-col justify-between'>
                      <div className="w-full flex items-center justify-end gap-1">
                        <p className='font-semibold text-xl'>{item.currencyInitials}</p>
                        <div className="relative size-8 rounded-full">
                          <Image
                            src={`/images/${item.currencyFlag}`}
                            alt="Currency's country logo"
                            fill
                            priority
                            className="object-cover rounded-full"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <p className="text-neutral-800 text-base font-semibold">Wallet Balance</p>
                        <div className="w-full flex items-center justify-between">
                          <p className='text-textGrayDarker text-xl md:text-2xl font-bold space-x-1'>
                            <span className={`${item.currency === '₦' ? 'text-green-600' : item.currency === '£' ? 'text-red-600' : 'text-blue-800'} font-extrabold`}>{item.currency}</span>
                            {accounts?.slice(0,1).map(acc => 
                              <span key={acc.id}>
                                {!isBalanceOpen ? <CountUp start={0} end={parseFormattedAmountToNumber(acc.balance) || parseInt(item.balance)} duration={2} delay={0} decimal='true' /> : "******"}
                              </span>
                            )}
                          </p>
                          <button onClick={handleBalanceToggle} className='hover:bg-blue-300 rounded-full size-8 flex items-center justify-center border hover:border-transparent transition-all duration-300 ease-in-out'>
                            {isBalanceOpen ?
                            <RemoveRedEyeOutlined style={{fontSize: '19px', }} /> :
                            <Key style={{fontSize: '19px', }} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
          </div>

          <div className="space-y-2 md:space-y-5 py-2">
            <div className="flex items-center justify-between">
              <h2 className='text-base font-semibold'>Quick Actions</h2>
            </div>

            <div className="w-full flex items-center gap-8 flex-wrap">
              {quickActions.map(item =>
                <QuickAction key={item.id} item={item} />
              )}
            </div>
          </div>

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