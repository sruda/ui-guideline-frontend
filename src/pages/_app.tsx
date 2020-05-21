import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import useApollo from '@hooks/useApollo';

class MyApp extends App {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <ApolloProvider client={useApollo()}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

// Wraps all components in the tree with the data provider
export default MyApp;
