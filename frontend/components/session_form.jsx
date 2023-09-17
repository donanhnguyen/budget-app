import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

function SessionForm(props) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const { password, confirmPassword, username } = formData;
        if (props.formType === "signup") {
            if (password === confirmPassword) {
                var user = {username: username, password: password};
                props.processForm(user);
            } else {
                setError('Passwords do not match');
                setFormData((prevState) => {
                    return {...prevState, confirmPassword: '' } 
                });
            }
        } else {
            var user = {username: username, password: password}
            props.processForm(user);
        }
        
    };

    const navLink = () => {
        if (props.formType === 'login') {
            return (
                <Link className="nav-link session-link-hover" to="/signup">
                    sign up instead
                </Link>
            );
        } else {
            return (
                <Link className="nav-link session-link-hover" to="/login">
                    log in instead
                </Link>
            );
        }
    };

    const handleInputChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.currentTarget.value,
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const renderErrors = () => {
        if (props.errors.length > 0) {
            return (
                <ul>
                    {props.errors.map((error, i) => (
                        <li className="error-message" key={`error-${i}`}>
                            {error}
                        </li>
                    ))}
                    <br />
                </ul>
            );
        }
    };

    return (
        <div className="session-form-container session-form-background">
            <div className="session-form">
                <h1>
                    {props.formType} or {navLink()}
                </h1>

                {error && <div className="error-message">{error}</div>}

                {renderErrors()}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={formData.username}
                            onChange={handleInputChange('username')}
                            onKeyDown={handleKeyPress}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange('password')}
                            onKeyDown={handleKeyPress}
                        />
                    </div>

                    {props.formType === "signup" ?
                    
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange('confirmPassword')}
                                onKeyDown={handleKeyPress}
                            />
                        </div>

                        : ""
                
                    }

                    <div className="form-group">
                        <input
                            className="session-submit-button"
                            type="submit"
                            value="Submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default withRouter(SessionForm);
