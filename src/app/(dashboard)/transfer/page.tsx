'use client';

import NGNToForeign from '@/components/transfer/NGNToForeign';
import NGNToNGN from '@/components/transfer/NGNToNGN';
import { useGeneralData } from '@/context/GeneralDataContext';
import React from 'react'

const Transfer = () => {
    const {currentTab} = useGeneralData();

  return (
    <>
    {currentTab === '/ngn-ngn-transfer' && <NGNToNGN/>}
    {currentTab === '/ngn-foreign-transfer' && <NGNToForeign/>}
    </>
  )
}

export default Transfer;