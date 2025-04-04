'use client';

import ButtonNeutral from '../button/ButtonNeutral';
import BankTransactionTable from './dataDisplay/BankTransactionTable';
import TransactionOptions from './dataDisplay/TransactionOptions';
import { useGeneralData } from '@/context/GeneralDataContext';
import NGNToNGN from '../transfer/NGNToNGN';
import NGNToForeign from '../transfer/NGNToForeign';
import BuyAirtime from '../vtu-payment/BuyAirtime';
import BuyData from '../vtu-payment/BuyData';
import BuyBulkData from '../vtu-payment/BuyBulkData';
import FetchAirtimePin from '../vtu-payment/FetchAirtimePin';
import SellAirtime from '../vtu-payment/SellAirtime';
import FundWallet from '../vtu-payment/FundWallet';
import TransactionHistory from '../vtu-payment/TransactionHistory';
import DataPricing from '../data-menu/DataPricing';
import NineMobileDataPlans from '../data-menu/NineMobileDataPlans';
import GloDataPlans from '../data-menu/GloDataPlans';
import AirtelDataPlans from '../data-menu/AirtelDataPlans';
import DSTV from '../bills-payment/DSTV';
import GoTV from '../bills-payment/GoTV';
import StarTimes from '../bills-payment/StarTimes';
import WAECPins from '../bills-payment/WAECPins';
import Electricity from '../bills-payment/Electricity';
import SportsAndBetting from '../bills-payment/SportsAndBetting';
import MTNDataPlans from '../data-menu/MTNDataPlans';
import ConnectBank from '../connect-bank/ConnectBank';
import ReferAndEarn from '../refer-and-earn/ReferAndEarn';
import VirtualCards from '../virtual-cards/VirtualCards';
import RedeemGiftcard from '../redeem-giftcard/RedeemGiftcard';
import P2PLending from '../p2p-lending/P2PLending';
import WalletBallanceCard from './dataDisplay/WalletBallanceCard';
import { dashboardTabs, quickActions, walletBalanceInfo } from '@/data/base';
import QuickAction from './dataDisplay/QuickAction';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import VTU from './dataDisplay/VTU';
import Bills from './dataDisplay/Bills';
import Image from 'next/image';
import CountUp from 'react-countup';
import { Key, RemoveRedEyeOutlined } from '@mui/icons-material';
import { parseFormattedAmountToNumber } from '@/utils/formatters';
import { getUserDashboard } from '@/features/dashboard/actions';
import { parseCookies } from 'nookies';
import { showToast } from '../HotToast';

interface AccountsProps {
  id: string,
  account_number: string,
  account_type: string,
  balance: string,
  bank_name: string,
  bank_code: string
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<string>('General');
  const [isBalanceOpen, setIsBalanceOpen] = useState(false);
  const [accounts, setAccounts] = useState<AccountsProps[] | null>(null);
  const [transactionHistory, setTransactionHistory] = useState(null);
  
  const {currentTab} = useGeneralData();
  const cookies = parseCookies();
    
  useEffect(() => {
    const token = cookies.accessToken;
    const fetchUser = async () => {
      if (token) {
        try {
            const res = await getUserDashboard(token);
            const {accounts, transactionHistory} = res.data;

            if (!res.success) {
                showToast('No data was gotten', 'error');
            } else {
                setAccounts(accounts);
                setTransactionHistory(transactionHistory);
            }
        } catch (error) {
          // setIsLoading(false);
          setTimeout(() => {
              showToast(`Error: ${(error as Error).message || 'An unexpected error occurred'}`, 'error');
          }, 500);
        }
      };
    }
  
    fetchUser();
  }, [cookies.accessToken]);

  const handleBalanceToggle = () => setIsBalanceOpen(prev => !prev);
    
  const handleTabToggle = (tab: string) => setActiveTab(tab);


  return (
    <div className='w-full pt-2 pb-4 space-y-2 md:space-y-5'>
        <Toaster position="top-center" reverseOrder={false} />
        {/* <div className='w-full rounded-radius-12 py- pl-1 pr-3 bg-white border border-customGray'>
            <BankAccountsPieChart />
        </div> */}

        <div className="flex items-center gap-2 md:gap-4 xl:gap-6 flex-wrap">
        {walletBalanceInfo.slice(0,1).map(item =>
          <div key={item.id} className='w-72 flex-1 h-40 py-6 pl-5 pr-3 bg-blue-200 rounded-3xl flex flex-col justify-between'>
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
              <p className="text-neutral-700 text-base font-semibold">Wallet Balance</p>
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
          </div>)}

          {walletBalanceInfo.slice(1,3).map(item =>
            <WalletBallanceCard key={item.id} item={item} />
          )}
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
              <h2 className='text-base font-semibold'>Recent transactions</h2>
              <ButtonNeutral btnText1='View all' classes='px-3 py-2 rounded-radius-8 border text-sm' />
          </div>

          <div className='space-y-2'>
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
          </div>
        </>
        }
        
        {currentTab === '/ngn-ngn-transfer' && <NGNToNGN />}
        {currentTab === '/ngn-foreign-transfer' && <NGNToForeign />}
        {currentTab === '/virtual-cards' && <VirtualCards />}
        {currentTab === '/p2p-lending' && <P2PLending />}
        {currentTab === '/redeem-giftcard' && <RedeemGiftcard />}
        {currentTab === '/buy-airtime' && <BuyAirtime />}
        {currentTab === '/buy-data' && <BuyData />}
        {currentTab === '/buy-bulk-data' && <BuyBulkData />}
        {currentTab === '/fetch-airtime-pin' && <FetchAirtimePin />}
        {currentTab === '/sell-airtime' && <SellAirtime />}
        {currentTab === '/fund-wallet' && <FundWallet />}
        {currentTab === '/transaction-history' && <TransactionHistory />}
        {currentTab === '/data-pricing' && <DataPricing />}
        {currentTab === '/mtn-data-plans' && <MTNDataPlans />}
        {currentTab === '/airtel-data-plans' && <AirtelDataPlans />}
        {currentTab === '/glo-data-plans' && <GloDataPlans />}
        {currentTab === '/9mobile-data-plans' && <NineMobileDataPlans />}
        {currentTab === '/dstv' && <DSTV />}
        {currentTab === '/gotv' && <GoTV />}
        {currentTab === '/startimes' && <StarTimes />}
        {currentTab === '/waec-pins' && <WAECPins />}
        {currentTab === '/electricity' && <Electricity />}
        {currentTab === '/sports-and-betting' && <SportsAndBetting />}
        {currentTab === '/connect-bank' && <ConnectBank />}
        {currentTab === '/refer-and-earn' && <ReferAndEarn />}
        {/* {currentTab === '/api-docs' && <ApiDocs />}
        {currentTab === '/contact-support' && <ContactSupport />}
        {currentTab === '/whatsapp' && <ContactSupport />} */}
    </div>
  )
}

export default Dashboard;