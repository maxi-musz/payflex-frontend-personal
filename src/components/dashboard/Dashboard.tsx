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
import { quickActions, walletBalanceInfo } from '@/data/base';
import QuickAction from './dataDisplay/QuickAction';

const Dashboard = () => {
  const {currentTab} = useGeneralData();

  return (
    <div className='w-full pt-2 pb-4 space-y-2 md:space-y-5'>
        {/* <div className='w-full rounded-radius-12 py- pl-1 pr-3 bg-white border border-customGray'>
            <BankAccountsPieChart />
        </div> */}

        <div className="flex items-center gap-6">
          {walletBalanceInfo.map(item =>
            <WalletBallanceCard key={item.id} item={item} />
          )}
        </div>

        <div className="space-y-2 md:space-y-5 py-2">
          <div className="flex items-center justify-between">
            <h2 className='text-base font-semibold'>Quick Actions</h2>
          </div>

          <div className="flex items-center gap-6">
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

          <BankTransactionTable />
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