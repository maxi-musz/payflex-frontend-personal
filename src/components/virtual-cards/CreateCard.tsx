'use client';

import React, { useEffect, useState } from 'react'
import ButtonOne from '../button/ButtonOne';
import InputField from '../inputs/InputField';
import SelectInputField from '../inputs/InputSelectField';
import { CreditCard } from '@mui/icons-material';
import { Toaster } from 'react-hot-toast';
import { showToast } from '../HotToast';
import LoadingSpinner from '../LoadingSpinner';

const CreateCard = () => {
  const [loading, setLoading] = useState(false);
  const [btnIsDisabled, setBtnIsDisabled] = useState(false);
  const [isChecked, setIsChecked] = useState('');
  
  useEffect(() => {
    if (isChecked !== 'on' || loading) {
      setBtnIsDisabled(true);
    } else {
      setBtnIsDisabled(false);
    }
  }, [isChecked, loading]);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      showToast("Card created successfully! You can view it in the 'My Cards' tab.");
      setLoading(false);
      // window.location.reload();
    }, 2000);
  };

  // const handleCheckbox = (e: ChangeEventH<HTMLInputElement>) => {
  //   setIsChecked(e.target.value)
  // }
  // console.log(isChecked);

  return (
    <form onSubmit={onFormSubmit} className='py-3 divide-y'>
        <Toaster position="top-center" reverseOrder={false} />
        <div className='py-6 px-5'>

          <div className="w-full flex items-center justify-between gap-3 pb-6">
            <div className="">
              <h2 className='text-[22px] font-semibold'>Create Virtual Card</h2>
              <p>Create an international virtual card for online transactions</p>
            </div>
            {/* <button type='submit'
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-70"
              disabled={loading}
            >
                {loading && (
                  <LoadingSpinner/>
                )}
              {loading ? 'Processing...' : 'Submit'}
            </button> */}

            <ButtonOne
              type='submit'
              classes='py-2 px-8 font-semibold'
              disabled={btnIsDisabled}
              icon1={loading ? <LoadingSpinner color='text-white' /> : ''}
              btnText1={loading ? 'Processing...' : 'Create Virtual Card'}
            />
          </div>

          <div className='w-full sm:w-96 mx-auto p-5 bg-neutral-100 rounded-radius-12'>
              <div className='flex items-center gap-2'>
                <CreditCard className='text-primary' />
                <h2 className='text-[16px] font-semibold'>Card Details</h2>
              </div>
            
            <div className="w-full space-y-3 md:space-y-5">
                <div className="w-full">
                    <SelectInputField
                        valueArray={['USD - US Dollar', 'EUR - Euro', 'GBP - British Pound', 'NGN - Nigerian Naira']}
                        // {...register("first_name")}
                        label="Currency"
                        // error={errors.first_name}
                        required
                        classes='w-full'
                        placeholderText='Select ID Type'
                    />
                </div>
                <div className="w-full">
                    <InputField
                        // {...register("last_name")}
                        label="Funding Amount"
                        type='number'
                        // error={errors.last_name}
                        required
                        value={100}
                        classes='w-full'
                        placeholderText='Enter your ID number'
                    />
                </div>
                <div className="w-full p-5 border rounded-radius-12">
                  <div className='flex items-center gap-3'>
                    <input type="checkbox" required onChange={(e) => setIsChecked(e.target.value)} name="termsAndConditions" id="termsAndConditions" className='size-5 rounded-radius-8' />
                    <label htmlFor="termsAndConditions" className='font-semibold'>I agree to the terms and conditions</label>
                  </div>
                  <p className=''>By checking this box, you agree to our <span className='text-primary'>Terms of Service</span> and <span className='text-primary'>Privacy Policy</span>.</p>
                </div>
            </div>
          </div>
        </div>

        {/* <div className="flex items-center justify-end pt-6 pb-1 px-5">
          <ButtonOne
            type='submit'
            classes='py-2 px-8 font-semibold'
            btnText1={loading ? 'Processing...' : 'Create Virtual Card'}
          />
        </div> */}
    </form>
  )
}

export default CreateCard;