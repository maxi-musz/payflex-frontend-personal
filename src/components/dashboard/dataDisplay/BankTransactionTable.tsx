'use client';

import FullPagination from '@/components/pagination/FullPagination';
import { cardRequests, recentCardRequestTableHead } from '../../../data/base';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const BankTransactionTable = () => {
  // ============== pagination =================
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [transactionPerPage, setTransactionPerPage] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => { 
      if (window.innerWidth <= 640) {
        setTransactionPerPage(2);
      } else {
        if (window.innerHeight <= 731) {
          setTransactionPerPage(6);
        } else if (window.innerHeight <= 810) {
          setTransactionPerPage(7);
        } else if (window.innerHeight <= 1180) {
          setTransactionPerPage(10)
        // } else if (window.innerHeight <= 1085) {
        //   setTransactionPerPage(8)
        // } else if (window.innerHeight <= 1180) {
        //   setTransactionPerPage(10)
        } else {
          setTransactionPerPage(15);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [transactionPerPage]);


  const indexOfLastProduct = currentPage * transactionPerPage;
  const indexOfFirstProduct = indexOfLastProduct - transactionPerPage;
  const currentRequestCards = cardRequests.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(cardRequests.length / transactionPerPage);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTransactionPerPage(Number(event.target.value));
    setCurrentPage(1);
  };
  // ============== pagination =================

  return (
    <div className={`transition-all duration-300 ease-in-out`}>
      <div className="flex flex-col items-center justify-between gap-1">
        {cardRequests && cardRequests.length > 0 ?
        <>
        <div className="w-full overflow-x-scroll custom-scrollbar">
          <table className="min-w-full custom-scrollbar">
            <thead className="bg-transparent border-b border-customGray">
              <tr className="bg-neutral-100">
                {recentCardRequestTableHead.map(item => (
                  <th key={item.id} className={`py-[10px] text-[13px] whitespace-nowrap px-2 ${item.title === 'Transaction' ? 'text-start' : 'text-center'} text-textGray capitalize tracking-wider`}>{item.title}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {currentRequestCards.map(item => (
                <tr
                  key={item.id}
                  className={`my-2 ${item.status === 'Success' ? 'bg-green-50' : item.status === 'Declined' ? 'bg-orange-50' : 'bg-gray-50'}`}
                >
                  <td className={`relative 'py-[11px] text-[12px] px-2 text-center whitespace-nowrap w-2`}>
                    <span className='flex items-center gap-2'>
                      <div className="relative size-7 rounded-full border">
                        <Image
                            src={`/images/${item.avatar}`}
                            alt="cardinfra logo"
                            fill
                            className="object-cover rounded-full"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      {item.transaction}
                    </span>
                  </td>
                  <td className={`relative ${+item.amount < 1000  ? 'text-orange-700' : 'text-green-700'} py-[11px] text-[12px] px-2 text-center whitespace-nowrap w-2`}>
                  {+item.amount < 1000  ? '-' : '+'} ${item.amount}
                  </td>
                  <td className={`relative py-[11px] text-[12px] px-2 text-center whitespace-nowrap w-2`}>
                    <span className={`w-fit flex items-center gap-1 px-1 mx-auto ${item.status === 'Success' ? 'text-green-700 border-green-300 bg-green-100' : item.status === 'Declined' ? 'text-orange-700 border-orange-300 bg-orange-100' : 'text-gray-700 border-gray-300 bg-gray-100'} border rounded-full`}>
                      <div className={`size-1 rounded-full ${item.status === 'Success' ? 'bg-green-700' : item.status === 'Declined' ? 'bg-orange-700' : 'bg-gray-700'} `}></div>
                      {item.status}
                    </span>
                  </td>
                  <td className={`relative py-[11px] text-[12px] px-2 text-center whitespace-nowrap w-2`}>{item.date}</td>
                  <td className={`relative py-[11px] text-[12px] px-2 text-center whitespace-nowrap w-2`}>
                    <span className={`w-fit flex items-center gap-1 px-1 mx-auto ${item.category === 'Deposit' ? 'text-green-700 border-green-300 bg-green-100' : item.category === 'Food' ? 'text-orange-700 border-orange-300 bg-orange-100' : item.category === 'Income' ? 'text-lime-700 border-lime-300 bg-lime-100' : item.category === 'Subscriptions' ? 'text-blue-700 border-blue-300 bg-blue-100' : item.category === 'Groceries' ? 'text-purple-700 border-purple-300 bg-purple-100' : 'text-gray-700 border-gray-300 bg-gray-100'} border rounded-full`}>
                      <div className={`size-1 rounded-full ${item.category === 'Deposit' ? 'bg-green-700' : item.category === 'Food' ? 'bg-orange-700' : item.category === 'Income' ? 'bg-lime-700' : item.category === 'Subscriptions' ? 'bg-blue-700' : item.category === 'Groceries' ? 'bg-purple-700' : 'bg-gray-700'} `}></div>
                      {item.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <FullPagination
          transactionPerPage={transactionPerPage}
          handleRowsPerPageChange={handleRowsPerPageChange}
          totalPages={totalPages}
          totalTransactions={cardRequests.length}
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