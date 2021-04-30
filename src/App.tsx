import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Registration from './components/authorization/Registration';
import Login from './components/authorization/Login';
import {useDispatch, useSelector} from 'react-redux';
import {auth} from './api/user';
import Disk from './components/disk/Disk';
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
          {!isAuth ? (
            <Switch>
              <Route path="/registration" component={Registration} />
              <Route path="/login" component={Login} />
              <Redirect to="/login" />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/" component={Disk} />
              <Redirect to="/" />
            </Switch>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
