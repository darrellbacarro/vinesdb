import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Admin from './pages/admin';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './redux/store';
import Results from './pages/search/results';
import VineDetails from './pages/admin/VineDetails';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <HashRouter>
        <Switch>
          <Route path="/home" component={App} />
          <Route path="/admin" component={Admin} />
          <Route path="/search/:keyword" component={Results} />
          <Route path="/vine/:id" component={VineDetails} />
        </Switch>
      </HashRouter>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
