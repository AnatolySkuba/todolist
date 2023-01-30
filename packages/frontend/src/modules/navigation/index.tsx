import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePageContainer from '../home';
import { RegisterPageContainer } from '../user/containers/register-page';
import { LoginPageContainer } from '../user/containers/login-page';
import { TodoListPageContainer } from '../todo/containers/todo-list-page';
import { ProfilePageContainer } from '../user/containers/profile-page/profile-page.container';
import { TodoPageContainer } from '../todo/containers/todo-page/todo-page.container';
import { APP_KEYS } from '../common/consts';

export const MainRouter = () => (
  <Router>
    <Switch>
      <Route component={RegisterPageContainer} path={APP_KEYS.ROUTER_KEYS.REGISTER} />
      <Route component={LoginPageContainer} path={APP_KEYS.ROUTER_KEYS.LOGIN} />
      <Route component={TodoListPageContainer} path={APP_KEYS.ROUTER_KEYS.TODO_LIST} />
      <Route component={ProfilePageContainer} path={APP_KEYS.ROUTER_KEYS.PROFILE} />
      <Route component={TodoPageContainer} path={`${APP_KEYS.ROUTER_KEYS.TODO}/:id`} />
      <Route component={HomePageContainer} path={APP_KEYS.ROUTER_KEYS.ROOT} />
    </Switch>
  </Router>
);
