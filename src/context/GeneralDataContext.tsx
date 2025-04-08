"use client";

import { usePathname, useRouter } from 'next/navigation';
import { currentUserInfo, INITIAL_GENERAL_DATA } from '../data/base';
import { GeneralDataProps, TransactionHistoryProps, UserDataProps, UserProps, WalletProps } from '../types/base';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { showToast } from '@/components/HotToast';
import { getUserDashboard } from '@/features/dashboard/actions';

interface GeneralDataContextType {
  currentData: GeneralDataProps;
  setCurrentData: (data: GeneralDataProps) => void;
  currentUserData: UserDataProps;
  setCurrentUserData: (data: UserDataProps) => void;
  loggedInUser: {email: string, name: string};
  setLoggedInUser: (data: {email: string, name: string}) => void;
  currentTab: string;
  updateGeneralData: (tab: string, subTab: string) => void;
  dropLoggedInUserInfo: () => void;
  user: UserProps | null;
  wallet: WalletProps | null;
  transactionHistory: TransactionHistoryProps[] | null;
  contextLoading: boolean;
}

const GeneralDataContext = createContext<GeneralDataContextType | undefined>(undefined);

export const GeneralDataProvider = ({ children }: { children: ReactNode }) => {
  const [currentData, setCurrentData] = useState<GeneralDataProps>(INITIAL_GENERAL_DATA);
  const [currentUserData, setCurrentUserData] = useState<UserDataProps>(currentUserInfo);
  const [loggedInUser, setLoggedInUser] = useState<{
    email: string,
    name: string,
  }>({
    email: '',
    name: '',
  });
  const [wallet, setWallet] = useState<WalletProps | null>(null);
  const [transactionHistory, setTransactionHistory] = useState<TransactionHistoryProps[] | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const [contextLoading, setContextLoading] = useState(false);
  
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const init = async () => {
      const token = sessionStorage.getItem("accessToken");
      
      if (!token) {
        router.push("/login");
        return;
      }
      
      // Fetch dashboard data
      try {
        setContextLoading(true);
        const res = await getUserDashboard(token);
        const { user, wallet, transactionHistory } = res.data;

        if (!res.success) {
          showToast("No data was gotten", "error");
        } else {
          setWallet(wallet);
          setTransactionHistory(transactionHistory);
          setUser(user);
        }
      } catch (error) {
        router.push("/login");
      } finally {
        setContextLoading(false);
      }
    };
    
    const storedData = localStorage.getItem('currentData');
    if (storedData) {
      setCurrentData(JSON.parse(storedData));
    }

    const currentUserData = localStorage.getItem('userData');
    if (currentUserData) {
      setCurrentUserData(JSON.parse(currentUserData));
    }

    const loggedInUserData = localStorage.getItem('loggedInUserInfo');
    if (loggedInUserData) {
      setLoggedInUser(JSON.parse(loggedInUserData));
    }
    
    init();
  }, [pathName, router]);
  
  const updateGeneralData = (tab: string, subTab: string) => {
    setCurrentData({currentTab: tab, currentSubtab: subTab});
    localStorage.setItem('currentData', JSON.stringify({currentTab: tab, currentSubtab: subTab}));
  };
  
  const dropLoggedInUserInfo = () => {
    setLoggedInUser({
      email: '',
      name: '',
    });

    localStorage.removeItem('currentData');
    localStorage.removeItem('loggedInUserInfo');
  };

  return (
    <GeneralDataContext.Provider
      value={{
        currentData,
        setCurrentData,
        currentUserData,
        setCurrentUserData,
        loggedInUser,
        setLoggedInUser,
        currentTab: currentData.currentTab,
        updateGeneralData,
        dropLoggedInUserInfo,
        user,
        wallet,
        transactionHistory,
        contextLoading,
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
