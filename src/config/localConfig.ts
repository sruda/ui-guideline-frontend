import * as appConstants from '@constants/appConstants';

import { EnvConfig } from '@config/config';

const localConfig: EnvConfig = {
  baseUrl: appConstants.LOCAL_BASE_DOMAIN,
  api: {
    uri: appConstants.LOCAL_SERVER_URL,
    credentials: 'same-origin',
  },
  debug: true,
  cache: {
    enable: false,
  },
  session: {
    cookieDomain: appConstants.LOCAL_COOKIE_DOMAIN,
    maxAge: 604800,
    cookiePrefix: '',
    path: '/',
    httpOnly: true,
  },
};

export default localConfig;
