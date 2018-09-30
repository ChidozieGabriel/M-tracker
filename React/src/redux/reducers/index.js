import { combineReducers } from 'redux';
import userReducer from './userReducer';
import requestReducer from './requestReducer';

const rootReducer = combineReducers({
  user: userReducer,
  request: requestReducer,
});

export default rootReducer;
