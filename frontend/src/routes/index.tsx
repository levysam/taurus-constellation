import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import UserForm from '../pages/UserForm/UserForm';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={UserForm} />
  </Switch>
);

export default Routes;
