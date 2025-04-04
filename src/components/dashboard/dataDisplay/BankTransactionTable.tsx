'use client';

import FullPagination from '@/components/pagination/FullPagination';
import { currentRecentTransactionsTableHead } from '../../../data/base';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { parseDateIntoMonthDayYear } from '@/utils/formatters';

interface TransactionHistoryProps {
  id: string,
  amount: string,
  type: string,
  description: string,
  status: string,
  date: string,
  sender: string,
  icon: string
}

const BankTransactionTable = ({transactionHistory}: {transactionHistory: TransactionHistoryProps[] | null}) => {
  // ============== pagination =================
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [transactionPerPage, setTransactionPerPage] = useState<number>(0);
    // const {transactionHistory} = useGeneralData();

  useEffect(() => {
    const handleResize = () => { 
      if (window.innerWidth <= 640) {
        setTransactionPerPage(2);
      } else {
        if (window.innerHeight <= 731) {
          setTransactionPerPage(3);
        } else if (window.innerHeight <= 810) {
          setTransactionPerPage(5);
        } else if (window.innerHeight <= 1180) {
          setTransactionPerPage(8)
        // } else if (window.innerHeight <= 1085) {
        //   setTransactionPerPage(8)
        // } else if (window.innerHeight <= 1180) {
        //   setTransactionPerPage(10)
        } else {
          setTransactionPerPage(13);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [transactionPerPage]);


  const indexOfLastProduct = currentPage * transactionPerPage;
  const indexOfFirstProduct = indexOfLastProduct - transactionPerPage;
  const currentRecentTransactions = transactionHistory?.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(transactionHistory ? transactionHistory.length : 0 / transactionPerPage);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setTransactionPerPage(Number(event.target.value));
  //   setCurrentPage(1);
  // };
  // ============== pagination =================

  return (
    <div className={`transition-all duration-300 ease-in-out`}>
      <div className="flex flex-col items-center justify-between gap-1">
        {transactionHistory && transactionHistory.length > 0 ?
        <>
        <div className="w-full overflow-x-scroll custom-scrollbar">
          <table className="min-w-full custom-scrollbar">
            <thead className="bg-transparent border-b border-customGray">
              <tr className="bg-neutral-100">
                {currentRecentTransactionsTableHead.map(item => (
                  <th key={item.id} className={`py-[10px] text-[13px] whitespace-nowrap px-2 ${item.title === 'Description' ? 'text-start pl-12' : 'text-center'} text-textGray capitalize tracking-wider`}>{item.title}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {currentRecentTransactions?.map(item => (
                <tr
                  key={item.id}
                  className={`my-2 ${item.status === 'success' ? 'bg-green-50' : item.status === 'cancelled' ? 'bg-orange-50' : item.status === 'failed' ? 'bg-yellow-50' : 'bg-gray-50'}`}
                >
                  <td className={`relative 'py-[11px] text-[12px] px-2 text-center whitespace-nowrap w-2`}>
                    <span className='flex items-center gap-2'>
                      <div className="relative size-7 rounded-full border">
                        <Image
                          src={item.icon === '' ? item.icon : '/images/default_avatar.png'}
                          // src={`${item.icon}` || '/images/default_avatar.png'}
                          alt="user avatar"
                          fill
                          className="object-cover rounded-full"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      {item.description}
                    </span>
                  </td>
                  <td className={`relative ${+item.amount < 1000  ? 'text-orange-700' : 'text-green-700'} py-[11px] text-[12px] px-2 text-center whitespace-nowrap w-2`}>
                    {+item.amount < 2500  ? '-' : '+'} ₦{item.amount}
                  </td>
                  <td className={`relative py-[11px] text-[12px] px-2 text-center whitespace-nowrap w-2 capitalize`}>
                    <span className={`w-fit flex items-center gap-1 px-1 mx-auto ${item.status === 'success' ? 'text-green-700 border-green-300 bg-green-100' : item.status === 'cancelled' ? 'text-yellow-700 border-yellow-300 bg-yellow-100' : item.status === 'failed' ? 'text-red-700 border-red-300 bg-red-100' : 'text-gray-700 border-gray-300 bg-gray-100'} border rounded-full`}>
                      <div className={`size-1 rounded-full ${item.status === 'success' ? 'bg-green-700' : item.status === 'cancelled' ? 'bg-yellow-700' : item.status === 'failed' ? 'bg-red-700' : 'bg-gray-700'} `}></div>
                      {item.status}
                    </span>
                  </td>
                  <td className={`relative py-[11px] text-[12px] px-2 text-center whitespace-nowrap w-2 capitalize`}>{item.type}</td>
                  <td className={`relative py-[11px] text-[12px] px-2 text-center whitespace-nowrap w-2`}>{parseDateIntoMonthDayYear(item.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <FullPagination
          // transactionPerPage={transactionPerPage}
          // handleRowsPerPageChange={handleRowsPerPageChange}
          // totalTransactions={transactionHistory.length}
          totalPages={totalPages}
          paginate={paginate}
          currentPage={currentPage}
         />
        </>
        : 
        <div className='text-center text-xl text-gray-600'>No Products found</div>}
      </div>
    </div>
  )
}

export default BankTransactionTable;