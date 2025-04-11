'use client';

import { getAirtimeProviders, buyAirtime } from '@/features/vtu-vas/actions';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { showToast } from '@/components/HotToast';
import Image from 'next/image';
import { Toaster } from 'react-hot-toast';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useGeneralData } from '@/context/GeneralDataContext';
import { AirtimeProviderProps, AirtimeTransactionDataProps } from '@/types/base';
import { parseAmountIntoNumberFormat, parseFormattedAmountToNumber } from '@/utils/formatters';
import FormWrapper from './FormWrapper';
import TransactionSummary from './TransactionSummary';

const BuyAirtime = () => {
  const [providers, setProviders] = useState<AirtimeProviderProps[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<AirtimeProviderProps | null>(null);
  const [selectedProviderLogo, setSelectedProviderLogo] = useState<string | null>(null);
  const [transactionData, setTransactionData] = useState<AirtimeTransactionDataProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {updateGeneralData} = useGeneralData();

  const router = useRouter();

  const providerLogos: Record<string, string> = {
    MTN: "/images/mtn-icon.jpg",
    AIRTEL: "/images/airtel-icon.jpg",
    GLO: "/images/glo-icon.jpg",
    "9MOBILE": "/images/9mobile-icon.jpg",
  };

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) return router.push('/login');

    const fetchProviders = async () => {
      try {
        const res = await getAirtimeProviders(token);
        if (!res.success) {
          showToast('No data was gotten', 'error');
        } else {
          setProviders(res.data);
        }
      } catch (error) {
        showToast(`Error: ${(error as Error).message}`, 'error');
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [router]);

  const onCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = parseAmountIntoNumberFormat(e.target.value);
    setAmount(`₦${formattedValue}`);
  };
  // console.log(amount);
  
  const handlePlanSelection = async (provider: AirtimeProviderProps) => {
    setSelectedProviderLogo(providerLogos[provider.provider]);
    setSelectedProvider(provider);
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      setLoading(true)
      const token = sessionStorage.getItem("accessToken");
      // setAccessToken(token!);

      const parsedAmount = parseFormattedAmountToNumber(amount);
      // console.log(parsedAmount);
      if (selectedProvider !== null) {
        const {success, message, data} = await buyAirtime(token!, {
          amount: parsedAmount.toString(),
          phoneNumber,
          provider: selectedProvider.provider,
        });
        
        if (success) {
          setTransactionData({
            provider: data.provider,
            phoneNumber: data.mobile,
            amount: data.amount,
            date: data.created_at || new Date().toLocaleString(),
            reference: data.reference,
            status: data.status,
          });
          
          showToast(message);
          
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1500);
        } else {
          showToast(`${message}` || 'Something went wrong', 'error');
        }
      }
    } catch (error) {
      showToast(`Error: ${(error as Error).message}`, 'error');
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const handleGoBackHome = () => {
    updateGeneralData('/', '');
    router.push('/');
  };

  if (loading) {
    return (<div className="w-full h-[12rem] flex items-center justify-center">
      <LoadingSpinner dynamicSize='size-12' />
    </div>)
  }

  return (
    <section className="space-y-5">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl font-semibold mt-5">Buy Airtime</h1>

      {!selectedProvider ?
        <>
          <h2 className="text-base font-medium mb-4">Select Provider</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {providers.map((provider: AirtimeProviderProps) => (
              <div
                key={provider.provider}
                onClick={() => handlePlanSelection(provider)}
                className="bg-white border rounded-xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md cursor-pointer transition"
              >
                <span className="relative size-16 mb-2 rounded-lg">
                  <Image
                    src={providerLogos[provider.provider.toUpperCase()] || "/images/default.png"}
                    alt={provider.provider}
                    fill
                    className="object-contain rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </span>
                <span className="text-sm font-medium text-gray-700">{provider.provider}</span>
              </div>
            ))}
          </div>
        </> 
      : transactionData ?
        <TransactionSummary handleGoBackHome={handleGoBackHome} transactionData={transactionData} />
      : <FormWrapper
          handleSubmit={handleSubmit}
          onCodeChange={onCodeChange}
          setPhoneNumber={setPhoneNumber}
          phoneNumber={phoneNumber}
          amount={amount}
          isSubmitting={isSubmitting}
          setSelectedProvider={setSelectedProvider}
          selectedProviderLogo={selectedProviderLogo}
        />}
    </section>
  );
};

export default BuyAirtime;
