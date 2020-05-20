import { useState, useEffect } from 'react';

type UseGetByIdResponse<T> = {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
};

const useGetById = <T>(service, defaultData, id): UseGetByIdResponse<T> => {
  const [data, setData] = useState<T | null>(defaultData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    let didCancel = false;
    let currentQuery = true;
    const controller = new AbortController();

    const fetchData = async (): Promise<void> => {
      if (!id) return setData(null);

      if (currentQuery) {
        !didCancel && setIsLoading(true);
        setIsError(false);
        try {
          const response = await service.getById(id, controller);
          !didCancel && setData(response);
        } catch (error) {
          console.log(error);
          setIsError(true);
        } finally {
          !didCancel && setIsLoading(false);
        }
      }
    };
    fetchData();

    return (): void => {
      didCancel = true;
      currentQuery = false;
    };
  }, [service, id]);

  return { data, isLoading, isError };
};

export default useGetById;
