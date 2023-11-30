import {connect} from 'react-redux';
import { login, signup } from '../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state, ownProps) => ({
    loggedIn: state.session.currentUser ? true : false,
    errors: state.session.errors, 
    formType: ownProps.location.pathname === 'login' ? 'login' : 'signup'
});

const mapDispatchToProps = (dispatch, ownProps) => {

    const formType = ownProps.location.pathname.slice(1);
    const option = (formType === 'login') ? login : signup;

    return {
        processForm: (user) => dispatch(option(user)),
        formType: formType
    }
}

const SessionFormContainer = connect(mapStateToProps, mapDispatchToProps)(SessionForm);

export default SessionFormContainer;
