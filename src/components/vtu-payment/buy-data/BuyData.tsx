'use client';

import { getInternetDataProviders, buyInternetData, selectInternetData } from '@/features/vtu-vas/actions';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { showToast } from '@/components/HotToast';
import Image from 'next/image';
import { Toaster } from 'react-hot-toast';
import { parsePriceIntoIntegerAndDecimal } from '@/utils/formatters';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useGeneralData } from '@/context/GeneralDataContext';
import { InternetDataPlanProps, InternetDataProviderProps, InternetDataTransactionDataProps } from '@/types/base';
import TransactionSummary from './TransactionSummary';
import FormWrapper from './FormWrapper';
import DataPlans from './DataPlans';

const BuyData = () => {
  const [providers, setProviders] = useState([]);
  const [plans, setPlans] = useState<InternetDataPlanProps[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState<InternetDataProviderProps | null>(null);
  const [selectedProviderLogo, setSelectedProviderLogo] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<InternetDataPlanProps | null>(null);
  const [selectedPlanAmount, setSelectedPlanAmount] = useState<{ integerPart: number; decimalPart: number } | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionData, setTransactionData] = useState<InternetDataTransactionDataProps | null>(null);
  const {updateGeneralData} = useGeneralData();

  const router = useRouter();

  const providerLogos: Record<string, string> = {
    "AIRTEL Direct": "/images/airtel-icon.jpg",
    "MTN Direct": "/images/mtn-icon.jpg",
    "GLO Direct": "/images/glo-icon.jpg",
    "9MOBILE Direct": "/images/9mobile-icon.jpg",
    "MTN SME": "/images/mtn-icon.jpg",
    "SMILE 4G": "/images/Smile-communications.png",
    "AIRTEL Corporate Gifting": "/images/airtel-icon.jpg",
    "Spectranet Internet Data": "/images/spectranet-2.png",
  };

  const providerParams: Record<string, string> = {
    "AIRTEL Direct": "AIRTEL",
    "MTN Direct": "MTN",
    "GLO Direct": "GLO",
    "9MOBILE Direct": "9MOBILE",
    "MTN SME": "MTN",
    "SMILE 4G": "SMILE4G",
    "AIRTEL Corporate Gifting": "AIRTEL",
    "Spectranet Internet Data": "SPECTRANET",
  };

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) return router.push('/login');

    const fetchProviders = async () => {
      try {
        const res = await getInternetDataProviders(token);
        if (!res.success) {
          showToast('No data was gotten', 'error');
        } else {
          setProviders(res.data.data);
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

  useEffect(() => {
    if (selectedPlan) {
      const updatedSelectedPlanAmount = parsePriceIntoIntegerAndDecimal(selectedPlan.amount);
      setSelectedPlanAmount(updatedSelectedPlanAmount);
    }
  }, [selectedPlan]);
  
  const handlePlanSelection = async (provider: InternetDataProviderProps) => {
    setSelectedProviderLogo(providerLogos[provider.name]);
    setIsSubmitting(true);
    setSelectedProvider(provider);

    try {
      setLoading(true)
      const token = sessionStorage.getItem("accessToken");
      if (!token) {
        return showToast("Unauthorized transaction!", 'error');
      };

      const res = await selectInternetData(token, providerParams[provider.name]);
      if (res.success) {
        showToast(res.message);
        setPlans(res.data);
        // setProviders([]);
      } else {
        showToast(`${res.message}` || 'Something went wrong', 'error');
      }
    } catch (error) {
      showToast(`Error: ${(error as Error).message}`, 'error');
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      setLoading(true)
      const token = sessionStorage.getItem("accessToken");
      if (!token) {
        showToast("Unauthorized transaction!", 'error');
        router.push('/login');
      };

      if (token && selectedProvider && selectedPlan) {
        const {success, message, data} = await buyInternetData(token, {
          provider: selectedProvider.ip_id,
          number: phoneNumber,
          plan_id: selectedPlan.id,
          amount: parseInt(selectedPlan.amount)
        });
    
        if (success) {
          setTransactionData({
            transactionProvider: selectedProvider.name,
            phoneNumber: data.number,
            amount: data.amount,
            date: data.created_at || new Date().toLocaleString(),
            reference: data.reference || '',
            status: success ? 'Successful' : 'Unsuccessful',
          });
          
          // setTimeout(() => {
            //   window.location.reload();
            // }, 1500);
            showToast(message);
          } else {
          if (message === 'Transaction failed: Undefined variable: res') {
            showToast('This data plan is not available at the moment!', 'error');
          } else {
            showToast(`${message}` || 'Something went wrong', 'error');
          }
        }
      }
    } catch (error) {
        console.log((error as Error).message);
      showToast(`Error: ${(error as Error).message}`, 'error');
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const handleGoBackHome = () => {
    updateGeneralData('/dashboard', '');
    router.push('/dashboard');
  };

  if (loading) {
    return (<div className="w-full h-[12rem] flex items-center justify-center">
      <LoadingSpinner dynamicSize='size-12' />
    </div>)
  }

  return (
    <section className="space-y-5">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl font-semibold mt-5">Buy Internet Data</h1>
      {!selectedProvider ? 
        <>
          <h2 className="text-base font-medium mb-4">Select Provider</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {providers.map((provider: InternetDataProviderProps) => (
              <div
                key={provider.id}
                onClick={() => handlePlanSelection(provider)}
                className="bg-white border rounded-xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md cursor-pointer transition"
              >
                <span className="relative size-16 mb-2 rounded-lg border">
                  <Image
                    src={providerLogos[provider.name] || "/images/imagePlaceholder.jpeg"}
                    alt={provider.name}
                    fill
                    className="object-contain rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </span>
                <span className="text-sm text-center font-medium text-gray-700">{provider.name}</span>
              </div>
            ))}
          </div>
        </>
        : (plans && plans.length > 0 && selectedPlan === null) ?
          <DataPlans
            setSelectedPlan={setSelectedPlan}
            plans={plans}
            selectedProviderLogo={selectedProviderLogo}
            setSelectedProvider={setSelectedProvider}
          />
        : transactionData ?
          <TransactionSummary handleGoBackHome={handleGoBackHome} transactionData={transactionData} />
        : selectedPlan !== null ?
          <FormWrapper
            handleSubmit={handleSubmit}
            setSelectedPlan={setSelectedPlan}
            selectedPlan={selectedPlan}
            loading={loading}
            setPhoneNumber={setPhoneNumber}
            phoneNumber={phoneNumber}
            selectedPlanAmount={selectedPlanAmount}
            isSubmitting={isSubmitting}
            selectedProviderLogo={selectedProviderLogo}
          /> : null}
    </section>
  );
};

export default BuyData;
