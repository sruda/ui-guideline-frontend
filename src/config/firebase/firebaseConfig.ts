import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

import * as appConstants from '@constants/appConstants';

// Initialize Firebase
firebase.initializeApp(appConstants.FIREBASE_CONFIG);

export const db = firebase.firestore();

// the firebase reference to storage
export const storageRef = firebase.storage().ref();
