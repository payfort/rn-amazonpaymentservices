import axios from 'axios';

const base = '/your_base_path/';
const domain = 'https://yourdomain.com';
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
  return await axios.post(`${DEFAULTS.apis.baseUrl}`, body);
};

export default getSDKToken;
