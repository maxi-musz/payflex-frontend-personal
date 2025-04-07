'use client';

import { quickActions, walletBalanceInfo } from '@/data/base'
import React, { useEffect, useState } from 'react'
import QuickAction from './dashboard/dataDisplay/QuickAction'
import { Key, RemoveRedEyeOutlined } from '@mui/icons-material'
import { parseFormattedAmountToNumber } from '@/utils/formatters'
import CountUp from 'react-countup'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useGeneralData } from '@/context/GeneralDataContext'
import { verifyPaystackFunding } from '@/features/banking/actions'
import { showToast } from './HotToast'
import { getUserDashboard } from '@/features/dashboard/actions'
import { Toaster } from 'react-hot-toast';

interface WalletProps {
  id: string,
  current_balance: number,
  all_time_fuunding: number,
  all_time_withdrawn: number,
  isActive: boolean,
  createdAt: string,
  updatedAt: string,
}

const DashboardHeader = () => {
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
    <div>
      <Toaster position="top-center" reverseOrder={false} />

        <div className="flex items-center gap-2 md:gap-4 xl:gap-6 flex-wrap">
          <div className='space-y-2'>
            {walletBalanceInfo.slice(0,1).map(item =>
              <div key={item.id} className='w-72 flex-1 sm:flex-none h-40 py-6 pl-5 pr-3 bg-blue-200 rounded-3xl flex flex-col justify-between'>
                <p className="text-neutral-800 text-lg font-semibold">Wallet Balance</p>
                {/* <div className="w-full flex items-center justify-end gap-1">
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
                </div> */}

                <div className="space-y-3">
                  <div className="w-full flex items-center justify-between">
                    <p className='text-textGrayDarker text-2xl md:text-3xl font-bold space-x-1'>
                      <span className={`${item.currency === '₦' ? 'text-green-600' : item.currency === '£' ? 'text-red-600' : 'text-blue-800'} font-extrabold`}>{item.currency}</span>
                      {(wallet && !isBalanceOpen) ? <CountUp start={0} end={wallet.current_balance || parseInt(item.balance)} duration={2} delay={0} decimal='true' /> : "******"}
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

      <div className="space-y-2 md:space-y-5 py-2 mt-6">
        <div className="flex items-center justify-between">
          <h2 className='text-base font-semibold'>Quick Actions</h2>
        </div>

        <div className="w-full flex items-center gap-8 flex-wrap">
          {quickActions.map(item =>
            <QuickAction key={item.id} item={item} />
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader