import React from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
  } from 'react-router-dom';

class Greeting extends React.Component {

    constructor(props) {
        super(props);
    }

    currentUserHeading () {
        if (this.props.currentUser || JSON.parse(localStorage.getItem('loggedInUser'))) {
            return <h1 class="greeting-logged-in">You are logged in as: {this.props.currentUser? this.props.currentUser.username : JSON.parse(localStorage.getItem('loggedInUser')).username}</h1>
        } else {
            return <h1 class="greeting-logged-in">You are not currently logged in. Click <Link to="/login">Here</Link> to login or <Link to="/signup">Here</Link> to sign up.</h1>
        }
    }

    render () {
        return (
            <div>
                {this.currentUserHeading()}
                <div class="greeting-container">
                    <h1>Budget App</h1>
                    <p>Manage your budget... on a budget (It's free)</p>
                </div>
            </div>
        )
    }
}

export default Greeting;