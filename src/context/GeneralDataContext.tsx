"use client";

import { INITIAL_GENERAL_DATA } from '@/utils/data';
import { GeneralDataProps } from '@/utils/types';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface GeneralDataContextType {
  currentData: GeneralDataProps;
  setCurrentData: (data: GeneralDataProps) => void;
  currentTab: string;
  updateGeneralData: (url: string) => void;
}

const GeneralDataContext = createContext<GeneralDataContextType | undefined>(undefined);

export const GeneralDataProvider = ({ children }: { children: ReactNode }) => {
  const [currentData, setCurrentData] = useState<GeneralDataProps>(INITIAL_GENERAL_DATA);
  
  useEffect(() => {
    const storedData = localStorage.getItem('currentData');
    if (storedData) {
      setCurrentData(JSON.parse(storedData));
    }
  }, []);
  
  const updateGeneralData = (url: string) => {
    // setCurrentData({currentTab: url});
    localStorage.setItem('currentData', JSON.stringify({currentTab: url}));
  };

  return (
    <GeneralDataContext.Provider
      value={{
        currentData,
        setCurrentData,
        currentTab: currentData.currentTab,
        updateGeneralData,
      }}
    >
      {children}
    </GeneralDataContext.Provider>
  );
};

export const useGeneralData = () => {
  const context = useContext(GeneralDataContext);
  if (!context) {
    throw new Error('useGeneralData must be used within a GeneralDataProvider');
  }
  return context;
};
