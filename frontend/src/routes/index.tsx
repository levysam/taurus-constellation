import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Account from '../pages/Account/Account';
import MainDashboard from '../pages/Dashboard/Main/MainDashboard';
import GroupDashboard from '../pages/Dashboard/Group/GroupDashboard';
import GroupsForm from '../pages/Groups/Form/Form';
import GroupsList from '../pages/Groups/List/List';
import JobsDetail from '../pages/Dashboard/Jobs/Detail/Detail';
import JobsForm from '../pages/Dashboard/Jobs/Form/Form';
import JobsList from '../pages/Dashboard/Jobs/List/List';
import Login from '../pages/Login/Login';
import QueueDashboard from '../pages/Dashboard/Queue/QueueDashboard';
import QueuesForm from '../pages/Queues/Form/Form';
import QueuesList from '../pages/Queues/List/List';
import UsersList from '../pages/Users/List/List';
import UsersForm from '../pages/Users/Form/Form';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/dashboard" exact component={MainDashboard} isPrivate />
    <Route path="/dashboard/:id" exact component={GroupDashboard} isPrivate />
    <Route path="/dashboard/queues/:id" exact component={QueueDashboard} isPrivate />
    <Route path="/dashboard/queues/:queueId/:state/jobs" exact component={JobsList} isPrivate />
    <Route path="/dashboard/queues/:queueId/:state/jobs/form" exact component={JobsForm} isPrivate />
    <Route path="/dashboard/queues/:queueId/:state/jobs/:jobId" exact component={JobsDetail} isPrivate />
    <Route path="/groups" exact component={GroupsList} isPrivate isAdminOnly />
    <Route path="/groups/form" exact component={GroupsForm} isPrivate isAdminOnly />
    <Route path="/groups/:id" exact component={GroupsForm} isPrivate isAdminOnly />
    <Route path="/queues" exact component={QueuesList} isPrivate isAdminOnly />
    <Route path="/queues/form" exact component={QueuesForm} isPrivate isAdminOnly />
    <Route path="/queues/:id" exact component={QueuesForm} isPrivate isAdminOnly />
    <Route path="/users" exact component={UsersList} isPrivate isAdminOnly />
    <Route path="/users/form" exact component={UsersForm} isPrivate isAdminOnly />
    <Route path="/users/:id" exact component={UsersForm} isPrivate isAdminOnly />
    <Route path="/account" exact component={Account} isPrivate />
  </Switch>
);

export default Routes;
