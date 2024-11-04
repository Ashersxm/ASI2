// src/pages/_app.js
import React from 'react';
import { Provider } from 'react-redux';
import store from '../app/store'; // Ensure this path is correct
import '../styles/globals.css'; // If you have any global styles

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
