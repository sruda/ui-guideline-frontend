import * as appConfig from '@constants/appConstants';

interface Environment {
  test: string;
}

const local: Environment = {
  test: 'LOCAL',
};

const dev: Environment = {
  test: 'DEV',
};

const prod: Environment = {
  test: 'PROD',
};

const config = (): Environment => {
  switch (process.env.REACT_APP_ENV) {
    case 'local':
      return local;
    case 'development':
      return dev;
    case 'production':
      return prod;
    default:
      return local;
  }
};

export default {
  // Add common config values here
  debugMode: appConfig.DEBUG,
  dataBaseUrl: appConfig.SERVER_URL,
  ...config(),
};
