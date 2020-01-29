import React from 'react';
import ReactDOM from 'react-dom';
import client from './apollo';
import { ApolloProvider } from 'react-apollo';
import App from './Components/App';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
