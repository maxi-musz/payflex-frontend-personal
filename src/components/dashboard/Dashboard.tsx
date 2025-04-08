'use client';

import ButtonNeutral from '../button/ButtonNeutral';
import BankTransactionTable from './dataDisplay/BankTransactionTable';
import TransactionOptions from './dataDisplay/TransactionOptions';
import DashboardHeader from '../DashboardHeader';
import { useGeneralData } from '@/context/GeneralDataContext';

const Dashboard = () => {
  const {transactionHistory, contextLoading} = useGeneralData();

  return (
    <div className='w-full pt-2 pb-4 space-y-2 md:space-y-4'>
      <DashboardHeader/>

      <TransactionOptions />

      <div className="flex items-center justify-between">
        <h2 className='text-3xl mt-10 font-semibold'>Recent transactions</h2>
        <ButtonNeutral btnText1='View all' classes='px-3 py-2 rounded-radius-8 border text-sm' />
      </div>

      {contextLoading ?
        <p className='py-4 text-center text-xl'>Loading...</p> :
        <BankTransactionTable transactionHistory={transactionHistory} />}
    </div>
  )
}

export default Dashboard;