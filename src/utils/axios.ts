import axios from 'axios';

export const commonCfg = {
  // baseURL: 'https://api.example.com',
  timeout: 15000,
};

const instance = axios.create(commonCfg);

export function axiosWithRecaptchaToken(token: string) {
  return axios.create({
    ...commonCfg,
    headers: {
      'x-recaptcha-token': token,
    },
  });
}

export default instance;
