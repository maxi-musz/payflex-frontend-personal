"use client";

import { usePathname, useRouter } from 'next/navigation';
import { currentUserInfo, INITIAL_GENERAL_DATA } from '../data/base';
import { GeneralDataProps, UserDataProps } from '../types/base';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { parseCookies } from 'nookies';
import { getUserDashboard } from '@/features/dashboard/actions';
import { showToast } from '@/components/HotToast';
// import {jwtDecode} from 'jwt-decode';

interface GeneralDataContextType {
  currentData: GeneralDataProps;
  setCurrentData: (data: GeneralDataProps) => void;
  currentUserData: UserDataProps;
  setCurrentUserData: (data: UserDataProps) => void;
  loggedInUser: {email: string, password: string, first_name: string, last_name: string};
  setLoggedInUser: (data: {email: string, password: string, first_name: string, last_name: string}) => void;
  currentTab: string;
  updateGeneralData: (url: string) => void;
  dropLoggedInUserInfo: () => void;
  user: {id: string, name: string, email: string, profileImage: string | null} | null;
  accounts: {id: string, account_number: string, account_type: string, balance: string, bank_name: string, bank_code: string}[] | null;
  transactionHistory: {id: string, amount: string, type: string, description: string, status: string, date: string, sender: string, icon: string}[] | null;
}

const GeneralDataContext = createContext<GeneralDataContextType | undefined>(undefined);

export const GeneralDataProvider = ({ children }: { children: ReactNode }) => {
  const [currentData, setCurrentData] = useState<GeneralDataProps>(INITIAL_GENERAL_DATA);
  const [currentUserData, setCurrentUserData] = useState<UserDataProps>(currentUserInfo);
  const [loggedInUser, setLoggedInUser] = useState<{
    email: string,
    password: string,
    first_name: string,
    last_name: string
  }>({
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  });
  
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState(null);
  
  const router = useRouter();
  const pathName = usePathname();  
  const cookies = parseCookies();
  
  // useEffect(() => {
  // }, []);

  useEffect(() => {
    const fetchUser = async () => {
        const token = cookies.accessToken;
        
        try {
            const res = await getUserDashboard(token);
            const {user, accounts, transactionHistory} = res.data;

            if (!res.success) {
                showToast('No data was gotten', 'error');
            } else {
                setUser(user);
                setAccounts(accounts);
                setTransactionHistory(transactionHistory);
            }
        } catch (error) {
          // setIsLoading(false);
          setTimeout(() => {
              showToast(`Error: ${(error as Error).message || 'An unexpected error occurred'}`, 'error');
          }, 500);
        }
    };

    fetchUser();

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
    
  }, [pathName, router, cookies.accessToken]);
  
  const updateGeneralData = (url: string) => {
    // setCurrentData({currentTab: url});
    localStorage.setItem('currentData', JSON.stringify({currentTab: url}));
  };
  
  const dropLoggedInUserInfo = () => {
    setLoggedInUser({
      email: '',
      password: '',
      first_name: '',
      last_name: ''
    });

    localStorage.removeItem('loggedInUserInfo');
  };
  
  // console.log('User state', user);
  // console.log('User Account state', accounts);
  // console.log('User Transaction History state', transactionHistory);

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
        // currentUser,
        user,
        accounts,
        transactionHistory,
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
