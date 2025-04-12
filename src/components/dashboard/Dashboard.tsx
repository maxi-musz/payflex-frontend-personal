'use client';

import ButtonNeutral from '../button/ButtonNeutral';
import BankTransactionTable from './dataDisplay/BankTransactionTable';
import TransactionOptions from './dataDisplay/TransactionOptions';
import { useGeneralData } from '@/context/GeneralDataContext';
import LoadingSpinner from '../LoadingSpinner';
import { useEffect } from 'react';

const Dashboard = () => {
  const { transactionHistory, contextLoading, updateGeneralData } = useGeneralData();

  useEffect(() => {
    updateGeneralData('/', '');
  });

  return (
    <div className='w-full pb-4 space-y-2 md:space-y-4'>
      <TransactionOptions />

      <div className="flex items-center justify-between">
        <h2 className='text-3xl mt-10 font-semibold'>Recent transactions</h2>
        <ButtonNeutral btnText1='View all' classes='px-3 py-2 rounded-radius-8 border text-sm' />
      </div>

      {contextLoading ? (
        <div className="w-full h-[12rem] flex items-center justify-center">
          <LoadingSpinner dynamicSize='size-12' />
        </div>
      ) : (
        <BankTransactionTable transactionHistory={transactionHistory} />
      )}
    </div>
  );
};

export default Dashboard;
