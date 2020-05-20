import firebase from 'firebase/app';

import environments from '@environments/environments';

import { db } from '@config/firebase/firebaseConfig';

import { ComponentData } from '@interfaces/data';

const collection = 'components';

export enum StatusResponse {
  ok = 'OK',
  error = 'ERROR',
}

export type CreateResponse = {
  status: StatusResponse;
  data?: DataResponse;
};

type DataResponse = {
  componentId: string;
};

const getAll = async (): Promise<Array<ComponentData>> => {
  const data = await db.collection(collection).get();
  return data.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as ComponentData;
  });
};

/* TODO: Decidi obtener toda la lista y filtrarla desde el cliente, ya que Firebase no me
ofrece una opcion LIKE para los items del array "keywords". Dejo este metodo aqui para futuras decisiones.
references:
https://medium.com/@ken11zer01/firebase-firestore-text-search-and-pagination-91a0df8131ef */
const getByName = async (query: string): Promise<Array<ComponentData>> => {
  const data = await db
    .collection(collection)
    .where('keywords', 'array-contains', query.toLowerCase())
    .orderBy('name')
    .get();

  return data.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as ComponentData;
  });
};

const create = async (data: ComponentData): Promise<CreateResponse> => {
  try {
    const response = await db.collection(collection).add({
      active: false,
      ['created_at']: firebase.firestore.FieldValue.serverTimestamp(),
      ...data,
    });

    if (response.id) return { status: StatusResponse.ok, data: { componentId: response.id } };
    environments.debugMode && console.log('Error try: ', response);
    return { status: StatusResponse.error };
  } catch (error) {
    environments.debugMode && console.log('Error catch: ', error);
    return { status: StatusResponse.error };
  }
};

export default { create, getAll, getByName };

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
