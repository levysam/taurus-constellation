import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Dashboard from '../pages/Dashboard/Dashboard';
import GroupsForm from '../pages/Groups/Form/Form';
import GroupsList from '../pages/Groups/List/List';
import QueuesForm from '../pages/Queues/Form/Form';
import QueuesList from '../pages/Queues/List/List';
import UsersList from '../pages/Users/List/List';
import UsersForm from '../pages/Users/Form/Form';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/groups" exact component={GroupsList} />
    <Route path="/groups/form" exact component={GroupsForm} />
    <Route path="/groups/:id" exact component={GroupsForm} />
    <Route path="/queues" exact component={QueuesList} />
    <Route path="/queues/form" exact component={QueuesForm} />
    <Route path="/queues/:id" exact component={QueuesForm} />
    <Route path="/groups" exact component={GroupsList} />
    <Route path="/users" exact component={UsersList} />
    <Route path="/users/:id" exact component={UsersForm} />
  </Switch>
);

export default Routes;
