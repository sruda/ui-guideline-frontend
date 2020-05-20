import firebase from 'firebase/app';

import environments from '@environments/environments';

import { db } from '@config/firebase/firebaseConfig';

import { RefSystemData } from '@interfaces/data';

const collection = 'ref_systems';

export enum StatusResponse {
  ok = 'OK',
  error = 'ERROR',
}

interface DataResponse {
  refSystemId: string;
}

export interface CreateResponse {
  status: StatusResponse;
  data?: DataResponse;
}

const getAll = async (): Promise<Array<RefSystemData>> => {
  const data = await db.collection(collection).orderBy('coming_soon', 'desc').get();
  return data.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as RefSystemData;
  });
};

const getById = async (refSystemId: string): Promise<RefSystemData> => {
  const data = await db.collection(collection).doc(refSystemId).get();

  return {
    id: data.id,
    ...data.data(),
  } as RefSystemData;
};

const create = async (data: RefSystemData): Promise<CreateResponse> => {
  try {
    const response = await db.collection(collection).add({
      active: false,
      ['created_at']: firebase.firestore.FieldValue.serverTimestamp(),
      ...data,
    });

    if (response.id) return { status: StatusResponse.ok, data: { refSystemId: response.id } };
    environments.debugMode && console.log('Error try: ', response);
    return { status: StatusResponse.error };
  } catch (error) {
    environments.debugMode && console.log('Error catch: ', error);
    return { status: StatusResponse.error };
  }
};

export default { create, getAll, getById };
