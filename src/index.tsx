import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Switch } from 'react-router-dom';
import history from './history';
import * as serviceWorker from './serviceWorker';
import Home from './components/pages/home/home.container';
import App from './app';
import './assets/styles/index.scss';
import UserListContainer from './components/pages/user/user-list/user-list.container';
import UserDetailContainer from './components/pages/user/user-detail/user-detail.container';

ReactDOM.render(
  <App>
    <React.StrictMode>
      <Router history={history}>
        <Switch>
          <Route path="/users" component={UserListContainer} exact />
          <Route path="/users/:id" component={UserDetailContainer} exact />
          <Route component={Home} />
        </Switch>
      </Router>
    </React.StrictMode>
  </App>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
