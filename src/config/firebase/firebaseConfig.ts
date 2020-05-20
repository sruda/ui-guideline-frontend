import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

import * as appConfig from '@constants/appConstants';

// Initialize Firebase
firebase.initializeApp(appConfig.FIREBASE_CONFIG);

export const db = firebase.firestore();

// the firebase reference to storage
export const storageRef = firebase.storage().ref();
