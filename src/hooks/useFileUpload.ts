import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import firebase from 'firebase';

import { storageRef } from '@config/firebase/firebaseConfig';

export type UploadDataResponse = {
  metaData: firebase.storage.FullMetadata;
  downloadUrl: string;
};

export enum DeleteResponse {
  ok = 'OK',
  error = 'ERROR',
  noFile = 'NO FILE',
}

type UseFileUploadResponse = [
  {
    fileData: UploadDataResponse | undefined;
    isLoading: boolean;
    isError: boolean;
    progress: number;
  },
  () => Promise<DeleteResponse>,
  Dispatch<SetStateAction<File | undefined>>,
];

const useFileUpload = (imageFolder: string): UseFileUploadResponse => {
  const [fileData, setFileData] = useState<UploadDataResponse | undefined>();
  const [fileToUpload, setFileToUpload] = useState<File>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const uploadData = async (): Promise<void> => {
      setIsError(false);
      setIsLoading(true);
      setProgress(0);
      if (!fileToUpload) return;

      try {
        const fName = `${new Date().getTime()}-${fileToUpload.name}`;
        const ref = storageRef.child(imageFolder + fName);
        const uploadTask = ref.put(fileToUpload);

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (progress) => {
            const value = progress.bytesTransferred / progress.totalBytes;
            console.log('Upload is ' + value * 100 + '% done');
            setProgress(value);
          },
          (error) => {
            setIsLoading(false);
            console.log('Error Uploading File: ', error);
            setIsError(true);
          },
          async () => {
            setIsError(false);
            setIsLoading(false);

            const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();

            setFileData({
              metaData: uploadTask.snapshot.metadata,
              downloadUrl,
            });

            setProgress(1);
          },
        );
      } catch (error) {
        setIsLoading(false);
        console.log('Error Uploading File: ', error);
        setIsError(true);
      }
    };

    fileToUpload && uploadData();
  }, [fileToUpload, imageFolder]);

  const handleDeleteFile = async (): Promise<DeleteResponse> => {
    if (fileData) {
      const imageRef = storageRef.child(imageFolder + fileData?.metaData.name);
      try {
        const response = await imageRef.delete();
        if (response) {
          console.log('Error Deleting file (try): ', response);
          setIsError(true);
          return DeleteResponse.error;
        }
        setFileData(undefined);
        return DeleteResponse.ok;
      } catch (error) {
        console.log('Error Deleting file (catch): ', error);
        setIsError(true);
        return DeleteResponse.error;
      }
    }

    return DeleteResponse.noFile;
  };

  return [{ fileData, isLoading, isError, progress }, handleDeleteFile, setFileToUpload];
};

export default useFileUpload;
