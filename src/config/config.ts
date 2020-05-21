// App constants
import * as appConstants from '@constants/appConstants';

// Configuration
import commonConfig from '@config/commonConfig';
import localConfig from '@config/localConfig.ts';
import productionConfig from '@config/productionConfig.ts';

// Export Types
export type CommonConfig = {
  server: {
    port: number;
  };
  languages: {
    default: string;
    list: string[];
  };
};

export type EnvConfig = {
  baseUrl: string;
  api: {
    uri: string;
    credentials: string;
  };
  debug: boolean;
  cache: {
    enable: boolean;
  };
  session: {
    cookieDomain: string;
    maxAge: number;
    cookiePrefix: string;
    path: string;
    httpOnly: boolean;
  };
};

// Private Type
type Config = CommonConfig & EnvConfig;

// development => local
let env = appConstants.LOCAL;

if (process.env.NODE_ENV && process.env.NODE_ENV !== appConstants.DEV) {
  env = process.env.NODE_ENV;
}

// Configurations by environment
const config: Config = {
  ...commonConfig,
  ...(env === appConstants.LOCAL ? localConfig : productionConfig),
};

// Environments validations
export const isLocal = (): boolean => env === appConstants.LOCAL;
export const isProduction = (): boolean => env === appConstants.PRD;

// Configuration
export default config;
