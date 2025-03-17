'use server';

import axios from 'axios';

// for dummyJson api
export const getDummyJsonProducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_DummyJson_API_URL}`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching products: ', error);
      throw error;
    }
};
//   getDummyJsonProducts();
  
export const getDummyJsonProductById = async (id: number) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_DummyJson_API_URL}/${id}`);
    //   console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching product by id: ', error);
        throw error;
    }
};
