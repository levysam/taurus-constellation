import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import GroupForm from '../pages/GroupForm/GroupForm';
import QueueForm from '../pages/QueueForm/QueueForm';
import UserForm from '../pages/UserForm/UserForm';
import UserList from '../pages/UserList/UserList';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={UserForm} />
    <Route path="/groups/new" exact component={GroupForm} />
    <Route path="/queues/new" exact component={QueueForm} />
    <Route path="/users" exact component={UserList} />
    <Route path="/users/new" exact component={UserForm} />
    <Route path="/users/:id" exact component={UserForm} />
  </Switch>
);

export default Routes;
