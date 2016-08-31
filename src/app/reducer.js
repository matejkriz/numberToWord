import { combineReducers } from 'redux';
import { reducer as router } from 'react-native-router-redux';

import config from '../config/reducer';
import device from '../device/reducer';
import t9 from '../t9/reducer';

const appReducer = combineReducers({
  config,
  device,
  router,
  t9,
});

export default appReducer;
