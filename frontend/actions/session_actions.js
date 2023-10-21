import * as APIUtil from '../util/session_api_util';
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveCurrentUser = (currentUser) => ({
    type: RECEIVE_CURRENT_USER,
    currentUser: currentUser
});

export const receiveErrors = (errors) => ({
    type: RECEIVE_ERRORS,
    errors: errors
});

export const login = (user) => {
    return function (dispatch) {
        APIUtil.login(user).then(loggedinuser => {
            
            localStorage.setItem('loggedInUser', JSON.stringify(loggedinuser));
            dispatch(receiveCurrentUser(JSON.parse(localStorage.getItem('loggedInUser'))) )
          }, err => (
            dispatch(receiveErrors(err.responseJSON))
          ))
    }
};

export const signup = user => dispatch => (
    APIUtil.signup(user).then(user => {
      dispatch(receiveCurrentUser(user))
      localStorage.setItem('loggedInUser', JSON.stringify(user));
    }, err => (
      dispatch(receiveErrors(err.responseJSON))
    ))
);

export const logout = () => {
    return function (dispatch) {
        APIUtil.logout().then(user => {
            dispatch(receiveCurrentUser(null))
            localStorage.removeItem('loggedInUser');
        })
    }
};

