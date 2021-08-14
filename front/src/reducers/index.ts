import { combineReducers } from 'redux';

import { global } from './global';
import { auth } from './auth';
import { snackbars } from './snackbars';
import { users } from './users';

export default combineReducers({
  global,
  auth,
  snackbars,
  users,
});
