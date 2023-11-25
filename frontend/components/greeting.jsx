import React from 'react';
import {
    Link
  } from 'react-router-dom';
import {Button, Container} from 'react-bootstrap'

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
                

                <div fluid className="hero-section jumbotron">
                    <div className="overlay"></div>
                    <Container className="text-container">
                        <h1 className="animated-text-header">Budget Manager</h1>
                        <p className="animated-text-p">Manage your budget, on a budget (it's free).</p>

                        {!JSON.parse(localStorage.getItem('loggedInUser')) ?
                            <Button style={{color: 'white'}} className='get-started-button'>
                                <Link style={{color: 'white'}} to="/login">Get Started</Link>
                            </Button>
                        :
                        ""}
                        
                    </Container>
                </div>
                
                {this.currentUserHeading()}
            </div>
        )
    }
}

export default Greeting;