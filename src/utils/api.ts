'use server';

import axios from 'axios';

export const sendApiRequest = async <T>(
  method: 'post' | 'get' | 'put',
  url: string,
  data: T,
) => {
  
  axios({method, url, data, maxBodyLength: Infinity})
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
}