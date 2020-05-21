// Dependencies
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import fetch from 'isomorphic-fetch';

// Configuration
import config from '@config/config';

const useApollo = (): ApolloClient<NormalizedCacheObject> => {
  const httpLink = new HttpLink({
    uri: config.api.uri,
    credentials: config.api.credentials,
    fetch,
  });

  const graphQLError = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const cache = new InMemoryCache({
    dataIdFromObject: (object): string | null | undefined => object.id || null,
    addTypename: false,
  });

  const client = new ApolloClient({
    connectToDevTools: true,
    link: ApolloLink.from([graphQLError, httpLink]),
    cache,
  });

  return client;
};

export default useApollo;
