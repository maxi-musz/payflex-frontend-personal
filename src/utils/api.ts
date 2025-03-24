import axios from 'axios';

export const sendApiRequest = async <T>(
  method: 'post' | 'get' | 'put',
  url: string,
  data: T,
) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      maxBodyLength: Infinity
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
      throw new Error(error.response?.data?.message || 'Something went wrong');
    } else {
      console.error('An unexpected error occurred');
      throw new Error('Something went wrong');
    }
  }
};
