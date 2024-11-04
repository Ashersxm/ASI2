// src/pages/index.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home.jsx';  // Your home page
import LoginUser from './forms/loginUser.jsx'; // Example additional page
import store from '../app/store.js'; // Ensure this path is correct
import { Provider } from 'react-redux';

function Index() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/loginUser" component={LoginUser} /> {/* Example of another route */}
          {/* Add more routes here as needed */}
        </Switch>
      </Router>
    </Provider>
  );
}

export default Index;
