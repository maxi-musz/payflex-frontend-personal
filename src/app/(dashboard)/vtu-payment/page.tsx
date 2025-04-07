'use client';

import BuyAirtime from '@/components/vtu-payment/buy-airtime/BuyAirtime'
import BuyData from '@/components/vtu-payment/buy-data/BuyData';
import { useGeneralData } from '@/context/GeneralDataContext';
import React from 'react'

const VTUPayment = () => {
    const {currentTab} = useGeneralData();

  return (
    <>
    {currentTab === '/buy-airtime' && <BuyAirtime/>}
    {currentTab === '/buy-data' && <BuyData/>}
    </>
  )
}

export default VTUPayment;