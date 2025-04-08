'use client';

import ButtonNeutral from '../button/ButtonNeutral';
import BankTransactionTable from './dataDisplay/BankTransactionTable';
import TransactionOptions from './dataDisplay/TransactionOptions';
import { useEffect, useState } from 'react';
import { getUserDashboard } from '@/features/dashboard/actions';
import { showToast } from '../HotToast';
import { useRouter } from 'next/navigation';
import DashboardHeader from '../DashboardHeader';

const Dashboard = () => {
  const [transactionHistory, setTransactionHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const token = sessionStorage.getItem("accessToken");
  
      if (!token) {
        router.push("/login");
        return;
      }
  
      // Fetch dashboard data
      try {
        setLoading(true);
        const res = await getUserDashboard(token);
        // console.log(res)
        const { transactionHistory } = res.data;
  
        if (!res.success) {
          showToast("No data was gotten", "error");
        } else {
          setTransactionHistory(transactionHistory);
        }
      } catch (error) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
  
    init();
  }, [router]);

  return (
    <div className='w-full pt-2 pb-4 space-y-2 md:space-y-4'>
      <DashboardHeader/>

      <TransactionOptions />

      <div className="flex items-center justify-between">
        <h2 className='text-3xl mt-10 font-semibold'>Recent transactions</h2>
        <ButtonNeutral btnText1='View all' classes='px-3 py-2 rounded-radius-8 border text-sm' />
      </div>

      <BankTransactionTable loading={loading} transactionHistory={transactionHistory} />
    </div>
  )
}

export default Dashboard;