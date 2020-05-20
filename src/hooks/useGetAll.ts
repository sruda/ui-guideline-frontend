import { useState, useEffect } from 'react';

type UseGetAllResponse<T> = {
  data: Array<T>;
  isLoading: boolean;
  isError: boolean;
};
/* TODO: Investigar como hacer para devolver nombres distintos, ya que puedo usar useGetAll mas de 2 veces en una vista,
Entonces tendria repetido: data, isLoading, isError.
*/
const useGetAll = <T>(service, defaultData): UseGetAllResponse<T> => {
  const [data, setData] = useState<Array<T>>(defaultData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    let didCancel = false;
    const fetchData = async (): Promise<void> => {
      !didCancel && setIsLoading(true);
      setIsError(false);
      try {
        const response = await service.getAll();
        !didCancel && setData(response);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        !didCancel && setIsLoading(false);
      }
    };
    fetchData();
    return (): void => {
      didCancel = true;
    };
  }, [service]);

  return { data, isLoading, isError };
};

export default useGetAll;

/*
  references:
  https://dev.to/silvestricodes/asynchronous-flows-with-react-hooks-1g0m
  https://scotch.io/tutorials/create-a-custom-usefetch-react-hook
*/
