import firebase from 'firebase/app';

import { isLocal } from '@config/config';

import { db } from '@config/firebase/firebaseConfig';

import { RatingData } from '@interfaces/data';

const collection = 'ratings';

export enum CreateResponse {
  ok = 'OK',
  error = 'ERROR',
}

const getAll = async (): Promise<Array<RatingData>> => {
  const data = await db.collection(collection).get();
  return data.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as RatingData;
  });
};

const create = async (data: RatingData): Promise<CreateResponse> => {
  try {
    const response = await db.collection(collection).add({
      ['created_at']: firebase.firestore.FieldValue.serverTimestamp(),
      ...data,
    });
    if (response.id) return CreateResponse.ok;
    isLocal() && console.log('Error try: ', response);
    return CreateResponse.error;
  } catch (error) {
    isLocal() && console.log('Error catch: ', error);
    return CreateResponse.error;
  }
};

export default { create, getAll };

/*
references (Axios):
https://www.techandstartup.com/tutorials/mern-app-with-react-hooks
https://bezkoder.com/react-hooks-crud-axios-api/
https://dzone.com/articles/crud-operations-using-reactjs-hooks-and-web-api

references (Firebase):
https://firebase.google.com/docs/firestore/manage-data/add-data
https://blog.logrocket.com/react-hooks-with-firebase-firestore/
https://github.com/briandesousa/firebase-with-react-hooks/blob/logrocket-blog/src/services/firestore.js
https://dev.to/vetswhocode/build-a-crud-firestore-app-in-react-gatsby-with-hooks-4ig9
https://morioh.com/p/37a47c69b899
*/
