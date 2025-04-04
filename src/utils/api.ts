import axios, { AxiosRequestConfig } from 'axios';

export const sendApiRequest = async <T>(
  method: 'post' | 'get' | 'put',
  url: string,
  data?: T,
  config?: AxiosRequestConfig,
  // maxRedirects?: number,
) => {
  // console.log("Method:", method);
  // console.log("URL:", url);
  // console.log("Data:", data);
  // console.log("Config:", config);
  // console.log("MaxRedirects:", maxRedirects);

  try {
    const response = await axios({
      method,
      url,
      data,
      ...config,
      maxBodyLength: Infinity,
      // maxRedirects,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message || 'Something went wrong';
      throw new Error(message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
