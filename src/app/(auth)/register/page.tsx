"use client"

import Loading from '@/app/loading';
import AuthPagesHeader from '@/components/AuthPagesHeader';
import AuthPagesRightSide from '@/components/AuthPagesRightSide';
import ButtonOne from '@/components/button/ButtonOne';
import InputOne from '@/components/inputs/InputOne';
import InputSelect from '@/components/inputs/InputSelect';
import OTPConfirmModal from '@/components/OTPConfirmModal';
import { registerUser, requestEmailOTP } from '@/features/auth/actions';
// import { registerSchema, RegisterType } from '@/features/auth/validations';
// import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
// import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';


// const RegisterPage = ({data}: {data?: any}) => {
const RegisterPage = () => {
    const [isOTPOpen, setIsOTPOpen] = useState(false);
    const [isOTPEntered, setIsOTPEntered] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [homeAddress, setHomeAddress] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailAddressError, setEmailAddressError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [countryError, setCountryError] = useState('');
    const [stateError, setStateError] = useState('');
    const [cityError, setCityError] = useState('');
    const [homeAddressError, setHomeAddressError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [dobError, setDobError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const confirmOTP = () => {
        if (isOTPEntered && emailAddressError === '') {
            toast.success(`Your email address has been verified!`, {
                className: 'custom-toast-success w-fit',
                icon: '✅',
                duration: 3000,
            });
        }
        // console.log(emailAddressError);
        
        setEmailAddressError('');
        setIsOTPEntered(true);
    };
    
    const toggleOTPModal = () => {
        setIsLoading(true);
        if (!isOTPOpen) {
            if (emailAddressError) setIsOTPEntered(false);

            if (!emailAddress) {
                setEmailAddressError('Enter the email address you registered with');
                return;
            } else if (emailAddress.length < 4 || !emailAddress.includes('@')) {
                setEmailAddressError('Invalid email address');
                return;
            } else {
                requestEmailOTP(emailAddress);
                setIsOTPOpen(true);
            }
            setIsLoading(false);
        } else {
            setIsOTPOpen(false);
            confirmOTP();
        }
    };
    
    const cancelEmailVerification = () => {
        // setEmailAddress('');
        setIsOTPEntered(false);
        setIsOTPOpen(false);

        if (isOTPEntered) {
            toast.error(`Your email address has not been verified!`, {
                className: 'custom-toast-error w-fit',
                icon: '❌',
                duration: 3000,
            });
        }
    };

    // const {register, handleSubmit, formState: {errors}, } = useForm<RegisterType>({resolver: zodResolver(registerSchema)});

    const onFormSubmit = () => {
        if (!firstName) {
            setFirstNameError('First Name must not be empty!');
        } else if (!lastName) {
            setLastNameError('Last Name must not be empty!');
        } else if (!emailAddress) {
            setEmailAddressError('Email address must not be empty!');
        } else if (!phoneNumber) {
            setPhoneNumberError('Phone number must not be empty!');
        } else if (!country) {
            setCountryError('Country field must not be empty!');
        } else if (!state) {
            setStateError('State field must not be empty!');
        } else if (!city) {
            setCityError('City field must not be empty!');
        } else if (!homeAddress) {
            setHomeAddressError('Home address field must not be empty!');
        } else if (!gender) {
            setGenderError('You must select a gender!');
        } else if (!dob) {
            setDobError('Date of Birth must not be empty!');
        } else if (!password) {
            setPasswordError('Password must not be empty!');
        } else if (!confirmPassword) {
            setConfirmPasswordError('Enter password again!');
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords must match!');
        } else {
            const UserData = {
                first_name: firstName,
                last_name: lastName,
                email: emailAddress,
                phone_number: phoneNumber,
                address: {
                    country: country,
                    state: state,
                    city: city,
                    home_address: homeAddress,
                },
                gender: gender,
                date_of_birth: dob,
                password: password,
                confirm_password: confirmPassword,
            }
    
            registerUser(UserData);
            localStorage.setItem('userData', JSON.stringify(UserData));

            setFirstNameError('');
            setLastNameError('');
            setEmailAddressError('');
            setPhoneNumberError('');
            setCountryError('');
            setStateError('');
            setCityError('');
            setHomeAddressError('');
            setGenderError('');
            setDobError('');
            setPasswordError('');
            setConfirmPasswordError('');

            // console.log(UserData);
            router.push('/login');
        }

    };

    // const onFormSubmit = handleSubmit(data => {
    //     if (data) {
    //         registerUser({
    //             ...data,
    //             address: {
    //                 country: data.country,
    //                 state: data.state,
    //                 city: data.city,
    //                 home_address: data.home_address,
    //             },
    //         });
    //         console.log(currentUserInfo);
    //     }
    //     registerUser(currentUserInfo);
    //   console.log(currentUserInfo);
    // });
  
    if (isLoading) <Loading />

  return (
    <div className='h-full min-h-screen w-full flex flex-col md:flex-row '>
        <Toaster position="top-center" reverseOrder={false} />
        <div className='order-2 md:order-1 w-full md:w-1/2 h-fit py-8 md:h-screen min-h-full flex items-center justify-center'>
            <div className="flex flex-col gap-6 w-[90%] md:w-[90%]">
                <AuthPagesHeader />

                <div className="self-start">
                    <h1 className='text-2xl font-semibold'>Sign up</h1>
                    <p className='text-base'>Welcome back! Please enter your details.</p>
                </div>

                <div className="w-full">
                    <form className="w-full space-y-2 md:space-y-3">
                        <div className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-3">
                            <div className="w-full md:w-1/2">
                                {/* <InputField register={register} defaultValue={data?.first_name} label='First Name' name='first_name' error={errors.first_name} /> */}
                                <InputOne onChange={(e) => setFirstName(e.target.value)} value={firstName} label='First Name' name="firstName" placeholderText='ex: John' />
                                {firstNameError && <p className='text-red-600 text-xs'>{firstNameError}</p>}
                            </div>
                            <div className="w-full md:w-1/2">
                                {/* <InputField register={register} defaultValue={data?.last_name} label='Last Name' name='last_name' error={errors.last_name} /> */}
                                <InputOne onChange={(e) => setLastName(e.target.value)} value={lastName} label='Last Name' name="lastName" placeholderText='ex: Doe' />
                                {lastNameError && <p className='text-red-600 text-xs'>{lastNameError}</p>}
                            </div>
                        </div>

                        <div className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-3">
                            <div className="w-full md:w-1/2">
                                {/* <InputField register={register} defaultValue={data?.email} onChange={(e) => setEmailAddress(e.target.value)} type='email' label='Email' name='email' error={errors.email} /> */}
                                <InputOne required={true} disabled={isOTPEntered && !emailAddressError} onChange={(e) => setEmailAddress(e.target.value)} value={emailAddress} label='Email' name="email" placeholderText='Enter your email address' />
                                <div className="flex items-center justify-between">
                                    {emailAddressError ? <p className='text-center text-xs text-red-700'>{emailAddressError}</p>
                                    : (emailAddress && !isOTPEntered) && <p className='text-center text-xs text-neutral-600'>Click the &apos;verify&apos; button to verify email</p>}
                                    {((emailAddress && !isOTPEntered) || emailAddressError) && <button type='button' onClick={toggleOTPModal} className='px-2 text-sm'>Verify</button>}
                                </div>
                            </div>

                            <div className={`w-full md:w-1/2 ${!isOTPEntered && emailAddress ? 'pb-5': ''}`}>
                                {/* <InputField register={register} defaultValue={data?.phone_number} label='Phone Number' name='phone_number' error={errors.phone_number} /> */}
                                <InputOne onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} label='Phone Number' name="phoneNumber" placeholderText='Enter your phone number' />
                                {phoneNumberError && <p className='text-red-600 text-xs'>{phoneNumberError}</p>}
                            </div>
                        </div>
                        
                        <div className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-3">
                            <div className="w-full md:w-1/3 flex-col">
                                {/* <InputField register={register} defaultValue={data?.city} label='City' name='city' error={errors.city} /> */}
                                <InputOne onChange={(e) => setCity(e.target.value)} value={city} label='City' name="city" placeholderText='ex: NY City' />
                                {cityError && <p className='text-red-600 text-xs'>{cityError}</p>}
                            </div>
                            <div className="w-full md:w-1/3 flex-col">
                                {/* <InputField register={register} defaultValue={data?.state} label='State' name='state' error={errors.state} /> */}
                                <InputOne onChange={(e) => setState(e.target.value)} value={state} label='State' name="state" placeholderText='ex: NY' />
                                {stateError && <p className='text-red-600 text-xs'>{stateError}</p>}
                            </div>
                            <div className="w-full md:w-1/3 flex-col">
                                {/* <InputField register={register} defaultValue={data?.country} label='Country' name='country' error={errors.country} /> */}
                                <InputOne onChange={(e) => setCountry(e.target.value)} value={country} label='Country' name="country" placeholderText='Enter your country' />
                                {countryError && <p className='text-red-600 text-xs'>{countryError}</p>}
                            </div>
                        </div>

                        <div className="w-full flex-col">
                            {/* <InputField register={register} defaultValue={data?.home_address} label='Home Address' name='home_address' error={errors.home_address} /> */}
                            <InputOne onChange={(e) => setHomeAddress(e.target.value)} value={homeAddress} label='Home Address' name="homeAddress" placeholderText='Enter your home address' />
                            {homeAddressError && <p className='text-red-600 text-xs'>{homeAddressError}</p>}
                        </div>

                        <div className="w-full flex items-center gap-2 md:gap-3">
                            <div className="w-1/2 flex-col">
                                {/* <InputSelectField register={register} defaultValue={data?.gender} label='Gender' name='gender' error={errors.gender} valueArray={['male', 'female']} /> */}
                                <InputSelect onChange={(e) => setGender(e.target.value)} valueArray={['Select Gender', 'Male', 'Female']} value={gender} label='Gender' name="gender" />
                                {genderError && <p className='text-red-600 text-xs'>{genderError}</p>}
                            </div>
                            <div className="w-1/2 flex-col">
                                {/* <InputField register={register} defaultValue={data?.date_of_birth} type='date' label='Date of Birth' name='date_of_birth' error={errors.date_of_birth} /> */}
                                <InputOne onChange={(e) => setDob(e.target.value)} value={dob} label='Date of Birth' name="dob" placeholderText='yyyy-mm-dd' />
                                {dobError && <p className='text-red-600 text-xs'>{dobError}</p>}
                            </div>
                        </div>

                        <div className="w-full flex items-center gap-2 md:gap-3">
                            <div className="w-1/2 flex-col">
                                <InputOne type='password' onChange={(e) => setPassword(e.target.value)} value={password} label='Password' name="password" placeholderText='Enter your password' />
                                {passwordError && <p className='text-red-600 text-xs'>{passwordError}</p>}
                            </div>
                            <div className="w-1/2 flex-col">
                                {/* <InputField register={register} defaultValue={data?.date_of_birth} type='date' label='Date of Birth' name='date_of_birth' error={errors.date_of_birth} /> */}
                                <InputOne type='password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} label='Confirm password' name="confirmPassword" placeholderText='Confirm your password' />
                                {confirmPasswordError && <p className='text-red-600 text-xs'>{confirmPasswordError}</p>}
                            </div>
                        </div>
                        
                        <ButtonOne onClick={onFormSubmit} classes='py-2 px-16 w-full' btnText1='Sign up' />
                        
                        <p className='text-center text-sm'>Already have an account? <Link href='/login' className='text-blue-600'>Login</Link></p>
                    </form>
                </div>
            </div>

            {isOTPOpen && <OTPConfirmModal cancelEmailVerification={cancelEmailVerification} handleModalToggle={toggleOTPModal} emailAddress={emailAddress} setEmailError={setEmailAddressError} />}
        </div>

        <AuthPagesRightSide />
    </div>
  )
}

export default RegisterPage;