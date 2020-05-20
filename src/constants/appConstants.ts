/**
 * @desc App constants: Keep centralize every global app constant here
 * (e.g. server urls, domain, google Map Key, accessKeyIdS3, etc.)
 * @type constants
 */

/* CURRENT ENVIRONMENT */
export const ENV = process.env.NODE_ENV;

/* DEBUG */
export const DEBUG = !!ENV;

/* Base domain */
export const BASE_DOMAIN = 'https://www.uiguideline.com';

/* Environments */
export const LOCAL = 'local';
export const DEV = 'development';
export const PRD = 'production';

/* Server Urls */
export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

/* Firebase Config */
export const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

/* Mixpanel Config */
export const MIXPANEL_PROJECT_TOKEN = process.env.REACT_APP_MIXPANEL_PROJECT_TOKEN;

/* Sentry Config */
export const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN;
