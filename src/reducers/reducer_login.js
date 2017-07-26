import { LOGIN_SUCCESS,
         SIGN_OUT
      } from '../actions';
const defaultStatus = {
  success: false,
  xAuth: 'default'
};

export default function (state = defaultStatus, action) {
  if (action) {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return action.payload;
      case SIGN_OUT:
        return action.payload;
      default:
        return state;
    }
  }
  return state;
}
