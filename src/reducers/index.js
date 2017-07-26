import { combineReducers } from 'redux';
import LoginReducer from '../reducers/reducer_login';
const appReducer = combineReducers({
  loginState: LoginReducer
});
// To reset redux state after sign-out
// reference: https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
const rootReducer = (state, action) => {
  if (action.type === 'SIGN_OUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;
