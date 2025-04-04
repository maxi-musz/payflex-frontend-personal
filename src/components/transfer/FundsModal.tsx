"use client";

import { AssuredWorkload, AttachMoneyOutlined } from '@mui/icons-material';
import ButtonNeutral from '../button/ButtonNeutral';
import ButtonOne from '../button/ButtonOne';
import InputField from '../inputs/InputField';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Loading from '@/app/loading';
import { useState } from 'react';
import { useGeneralData } from '@/context/GeneralDataContext';
import { parseAmountIntoNumberFormat, parseFormattedAmountToNumber } from '@/utils/formatters';
import { fundWalletAmountSchema, FundWalletAmountType } from '@/features/auth/validations';

interface FundsProps {
    data?: FundWalletAmountType,
    handleModalToggle: () => void,
    whichModal: string
}

const FundsModal = ({ data, handleModalToggle, whichModal }: FundsProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [inputAmount, setInputAmount] = useState('');
    const [whichTransferType, setWhichTransferType] = useState('');

    const { currentData, setCurrentData } = useGeneralData();

    const onCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = parseAmountIntoNumberFormat(e.target.value);
        setInputAmount(formattedValue);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FundWalletAmountType>({
        resolver: zodResolver(fundWalletAmountSchema),
        defaultValues: data,
    });

    const onFormSubmit = handleSubmit(async (formData) => {
        setIsLoading(true);

        try {
            if (whichModal === 'Fund Wallet') {
                const parsedAmount = parseFormattedAmountToNumber(inputAmount); // Parse formatted amount to number
    
                // Check if the parsed amount is a valid number
                if (!isNaN(parsedAmount) && parsedAmount > 0) {
                    // Manually assign parsed amount as a number to formData
                    const updatedFormData: FundWalletAmountType = {
                        ...formData,
                        amount: parsedAmount.toString(), // Override string with parsed number
                    };
    
                    console.log(updatedFormData);
                    setIsLoading(false);
                    setCurrentData({ ...currentData, currentTab: '/ngn-ngn-transfer' });
                    handleModalToggle();
                } else {
                    // Handle invalid number case (NaN or 0)
                    console.error('Invalid amount, please enter a valid number.');
                    setIsLoading(false);
                }
            }

        } catch (error) {
            console.error('Error submitting form:', error);
            setIsLoading(false);
        }
    });

    const handleTransactionTypeSubmit = () => {
        if (whichModal === 'Transfer') {
            // console.log(whichTransferType);
            if (whichTransferType === 'NGN2NGN') {
                setCurrentData({ ...currentData, currentTab: '/ngn-ngn-transfer' });
            }
            if (whichTransferType === 'NGN2Foreign') {
                setCurrentData({ ...currentData, currentTab: '/ngn-foreign-transfer' });
            }

            handleModalToggle();
        }
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <section className="fixed inset-0 -top-10 bg-gray-800 bg-opacity-80 flex justify-center items-center p-2 z-[999999]">
            <div className="bg-white md:w-[27rem] rounded-radius-12 shadow-lg flex flex-col justify-center items-center">
                {whichModal === 'Fund Wallet' && 
                <form onSubmit={onFormSubmit} className="w-full p-6 flex flex-col items-start justify-between gap-4 rounded-radius-12">
                    <div className='rounded-radius-12 size-10 border border-gray-200 flex items-center justify-center'>
                        <span className='text-green-600'><AttachMoneyOutlined /></span>
                    </div>

                    <div className='pt-3 pb-5 space-y-4 mx-auto'>
                        <p className='text-lg md:text-xl text-center font-semibold'>How much do you want to fund your wallet with?</p>
                        <InputField
                            {...register("amount")} // Register the field without valueAsNumber
                            type='text' // Use text to allow formatting
                            placeholder='₦0.00'
                            error={errors.amount}
                            value={inputAmount} // Use formatted value
                            required
                            classes='w-full'
                            onChange={onCodeChange} // Update on change with formatting
                            className='placeholder:text-center placeholder:text-xl text-xl py-2 px-3 text-center w-full rounded-xl'
                        />
                    </div>

                    <div className="w-full flex items-center justify-center gap-3">
                        <ButtonNeutral onClick={handleModalToggle} classes='py-2 px-8 text-sm border rounded-xl' btnText1='Cancel' />
                        <ButtonOne type='submit' classes='py-2 px-8 text-sm' btnText1='Continue' />
                    </div>
                </form>
                }
                

                {whichModal === 'Transfer' && 
                <div className="w-full p-6 flex flex-col items-start justify-between gap-4 rounded-radius-12">
                    <div className='rounded-radius-12 size-10 border border-gray-200 flex items-center justify-center'>
                        <span className='text-green-600'><AssuredWorkload /></span>
                    </div>

                    <div className='pt-3 pb-5 space-y-4 mx-auto'>
                        <p className='text-lg md:text-xl text-center font-semibold'>How much do you want to transfer?</p>
                        <div className="flex items-center justify-between gap-5">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="transferType"
                                    id="NGN2NGN"
                                    value={'NGN2NGN'}
                                    onChange={(e) => setWhichTransferType(e.target.value)}
                                />
                                <label htmlFor="NGN2NGN">NGN - NGN</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="transferType"
                                    id="NGN2Foreign"
                                    value={'NGN2Foreign'}
                                    onChange={(e) => setWhichTransferType(e.target.value)}
                                />
                                <label htmlFor="NGN2Foreign">NGN - Foreign</label>
                            </div>
                        </div>
                        <p className='text-center flex items-end justify-between gap-3'>
                            <span className=''>Selected Transfer Type:</span>
                            <span className='flex-1 border h-7 rounded-radius-8 bg-blue-50 font-semibold'>{whichTransferType}</span>
                        </p>
                    </div>

                    <div className="w-full flex items-center justify-center gap-3">
                        <ButtonNeutral onClick={handleModalToggle} classes='py-2 px-8 text-sm border rounded-xl' btnText1='Cancel' />
                        <ButtonOne onClick={handleTransactionTypeSubmit} classes='py-2 px-8 text-sm' btnText1='Continue' />
                    </div>
                </div>}

            </div>
        </section>
    );
};

export default FundsModal;
