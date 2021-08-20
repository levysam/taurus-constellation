import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Dashboard from '../pages/Dashboard/Dashboard';
import GroupForm from '../pages/GroupForm/GroupForm';
import GroupList from '../pages/GroupList/GroupList';
import QueueForm from '../pages/QueueForm/QueueForm';
import QueueList from '../pages/QueueList/QueueList';
import UserForm from '../pages/UserForm/UserForm';
import UserList from '../pages/UserList/UserList';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/groups" exact component={GroupList} />
    <Route path="/groups/new" exact component={GroupForm} />
    <Route path="/groups/:id" exact component={GroupForm} />
    <Route path="/queues/" exact component={QueueList} />
    <Route path="/queues/new" exact component={QueueForm} />
    <Route path="/queues/:id" exact component={QueueForm} />
    <Route path="/users" exact component={UserList} />
    <Route path="/users/new" exact component={UserForm} />
    <Route path="/users/:id" exact component={UserForm} />
  </Switch>
);

export default Routes;
