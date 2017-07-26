export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SIGN_OUT = 'SIGN_OUT';

export function loginSuccess(success = false, xAuth, email, role, id) {
  // loginSuccess is an ActionCreator, it needs
  // to return an action, an object with a 'type' property

  return {
    type: LOGIN_SUCCESS,
    payload: {
      success,
      email,
      xAuth,
      role,
      id
    }
  };
}


export function signOut(success = false, xAuth) {
  // signOut is an ActionCreator, it needs
  // to return an action, an object with a 'type' property

  return {
    type: SIGN_OUT,
    payload: {
      success: false,
      xAuth
    }
  };
}
