import { z } from "zod";

// Registeration
export const registerSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required!" }),
  last_name: z.string().min(1, { message: "Last name is required!" }),
  email: z.string().min(3, { message: "Email is required!" }).email({ message: "Invalid email address!" }),
  phone_number: z.string().min(1, { message: "Phone number is required!" }),
  country: z.string().min(1, { message: "Country is required!" }),
  state: z.string().min(1, { message: "State is required!" }),
  city: z.string().min(1, { message: "City is required!" }),
  home_address: z.string().min(1, { message: "Home address is required!" }),
  gender: z.enum(["male", "female"], { message: "Gender is required!" }),
  date_of_birth: z.string(),
  password: z.string().min(8, { message: "Password must be at least 8 characters long!" }),
  confirm_password: z.string().min(8, { message: "Confirm password must be at least 8 characters long!" })
    // .refine((val, ctx) => val === ctx.parent.password, {
    //   message: "Passwords must match!",
    // }),
});

export type RegisterType = z.infer<typeof registerSchema>;
