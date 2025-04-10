"use client";

import { usePathname, useRouter } from 'next/navigation';
import { currentUserInfo, INITIAL_GENERAL_DATA } from '../data/base';
import { GeneralDataProps, TransactionHistoryProps, UserAddressProps, UserDataProps, UserKYCProps, UserProfileProps, UserProps, WalletProps } from '../types/base';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { initUserSession } from '@/utils/initUserSession';

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
  userProfile: UserProfileProps | null;
  userAddress: UserAddressProps | null;
  userKYC: UserKYCProps | null;
  wallet: WalletProps | null;
  transactionHistory: TransactionHistoryProps[] | null;
  contextLoading: boolean;
  setContextLoading: (data: boolean) => void;
  setAccessToken: (token: string) => void;
  setWallet: (data: WalletProps | null) => void;
  setTransactionHistory: (data: TransactionHistoryProps[] | null) => void;
  setUser: (data: UserProps | null) => void;
  setUserProfile: (data: UserProfileProps | null) => void;
  setUserAddress: (data: UserAddressProps | null) => void;
  setUserKYC: (data: UserKYCProps | null) => void;
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
  const [userProfile, setUserProfile] = useState<UserProfileProps | null>(null);
  const [userAddress, setUserAddress] = useState<UserAddressProps | null>(null);
  const [userKYC, setUserKYC] = useState<UserKYCProps | null>(null);
  const [contextLoading, setContextLoading] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  
  const router = useRouter();
  const pathName = usePathname();

  // useEffect(() => {
  //   const init = async () => {
  //     const token = sessionStorage.getItem("accessToken");
      
  //     if (!token) {
  //       router.push("/login");
  //       return;
  //     }
      
  //     // Fetch dashboard data
  //     try {
  //       setContextLoading(true);
  //       const dashboardRes = await getUserDashboard(accessToken);
  //       const profilRes = await getUserProfile(accessToken);
  //       const { user, wallet, transactionHistory } = dashboardRes.data;
  //       const { profile_data, addres, user_kyc_data } = profilRes.data;

  //       if (!dashboardRes.success || !profilRes.success) {
  //         showToast("No data was gotten", "error");
  //       } else {
  //         setWallet(wallet);
  //         setTransactionHistory(transactionHistory);
  //         setUser(user);
  //         setUserProfile(profile_data);
  //         setUserAddress(addres);
  //         setUserKYC(user_kyc_data);
  //       }
  //     } catch (error) {
  //       router.push("/login");
  //     } finally {
  //       setContextLoading(false);
  //     }
  //   };
    
  //   const storedData = localStorage.getItem('currentData');
  //   if (storedData) {
  //     setCurrentData(JSON.parse(storedData));
  //   }

  //   const currentUserData = localStorage.getItem('userData');
  //   if (currentUserData) {
  //     setCurrentUserData(JSON.parse(currentUserData));
  //   }

  //   const loggedInUserData = localStorage.getItem('loggedInUserInfo');
  //   if (loggedInUserData) {
  //     setLoggedInUser(JSON.parse(loggedInUserData));
  //   }
    
  //   if (pathName !== '/login' && pathName !== '/register' && pathName !== '/change-password' && pathName !== '/forgot-password') {
  //     init();
  //   }
  // }, [pathName, router]);
  

// inside useEffect
  
  useEffect(() => {
    const runInit = async () => {
      const token = sessionStorage.getItem("accessToken");

      if (!token) {
        router.push("/login");
        return;
      }

      setAccessToken(token);
      setContextLoading(true);

      const data = await initUserSession(token);

      if (data) {
        setUser(data.user);
        setWallet(data.wallet);
        setTransactionHistory(data.transactionHistory);
        setUserProfile(data.profile_data);
        setUserAddress(data.addres);
        setUserKYC(data.user_kyc_data);
      } else {
        router.push("/login");
      }

      setContextLoading(false);
    };

    const safePaths = ["/login", "/register", "/change-password", "/forgot-password"];
    if (!safePaths.includes(pathName)) {
      runInit();
    }

    // Load stored tab and user data
    const storedData = localStorage.getItem("currentData");
    if (storedData) {
      setCurrentData(JSON.parse(storedData));
    }
    const userData = localStorage.getItem("userData");
    if (userData) {
      setCurrentUserData(JSON.parse(userData));
    }
    const loggedIn = localStorage.getItem("loggedInUserInfo");
    if (loggedIn) {
      setLoggedInUser(JSON.parse(loggedIn));
    }
  }, [pathName]);

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
        setAccessToken,
        userProfile,
        userAddress,
        userKYC,
        user,
        wallet,
        transactionHistory,
        contextLoading,
        setContextLoading,
        setWallet,
        setTransactionHistory,
        setUser,
        setUserProfile,
        setUserAddress,
        setUserKYC,
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
