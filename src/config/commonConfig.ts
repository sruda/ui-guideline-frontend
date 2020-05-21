import { CommonConfig } from '@config/config';

const commonConfig: CommonConfig = {
  server: {
    port: 3000,
  },
  languages: {
    default: 'es',
    list: ['es', 'en'],
  },
};

export default commonConfig;
