// src/pages/index.js
import React from 'react';
import Home from './Home.jsx';  // Votre page d'accueil
import store from '../app/store.js'; // Vérifiez que le chemin est correct
import { Provider } from 'react-redux';

function Index() {

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default Index;
