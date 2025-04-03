'use server';

import { sendApiRequest } from '../../utils/api';
import { UserDataProps } from '@/types/base';

const AUTH_URL = 'api/v1/auth';

export const requestEmailOTP = async (emailAddress: string) => {
    return await sendApiRequest(
        'post',
        `${process.env.PAYFLEX_API_URL}/${AUTH_URL}/request-email-otp`,
        {
            "email": emailAddress
        }
    );
};

export const verifyEmail = async (email: string, code: string) => {
    return await sendApiRequest(
        'post',
        `${process.env.PAYFLEX_API_URL}/${AUTH_URL}/verify-email-otp`,
        {
            "email": email,
            "otp": code
        }
    );
};

export const registerUser = async (userData: UserDataProps) => {
    return await sendApiRequest(
        'post',
        `${process.env.PAYFLEX_API_URL}/${AUTH_URL}/signup`,
        userData
    );
};

export const loginUser = async (emailAddress: string, password: string) => {
    return await sendApiRequest(
        'post',
        `${process.env.PAYFLEX_API_URL}/${AUTH_URL}/signin`,
        {
            "email": emailAddress,
            "password": password
        }
    );
};

// {
//     "success": true,
//     "message": "Welcome back",
//     "data": {
//       "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkNzExOTdhNC1kNjJjLTQzMzQtOWJkYi04ODJhNzBmOGNiMzMiLCJlbWFpbCI6ImJlcm5hcmRtYXlvd2FhQGdtYWlsLmNvbSIsImlhdCI6MTc0MzY3OTIxOCwiZXhwIjoxNzQzNjgwMTE4fQ.WHyEjnkm-8SBhstpOI38aar9MOxNESsntTkucSRw3R0",
//       "user": {
//         "id": "d71197a4-d62c-4334-9bdb-882a70f8cb33",
//         "first_name": "Mayowa",
//         "last_name": "Bernard",
//         "email": "bernardmayowaa@gmail.com",
//         "hash": "$argon2id$v=19$m=65536,t=3,p=4$w6DONU18NeoT91/lV3HV6g$0PFqfzWEvBPInzep/tW/B5FRtqHWZG4YOdRzYx8MSIU",
//         "phone_number": "08146694787",
//         "password": "$argon2id$v=19$m=65536,t=3,p=4$w6DONU18NeoT91/lV3HV6g$0PFqfzWEvBPInzep/tW/B5FRtqHWZG4YOdRzYx8MSIU",
//         "otp": null,
//         "otp_expires_at": "2025-04-02T16:51:38.436Z",
//         "role": "user",
//         "gender": "male",
//         "date_of_birth": "1990-01-01T00:00:00.000Z",
//         "is_email_verified": true,
//         "createdAt": "2025-04-02T16:46:38.438Z",
//         "updatedAt": "2025-04-02T16:50:18.461Z",
//         "address": {
//           "id": "4fdfc083-0855-4eeb-9af0-d9e251bcdc70",
//           "userId": "d71197a4-d62c-4334-9bdb-882a70f8cb33",
//           "city": "San Francisco",
//           "state": "California",
//           "country": "United States",
//           "home_address": "123 Main St"
//         }
//       }
//     }
//   }

export const resetPassword = async (emailAddress: string) => {
    return await sendApiRequest(
        'post',
        `${process.env.PAYFLEX_API_URL}/${AUTH_URL}/request-password-reset-email`,
        {
            "email": emailAddress,
        }
    );
};

export const verifyPasswordReset = async (emailAddress: string, code: string) => {
    return await sendApiRequest(
        'post',
        `${process.env.PAYFLEX_API_URL}/${AUTH_URL}/verify-password-reset-email`,
        {
            "email": emailAddress,
            "otp": code
        }
    );
};

export const updatePassword = async (emailAddress: string, new_password: string) => {
    return await sendApiRequest(
        'post',
        `${process.env.PAYFLEX_API_URL}/${AUTH_URL}/reset-password`,
        {
            "email": emailAddress,
            "new_password": new_password
        }
    );
};
