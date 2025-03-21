import { z } from "zod";

// registeration
export const registerSchema = z.object({
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
    date_of_birth: z.string().refine(val => {
            const date = new Date(val);
            return !isNaN(date.getTime());
        }, {message: 'Birthday is required and must be a valid date!'}), 
    password: z.string().min(8, { message: 'Password must be at least 8 characters long!' }),
    confirm_password: z.string().min(8, { message: 'Password must be at least 8 characters long!' }),
    avatar: z.instanceof(File).refine(file => file.size <= 5000000, "Max file size is 5MB"),

});

export type RegisterType = z.infer<typeof registerSchema>;


// login
export const loginSchema = z.object({
    email: z.string().email({message: 'Invalid email address!'}),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long!' }),

});

export type LoginType = z.infer<typeof loginSchema>;


