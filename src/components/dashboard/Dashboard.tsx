'use client';

import BankAccountsPieChart from './dataDisplay/BankAccountsPieChart';
import ButtonNeutral from '../button/ButtonNeutral';
import BankTransactionTable from './dataDisplay/BankTransactionTable';
import TransactionOptions from './dataDisplay/TransactionOptions';

const Dashboard = () => {
  return (
    <div className='w-full pt-2 pb-4 space-y-2 md:space-y-5'>
        {/* <div>
            <h1 className='text-2xl font-semibold'>Welcome, <span className='text-blue-700'>Adrian</span></h1>
            <p>Access & manage your account and transactions efficiently.</p>
        </div> */}

        <div className='w-full rounded-radius-12 py- pl-1 pr-3 bg-white border border-customGray'>
            <BankAccountsPieChart />
        </div>

        <TransactionOptions />

        <div className="flex items-center justify-between">
            <h2 className='text-base font-semibold'>Recent transactions</h2>
            <ButtonNeutral btnText1='View all' classes='px-3 py-2 rounded-radius-8 border text-sm' />
        </div>

        <BankTransactionTable />
    </div>
  )
}

export default Dashboard;