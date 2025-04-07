import React, { useState } from 'react'
import ButtonOne from '../button/ButtonOne';
import { Save, ShieldOutlined, TaskOutlined } from '@mui/icons-material';
import InputField from '../inputs/InputField';
import { Toaster } from 'react-hot-toast';
import { showToast } from '../HotToast';
import SelectInputField from '../inputs/InputSelectField';

const Verification = () => {
    const [loading, setLoading] = useState(false);

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            showToast("KYC information updated successfully");
            setLoading(false);
        }, 2000);
    };
    
  return (
    <form onSubmit={onFormSubmit} className='py-3 divide-y'>
        <Toaster position="top-center" reverseOrder={false} />
        <div className='py-6 px-5'>
            <div className='flex items-center gap-2 pb-3'>
                <ShieldOutlined className='text-primary' />
                <h2 className='text-xl font-semibold'>Identity Verification (KYC)</h2>
            </div>
            
            <div className="w-full space-y-3 md:space-y-5">
                <div className="w-full">
                    <SelectInputField
                        valueArray={['Passport', 'Driving License', 'National ID Card', 'Residence Permit']}
                        // {...register("first_name")}
                        label="ID Type"
                        // error={errors.first_name}
                        required
                        classes='w-full'
                        placeholderText='Select ID Type'
                    />
                </div>
                <div className="w-full">
                    <InputField
                        // {...register("last_name")}
                        label="ID Number"
                        // error={errors.last_name}
                        required
                        classes='w-full'
                        placeholderText='Enter your ID number'
                    />
                </div>
                <div className="text-primary w-full flex items-start gap-3 p-5 bg-blue-50 border border-blue-100 rounded-radius-12">
                    <TaskOutlined />
                    <p className=''>Your identity information is securely stored and encrypted. We only use this information for verification purposes as required by regulations.</p>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-end pt-6 pb-1 px-5">
            <ButtonOne
                type='submit'
                classes='py-2 px-8 font-semibold'
                btnText1={loading ? 'Submitting...' : 'Submit Verification'}
                icon1={<Save style={{fontSize: '17px'}} />}
            />
        </div>
    </form>
  )
}

export default Verification;