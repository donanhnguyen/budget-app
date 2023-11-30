import {RECEIVE_CURRENT_USER, RECEIVE_ERRORS, CLEAR_ERRORS} from '../actions/session_actions';
import merge from 'lodash/merge';

const nullUser = Object.freeze({
    currentUser: null,
    errors: []
  });

const sessionReducer = (state = nullUser, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            const currentUser = action.currentUser;
            const newState = merge({}, state, {currentUser: currentUser});
            return newState;
        case RECEIVE_ERRORS:
            const errors = action.errors;
            return merge({}, state, {errors: errors})
        case CLEAR_ERRORS:
            return {...state, errors: []}
        default:
            return state;
    }

};

export default sessionReducer;