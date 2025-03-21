'use server';

import { sendApiRequest } from '../../utils/api';
import { UserDataProps } from '@/types/base';

const AUTH_URL = 'api/v1/auth';

export const requestEmailOTP = async (emailAddress: string) => {
    const response = await sendApiRequest(
        'post',
        `${process.env.PAYFLEX_API_URL}/${AUTH_URL}/request-code`,
        {
            "email" : emailAddress
            // "email" : "victor.c.okoye@gmail.com"
        }
    );

    console.log(response);
};

export const verifyEmail = async (email: string, code: string) => {
    const response = await sendApiRequest(
        'post',
        `${process.env.PAYFLEX_API_URL}/${AUTH_URL}/verify-email`,
        {
            "email" : email,
            "code": code
            // "email" : "victor.c.okoye@gmail.com",
            // "code": "1932"
        }
    );

    console.log(response);
};

export const registerUser = async (userData: UserDataProps) => {
    const response = await sendApiRequest(
        'post',
        `${process.env.PAYFLEX_API_URL}/${AUTH_URL}/register`,
        userData
    );

    console.log(response);
};

export const loginUser = async (emailAddress: string, password: string) => {
    const response = await sendApiRequest(
        'post',
        `${process.env.PAYFLEX_API_URL}/${AUTH_URL}/login`,
        {
            "email": emailAddress,
            "password": password
            // "email": "victor.c.okoye@gmail.com",
            // "password": "12345678"
        }
    );

    console.log(response);
};

export const resetPassword = async (emailAddress: string) => {
    const response = await sendApiRequest(
        'post',
        `${process.env.PAYFLEX_API_URL}/${AUTH_URL}/password-reset-otp`,
        {
            "email": emailAddress,
            // "email": "victor.c.okoye@gmail.com",
        }
    );

    console.log(response);
};

export const verifyPasswordReset = async (emailAddress: string, code: string) => {
    const response = await sendApiRequest(
        'post',
        `${process.env.PAYFLEX_API_URL}/${AUTH_URL}/verify-password-reset-otp`,
        {
            "email": emailAddress,
            "code": code
            // "email": "victor.c.okoye@gmail.com",
            // "password": "12345678"
        }
    );

    console.log(response);
};

export const updatePassword = async (emailAddress: string, new_password: string) => {
    const response = await sendApiRequest(
        'post',
        `${process.env.PAYFLEX_API_URL}/${AUTH_URL}/update-password`,
        {
            "email": emailAddress,
            "new_password": new_password
            // "email": "victor.c.okoye@gmail.com",
            // "new_password": "maximus1111"
        }
    );

    console.log(response);
};
