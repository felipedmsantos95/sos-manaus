import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './pages/Main';
import Alerts from './pages/Alerts';
import AlertsForm from './pages/AlertsForm';
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Main} />
      <Route path="/alert" exact component={Alerts} />
      <Route path="/alert-forms" exact component={AlertsForm} />
      <Route path="/logon" exact component={Logon} />
      <Route path="/register" exact component={Register} />
      <Route path="/profile" exact component={Profile} />
    </BrowserRouter>
  );
};

export default Routes;
