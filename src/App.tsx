import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Registration from './components/authorization/Registration';
import Login from './components/authorization/Login';
import {useDispatch, useSelector} from 'react-redux';
import {auth} from './api/user';
import './app.scss';

const App = () => {
  const isAuth = useSelector((state: any) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="wrap">
          {!isAuth && (
            <Switch>
              <Route path="/registration" component={Registration} />
              <Route path="/login" component={Login} />
            </Switch>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
