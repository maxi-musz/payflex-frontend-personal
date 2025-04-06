"use client"

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ButtonNeutral from '@/components/button/ButtonNeutral';
import { initialisePaystackFunding } from '@/features/banking/actions';
import { showToast } from '@/components/HotToast';
import { zodResolver } from '@hookform/resolvers/zod';
import { paystackFundingInitializationSchema, PaystackFundingInitializationType } from '@/features/banking/validations';
import { useForm } from 'react-hook-form';
import InputField from '@/components/inputs/InputField';
import { parseAmountIntoNumberFormat, parseFormattedAmountToNumber } from '@/utils/formatters';
import Loading from '@/app/loading';

const TransferSuccessModal = dynamic(() => import("@/components/transfer/TransferSuccessModal"), {
  loading: () => <Loading/>,
});

interface PaystackFundingInitializationTypeProps {
  data?: PaystackFundingInitializationType;
}

const ConnectBank: React.FC<PaystackFundingInitializationTypeProps> = ({ data }) => {
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [inputAmount, setInputAmount] = useState('');
  
    const onCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formattedValue = parseAmountIntoNumberFormat(e.target.value);
      setInputAmount(`₦${formattedValue}`);
    };
  
    const handleModalToggle = () => {
      if (isSuccessModalOpen === false) {
        setIsLoading(true);
        // setTimeout(() => {
          setIsSuccessModalOpen(true);
          // }, 1000);
        } else {
          setIsSuccessModalOpen(false);
        }
      setIsLoading(false);
    };
    
    const {
      register,
      handleSubmit,
      formState: { errors },
      } = useForm<PaystackFundingInitializationType>({
      resolver: zodResolver(paystackFundingInitializationSchema),
      defaultValues: data,
    });
    
    const onFormSubmit = handleSubmit(async (data) => {
      // console.log(data);
      setIsLoading(true);
      const token = sessionStorage.getItem("accessToken");
      try {
        const parsedAmount = parseFormattedAmountToNumber(inputAmount);
        if (!isNaN(parsedAmount) && parsedAmount > 0) {
          // Manually assign parsed amount as a number to data
          const updatedData: PaystackFundingInitializationType = {
            ...data,
            amount: parsedAmount.toString(),
          };
          // console.log(updatedData);

          if (!token) return showToast("You are unauthorized!", "error");

          const updatedAmount = parseInt(updatedData.amount);
          const res = await initialisePaystackFunding(token, {
            amount: updatedAmount,
            callback_url: `${process.env.NEXT_PUBLIC_PAYSTACK_CALLBACK_URL}`,
          });          
          
          if (res.success) {
            window.location.href = res.data.authorization_url;
            showToast(`${res.message}`);
          } else {
            showToast('Something went wrong! Could not finish initialization of paystack funding.', 'error');
          }
        }
        // handleModalToggle();
      } catch (error) {
        setTimeout(() => {
          showToast(`Error: ${(error as Error).message || 'An unexpected error occurred'}`, 'error');
        }, 500);
      } finally {
        setIsLoading(false);
      }
    });

  // if (isLoading) {
  //   return <Loading/>;
  // };
  
  return (
    <section className='space-y-5'>
      <div className="w-full">
        <h1 className='text-lg font-semibold'>Connect Bank</h1>
      </div>

      <div className="w-full mt-3">
        <div className='w-full sm:w-96 rounded-radius-12 p-6 mx-auto bg-white border border-customGray space-y-3'>
          <h2 className='font-semibold pb-4'>Initialize Paystack Wallet</h2>
          <form onSubmit={onFormSubmit} className="w-full space-y-3">
            <div className="w-full space-y-3">
              <div className="w-full">
                <InputField
                  {...register("amount")}
                  type='text'
                  placeholder='₦0.00'
                  error={errors.amount}
                  value={inputAmount}
                  required
                  classes='w-full'
                  onChange={onCodeChange}
                  className='placeholder:text-center placeholder:text-xl text-xl py-2 px-3 text-center w-full rounded-xl'
                />
              </div>
                                
              <ButtonNeutral type='submit' disabled={isLoading} btnText1={isLoading ? 'Loading...' : 'Proceed'} classes={`w-full py-2 px-3 text-white hover:text-primary bg-primary hover:bg-transparent border border-transparent hover:border-primary rounded-radius-12 cursor-pointer shadow-xl focus:ring-2 focus:ring-primary focus:ring-offset-2 outline-none`} />
            </div>
          </form>
        </div>
      </div>

      {isSuccessModalOpen && <TransferSuccessModal handleModalToggle={handleModalToggle} />}
    </section>
  )
}

export default ConnectBank;