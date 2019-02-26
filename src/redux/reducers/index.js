import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import vines from './vines';

export default (history) => combineReducers({
  router: connectRouter(history),
  vines
});