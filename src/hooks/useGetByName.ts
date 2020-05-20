import { useState, useEffect } from 'react';

type UseGetByResponse<T> = {
  data: Array<T>;
  isLoading: boolean;
  isError: boolean;
};
/* TODO: Este Hook funciona muy bien, pero es poco reusable. Tiene quemado el nombre del servicio (e.g. getByName).
Ademas tiene quemado la funcion sleep, que no sabemos si en todas partes vamos a usarla. Pensar muy bien, para 
que este hook sirva para cualquier GetByKey. 
references:
  https://levelup.gitconnected.com/react-hooks-search-an-api-ceb8b840b1ce
  https://github.com/PrestonElliott/React-Hooks/blob/master/react-hooks/src/Components/Search/search.jsx*/
const useGetBy = <T>(service, defaultData, query): UseGetByResponse<T> => {
  const [data, setData] = useState<Array<T>>(defaultData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // PREVENTS RERENDER FLICKERING AS USER TYPES IN SEARCH
  const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    let didCancel = false;
    let currentQuery = true;
    const controller = new AbortController();

    const fetchData = async (): Promise<void> => {
      if (!query) return setData([]);

      await sleep(350);
      if (currentQuery) {
        !didCancel && setIsLoading(true);
        setIsError(false);
        try {
          // TODO: Buscar una solucion para el getBy dinamico
          const response = await service.getByName(query, controller);
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
  }, [service, query]);

  return { data, isLoading, isError };
};

export default useGetBy;

/*
  references:
  https://levelup.gitconnected.com/react-hooks-search-an-api-ceb8b840b1ce
  https://github.com/PrestonElliott/React-Hooks/blob/master/react-hooks/src/Components/Search/search.jsx
*/
