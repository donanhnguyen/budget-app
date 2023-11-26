import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter,
    withRouter
  } from 'react-router-dom';

  class Nav extends React.Component {

    constructor(props){
        super(props);
    }

    logout () {
        localStorage.removeItem('loggedInUser');
        this.props.logout();
        this.props.history.push('/');
    }

    render () {
    
        if (this.props.currentUser || JSON.parse(localStorage.getItem('loggedInUser'))) {
            return (
                    <div class="nav-bar-container"> 

                            <ul class="nav-bar-list left">
                                <li><Link class={'nav-link nav-link-hover'} to="/"><img className='home-icon' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-XfbqWIIBSh-7TrZOJZFwAhmn_3_-2rLlgg&usqp=CAU"></img></Link></li>
                                <li> <Link class={'nav-link nav-link-hover'} to="/your_budgets">Budget Manager</Link></li>        
                            </ul>
                            
                            <ul class="nav-bar-list right">
                                <li>
                                    <button class={'logout-button'} onClick={this.logout.bind(this)}>Logout</button>
                                </li>
                            </ul>

                        <div class="clearfix"></div>
                    </div>
            )
        } else {
            return (
                    <div class="nav-bar-container">
                
                            <ul class="nav-bar-list left">
                                <li> <Link class={'nav-link nav-link-hover'} to="/"><img className='home-icon' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-XfbqWIIBSh-7TrZOJZFwAhmn_3_-2rLlgg&usqp=CAU"></img></Link> </li>
                                <li> <Link class={'nav-link nav-link-hover'} to="/login">Get Started</Link></li>   
                            </ul>

                             <ul class="nav-bar-list right">
                                <li>
                                    <Link class={'nav-link nav-link-hover'} to="/login">LogIn</Link>
                                </li>
                                <li>
                                    <Link class={'nav-link nav-link-hover'} to="/signup">SignUp</Link>
                                </li>
                            </ul>
                
                        <div class="clearfix"></div>
                    </div>
            )
        }
        //end of render method
    }

  }
 
  export default withRouter(Nav);