'use server';

import { sendApiRequest } from '../../utils/api';
import { UserDataProps } from '@/types/base';

const AUTH_URL = 'api/v1/auth';

export const requestEmailOTP = async (emailAddress: string) => {
    return await sendApiRequest(
        'post',
        `${process.env.PAYFLEX_API_URL}/${AUTH_URL}/request-code`,
        {
            "email": emailAddress
        }
    );
};

export const verifyEmail = async (email: string, code: string) => {
    return await sendApiRequest(
        'post',
        `${process.env.PAYFLEX_API_URL}/${AUTH_URL}/verify-email`,
        {
            "email": email,
            "code": code
        }
    );
};

export const registerUser = async (userData: UserDataProps) => {
    return await sendApiRequest(
        'post',
        `${process.env.PAYFLEX_API_URL}/${AUTH_URL}/register`,
        userData
    );
};

// {
//     "success": true,
//     "message": "User registered successfully",
//     "data": {
//       "id": "4eb03ce7-9bd7-4c10-91c0-0f4734ccb79a",
//       "name": "Terrence Crawford",
//       "email": "vicharmonic@gmail.com",
//       "role": "USER",
//       "address": {
//         "id": "979d4e4d-bb81-43e2-b6a9-f5b0beb598fe",
//         "userId": "4eb03ce7-9bd7-4c10-91c0-0f4734ccb79a",
//         "city": "Ibadan",
//         "state": "Oyo",
//         "country": "Nigeria",
//         "home_address": "39, Technology Hub, Oke-Ado, Molete"
//       }
//     }
//   }


// {success: true, message: 'User registered successfully', data: {…}}
// data
// : 
// address
// : 
// {city: 'Awka', state: 'Anambra', country: 'Nigeria', home_address: '12 Pat-Clara close GRA Awka', _id: '67e0330377d8ab8613f4525c'}
// createdAt
// : 
// "2025-03-23T16:12:51.656Z"
// date_of_birth
// : 
// "1889-01-25T00:00:00.000Z"
// email
// : 
// "nelodecency435@gmail.com"
// first_name
// : 
// "Benedeth"
// gender
// : 
// "female"
// id
// : 
// "67e0330377d8ab8613f4525b"
// last_name
// : 
// "Ogbu"
// phone_number
// : 
// "08028845693"
// role
// : 
// "user"
// updatedAt
// : 
// "2025-03-23T16:12:51.656Z"
// [[Prototype]]
// : 
// Object
// message
// : 
// "User registered successfully"
// success
// : 
// true


export const loginUser = async (emailAddress: string, password: string) => {
    return await sendApiRequest(
        'post',
        `${process.env.PAYFLEX_API_URL}/${AUTH_URL}/login`,
        {
            "email": emailAddress,
            "password": password
        }
    );
};

// {
//     "success": true,
//     "message": "Login successful",
//     "data": {
//       "id": "4eb03ce7-9bd7-4c10-91c0-0f4734ccb79a",
//       "first_name": "Terrence",
//       "last_name": "Crawford",
//       "email": "vicharmonic@gmail.com",
//       "phone_number": "08028845693",
//       "address": {
//         "id": "979d4e4d-bb81-43e2-b6a9-f5b0beb598fe",
//         "userId": "4eb03ce7-9bd7-4c10-91c0-0f4734ccb79a",
//         "city": "Ibadan",
//         "state": "Oyo",
//         "country": "Nigeria",
//         "home_address": "39, Technology Hub, Oke-Ado, Molete"
//       },
//       "gender": "MALE",
//       "date_of_birth": "2000-01-20T00:00:00.000Z",
//       "role": "USER",
//       "createdAt": "2025-03-24T11:10:50.817Z",
//       "updatedAt": "2025-03-24T11:12:12.924Z"
//     },
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0ZWIwM2NlNy05YmQ3LTRjMTAtOTFjMC0wZjQ3MzRjY2I3OWEiLCJpYXQiOjE3NDI4MTQ4MDAsImV4cCI6MTc0MjkwMTIwMH0.JPUfc96-sUGQFoJU1ra4o7mFSTwt_uEsw27doIRc9Qs"
//   }

export const resetPassword = async (emailAddress: string) => {
    return await sendApiRequest(
        'post',
        `${process.env.PAYFLEX_API_URL}/${AUTH_URL}/password-reset-otp`,
        {
            "email": emailAddress,
        }
    );
};

export const verifyPasswordReset = async (emailAddress: string, code: string) => {
    return await sendApiRequest(
        'post',
        `${process.env.PAYFLEX_API_URL}/${AUTH_URL}/verify-password-reset-otp`,
        {
            "email": emailAddress,
            "code": code
        }
    );
};

export const updatePassword = async (emailAddress: string, new_password: string) => {
    return await sendApiRequest(
        'post',
        `${process.env.PAYFLEX_API_URL}/${AUTH_URL}/update-password`,
        {
            "email": emailAddress,
            "new_password": new_password
        }
    );
};
