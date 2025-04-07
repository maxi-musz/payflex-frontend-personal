'use client';

import { getInternetDataProviders, buyInternetData, selectInternetData } from '@/features/vtu-vas/actions';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Loading from '@/app/loading';
import { showToast } from '@/components/HotToast';
import Image from 'next/image';
import { Toaster } from 'react-hot-toast';
import InputOne from '@/components/inputs/InputOne';
import ButtonNeutral from '@/components/button/ButtonNeutral';
import ButtonOne from '@/components/button/ButtonOne';

const BuyData = () => {
  const [providers, setProviders] = useState([]);
  const [plans, setPlans] = useState<{
    id: number,
    data_type_id: number,
    api_cent: string,
    amount: string,
    name: string,
  }[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState<any | null>(null);
  const [selectedProviderLogo, setSelectedProviderLogo] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionData, setTransactionData] = useState<any | null>(null);

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
        // console.log(res)
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

  
  const handlePlanSelection = async (provider: any) => {
    // console.log(providerParams[provider.name]);
    setSelectedProviderLogo(providerLogos[provider.name]);
    setIsSubmitting(true);

    try {
      setLoading(true)
      const token = sessionStorage.getItem("accessToken");
      if (!token) {
        return showToast("Unauthorized transaction!", 'error');
      };

      const res = await selectInternetData(token, providerParams[provider.name]);
      // console.log(res)

      setLoading(false)

      if (res.success) {
        showToast(res.message);
        // Set transaction data
        setPlans(res.data);
        // setProviders([]);
      } else {
        // console.log("Error", res.message)
        showToast(`${res.message}` || 'Something went wrong', 'error');
      }
    } catch (error) {
      showToast(`Error: ${(error as Error).message}`, 'error');
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };
  
  // console.log(plans);
  // console.log(selectedProviderLogo);
  
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

      if (token) {
        const res = await buyInternetData(token, {
          provider: selectedPlan.api_cent,
          number: phoneNumber,
          plan_id: selectedPlan.id,
          amount: parseInt(selectedPlan.amount)
        });
        // console.log(res)
    
        if (res.success) {
          showToast(res.message);
          // Set transaction data
          setTransactionData({
            provider: res.data.data.name,
            plan_id: res.data.data.ip_id,
            phoneNumber: res.data.mobile,
            amount: res.data.amount,
          });
          showToast(res.message);
        } else {
          // console.log("Error", res.message)
          showToast(`${res.message}` || 'Something went wrong', 'error');
        }
      }
    } catch (error) {
      // console.log("Error: ", (error as Error).message);
      showToast(`Error: ${(error as Error).message}`, 'error');
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const handleGoBackHome = () => {
    router.push('/');
  };

  // if (loading) return <Loading />;

  return (
    <section className="space-y-5">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl font-semibold mt-5">Buy Internet Data</h1>

      {(!selectedProvider && plans?.length === 0) ? (
        <>
          <h2 className="text-base font-medium mb-4">Select Provider</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {providers.map((provider: any) => (
              <div
                key={provider.id}
                onClick={() => handlePlanSelection(provider)}
                className="bg-white border rounded-xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md cursor-pointer transition"
              >
                <span className="relative size-16 mb-2 rounded-lg border">
                  <Image
                    src={providerLogos[provider.name] || "/images/default.png"}
                    alt={provider.name}
                    fill
                    className="object-contain rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </span>
                <span className="text-sm font-medium text-gray-700">{provider.name}</span>
              </div>
            ))}
          </div>
        </>
      ) : (plans && plans.length > 0 && selectedPlan === null) ? (
        <>
          <h2 className="text-base font-medium mb-4">Select Plan</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {plans.length > 0 && plans.map((plan: any) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className="bg-white border rounded-xl p-4 flex flex-col items-center justify-center gap-2 divide-y shadow-sm hover:shadow-md cursor-pointer transition"
              >
                {/* <span className="relative size-16 mb-2 rounded-lg border">
                  <Image
                    src={providerLogos[plan.name] || "/images/default.png"}
                    alt={plan.name}
                    fill
                    className="object-contain rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </span> */}
                <span className="w-full text-base text-center font-medium text-gray-700">{plan.name}</span>
                <span className="w-full text-sm text-center font-medium text-gray-700 pt-1">₦{plan.amount}</span>
              </div>
            ))}
          </div>
        </>
      ) : (transactionData) ? (
        // Transaction Summary
        <div className="flex flex-col items-center justify-center space-y-4 mt-6">
          <h2 className="text-xl font-semibold mb-4">Transaction Details</h2>
          <div className="bg-white p-6 border rounded-lg shadow-md space-y-4 w-96">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Provider:</span>
              <span>{transactionData?.provider}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium">Recipient:</span>
              <span>{transactionData?.phoneNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium">Amount:</span>
              <span>{transactionData?.amount || 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium">Date:</span>
              <span>{transactionData.date}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium">Reference:</span>
              <span>{transactionData.reference}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium">Status:</span>
              <span className={transactionData.status === 'success' ? 'text-green-500' : 'text-red-500'}>
                {transactionData.status}
              </span>
            </div>
          </div>
          <button
            onClick={handleGoBackHome}
            className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg"
          >
            Go Back Home
          </button>
        </div>
      ) : selectedPlan !== null ? (
        <div className="w-full pt-4">
          <div className='w-full sm:w-96 rounded-radius-12 p-6 mx-auto bg-white border border-customGray space-y-3'>
            <div className="flex items-center gap-2">
              <span className="relative size-16 mb-2 rounded-lg border">
                <Image
                  src={selectedProviderLogo !== null ? selectedProviderLogo : ''}
                  alt="logo"
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </span>
              <h2 className='text-xl font-semibold pb-4'>Internet Data Provider</h2>
            </div>
            <form onSubmit={handleSubmit} className="w-full space-y-3">
              <div className="w-full space-y-3">
                <div className="w-full">
                  <InputOne required={true} onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} name="phoneNumber" placeholderText='Enter phone number' />
                  {/* {amountError && <p className='text-center text-xs text-red-700'>{amountError}</p>} */}
                </div>

                <ButtonOne disabled={isSubmitting} type='submit' btnText1={isSubmitting ? 'Processing...' : 'Buy Internet Data'} classes={`w-full py-2 px-3 text-white hover:text-primary bg-primary hover:bg-transparent border border-transparent hover:border-primary rounded-radius-8 cursor-pointer shadow-xl focus:ring-2 focus:ring-primary focus:ring-offset-2 outline-none`} />
              </div>
            </form>
            
            <button
              type="button"
              onClick={() => setSelectedPlan(null)}
              className="text-sm text-gray-500 underline mt-2"
            >
              Change Plan
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default BuyData;
