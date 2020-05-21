import * as appConstants from '@constants/appConstants';

import { EnvConfig } from '@config/config';

const productionConfig: EnvConfig = {
  baseUrl: appConstants.PROD_BASE_DOMAIN,
  api: {
    uri: appConstants.DEV_SERVER_URL,
    credentials: 'same-origin',
  },
  debug: false,
  cache: {
    enable: true,
  },
  session: {
    cookieDomain: appConstants.PRD_COOKIE_DOMAIN,
    maxAge: 604800,
    cookiePrefix: '',
    path: '/',
    httpOnly: true,
  },
};

export default productionConfig;
