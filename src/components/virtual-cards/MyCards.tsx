import { virtualCards } from '@/data/base'
import React from 'react'

const MyCards = () => {
  return (
    <div className='py-6 px-2'>
      <div className='pb-5'>
        <h2 className='text-xl font-semibold'>My Cards</h2>
        <p>Manage your virtual cards for international transactions</p>
      </div>
      
      <div className="w-full flex items-center gap-2">
        {virtualCards.map(card => 
          <div
            key={card.id}
            className={`w-1/3 space-y-5 cursor-pointer p-4 border rounded-radius-12 bg-gradient-to-r ${card.id === 1 ? 'from-blue-600 to-blue-300' : card.id === 2 ? 'from-green-600 to-green-300' : 'from-purple-600 to-purple-300'} text-white`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className='text-xl font-semibold'>Virtual Card</p>
              <div className="flex items-center gap-1">
                <div className="size-5 bg-amber-500 rounded-full"></div>
                <div className="size-5 bg-amber-700 rounded-full"></div>
              </div>
            </div>

            <p className='text-base'>{card.cardNumber}</p>

            <div className='flex items-end justify-between gap-2'>
              <p className='flex flex-col items-start gap-1'>
                <span className='uppercase font-light text-sm'>CARD HOLDER</span>
                <span className='uppercase text-sm font-semibold'>{card.cardHolder}</span>
              </p>
              <p className='flex flex-col items-start gap-1'>
                <span className='uppercase font-light text-sm'>EXPIRES</span>
                <span className='uppercase text-sm font-semibold'>{card.expiryDate}</span>
              </p>
              <p className='py-[2px] px-2 rounded-full border text-xs font-semibold'>{card.active ? 'ACTIVE' : 'INACTIVE'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyCards