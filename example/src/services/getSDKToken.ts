import axios from 'axios';

const base = '/FortAPI/';
const domain = 'https://sbpaymentservices.payfort.com';
const DEFAULTS = {
  domain,
  appName: 'APS Example',
  defaultLocale: {
    lang: 'en',
  },
  app: {
    platforms: ['ios', 'android'],
  },
  apis: {
    baseUrl: `${domain}${base}`,
    public: {
      backend: `${base}`,
    },
  },
};

const getSDKToken = async (body: {}) => {
  return await axios.post(`${DEFAULTS.apis.baseUrl}paymentApi`, body);
};

export default getSDKToken;
