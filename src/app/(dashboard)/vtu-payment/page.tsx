'use client';

import BuyAirtime from '@/components/vtu-payment/buy-airtime/BuyAirtime'
import BuyData from '@/components/vtu-payment/buy-data/BuyData';
import { useGeneralData } from '@/context/GeneralDataContext';
import React from 'react'

const VTUPayment = () => {
    const {currentData} = useGeneralData();

  return (
    <>
    {currentData.currentSubtab === '/buy-airtime' && <BuyAirtime/>}
    {currentData.currentSubtab === '/buy-data' && <BuyData/>}
    </>
  )
}

export default VTUPayment;