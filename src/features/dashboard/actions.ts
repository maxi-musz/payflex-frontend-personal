'use server';

import { sendApiRequest } from '../../utils/api';
// import { cookies } from 'next/headers';

const AUTH_URL = 'api/v1/user';

export const getUserDashboard = async (token: string) => {
    // const token = cookies().get('accessToken')?.value;
    
    if (!token) {
        throw new Error("No access token found.");
    }

    return await sendApiRequest(
        'get',
        `${process.env.PAYFLEX_API_URL}/${AUTH_URL}/fetch-user-dashboard`,
        null,
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true },
        // 0
    );
};
