import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './pages/Main';
import Alerts from './pages/Alerts';
import AlertsForm from './pages/AlertsForm';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Main} />
      <Route path="/alert" exact component={Alerts} />
      <Route path="/alert-forms" exact component={AlertsForm} />
    </BrowserRouter>
  );
};

export default Routes;
