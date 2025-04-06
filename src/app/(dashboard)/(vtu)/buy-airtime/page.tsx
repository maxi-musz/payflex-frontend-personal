'use client';

import { getAirtimeProviders, buyAirtime } from '@/features/vtu-vas/actions';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Loading from '@/app/loading';
import { showToast } from '@/components/HotToast';
import Image from 'next/image';

const BuyAirtime = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState<any | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionData, setTransactionData] = useState<any | null>(null);  // State to hold transaction data

  const router = useRouter();

  let airtimePurchaseResponse: any;

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
        console.log(res)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    

    try {
      setLoading(true)
      const token = sessionStorage.getItem("accessToken");
      airtimePurchaseResponse = await buyAirtime(token!, {
        amount,
        phoneNumber,
        provider: selectedProvider.provider,
      });

      setLoading(false)

      if (airtimePurchaseResponse.success) {
        showToast(airtimePurchaseResponse.message);
        // Set transaction data
        setTransactionData({
          provider: airtimePurchaseResponse.data.provider,
          phoneNumber: airtimePurchaseResponse.data.mobile,
          amount: airtimePurchaseResponse.data.amount,
          date: airtimePurchaseResponse.data.created_at || new Date().toLocaleString(),
          reference: airtimePurchaseResponse.data.reference,
          status: airtimePurchaseResponse.data.status,
        });
        showToast(airtimePurchaseResponse.message);
      } else {
        console.log("Error", airtimePurchaseResponse.message)
        showToast(`${airtimePurchaseResponse.message} || 'Something went wrong', 'error'`);
      }
    } catch (error) {
      showToast(`Error: ${(error as Error).message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBackHome = () => {
    router.push('http://localhost:3000');
  };

  if (loading) return <Loading />;

  return (
    <section className="space-y-5">
      <h1 className="text-3xl font-semibold mt-5">Buy Airtime</h1>

      {!selectedProvider ? (
        <>
          <h2 className="text-base font-medium mb-4">Select Provider</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {providers.map((provider: any) => (
              <div
                key={provider.provider}
                onClick={() => setSelectedProvider(provider)}
                className="bg-white border rounded-xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md cursor-pointer transition"
              >
                <span className="relative size-16 mb-2">
                  <Image
                    src={providerLogos[provider.provider.toUpperCase()] || "/images/default.png"}
                    alt={provider.provider}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </span>
                <span className="text-sm font-medium text-gray-700">{provider.provider}</span>
              </div>
            ))}
          </div>
        </>
      ) : transactionData ? (
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
      ) : (
        // Airtime purchase form
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 mt-6">
          <span className="relative size-16 mb-2">
            <Image
              src={providerLogos[selectedProvider.provider.toUpperCase()]}
              alt="logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </span>

          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            className="border rounded-lg p-2 w-64"
            required
          />

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="border rounded-lg p-2 w-64"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg w-64"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Buy Airtime'}
          </button>

          <button
            type="button"
            onClick={() => setSelectedProvider(null)}
            className="text-sm text-gray-500 underline mt-2"
          >
            Change Provider
          </button>
        </form>
      )}
    </section>
  );
};

export default BuyAirtime;
