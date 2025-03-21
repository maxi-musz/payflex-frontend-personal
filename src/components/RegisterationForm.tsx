
'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

const schema = z.object({
  // username: z.string().min(3, {message: 'Username must be at least 3 characters long!'}).max(20, {message: 'Username must be at most 20 characters long!'}),
  first_name: z.string().min(1, {message: 'First name is required!'}),
  last_name: z.string().min(1, {message: 'Last name is required!'}),
  email: z.string().email({message: 'Invalid email address!'}),
  phone_number: z.string().min(1, {message: 'Phone number is required!'}),
  country: z.string().min(1, {message: 'Country is required!'}),
  state: z.string().min(1, {message: 'State is required!'}),
  city: z.string().min(1, {message: 'City is required!'}),
  home_address: z.string().min(1, {message: 'Home address is required!'}),
  gender: z.enum(['male', 'female'], {message: 'Gender is required!'}),
  date_of_birth: z.date({message: 'Birthday is required!'}),
  password: z.string().min(8, {message: 'Password must be at least 8 characters long!'}),
  confirm_password: z.string().min(8, {message: 'Password must be at least 8 characters long!'}),
  // avatar: z.instanceof(File, {message: "Image is required!"}),
});

type FormSchema = z.infer<typeof schema>;

const RegisterationForm = () => {
  const {handleSubmit} = useForm<FormSchema>({resolver: zodResolver(schema)});

  const onFormSubmit = handleSubmit(data => {
    console.log(data);
  });

  
  // registerUser(currentUserInfo);

  return (
    <div className='space-y-6 p-6'>
      <h1>Register</h1>
      <form onSubmit={onFormSubmit} className='flex items-center justify-center gap-6 flex-wrap'>
        {/* <InputField register={register} defaultValue={data?.first_name} label='First Name' name='first_name' error={errors.first_name} />
        <InputField register={register} defaultValue={data?.last_name} label='Last Name' name='last_name' error={errors.last_name} />
        <InputField register={register} defaultValue={data?.email} type='email' label='Email' name='email' error={errors.email} />
        <InputField register={register} defaultValue={data?.phone_number} label='Phone Number' name='phone_number' error={errors.phone_number} />
        <InputField register={register} defaultValue={data?.country} label='Country' name='country' error={errors.country} />
        <InputField register={register} defaultValue={data?.state} label='State' name='state' error={errors.state} />
        <InputField register={register} defaultValue={data?.city} label='City' name='city' error={errors.city} />
        <InputField register={register} defaultValue={data?.home_address} label='Home Address' name='home_address' error={errors.home_address} />
        <InputField register={register} defaultValue={data?.gender} label='Gender' name='gender' error={errors.gender} />
        <InputField register={register} defaultValue={data?.date_of_birth} type='date' label='Date of Birth' name='date_of_birth' error={errors.date_of_birth} />
        <InputField register={register} defaultValue={data?.password} type='password' label='Password' name='password' error={errors.password} />
        <InputField register={register} defaultValue={data?.confirm_password} type='password' label='Confirm Password' name='confirm_password' error={errors.confirm_password} /> */}

        <button type="submit" className='border bg-primary hover:bg-primary_hover py-1 px-3 rounded-radius-4 text-white'>Register</button>
      </form>
    </div>
  );
};

export default RegisterationForm;
