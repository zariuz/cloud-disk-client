import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Registration from './components/registration/Registration';
import './app.scss';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="wrap">
          <Switch>
            <Route path="/registration" component={Registration} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
