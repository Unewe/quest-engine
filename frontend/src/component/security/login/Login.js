import React, {Component} from 'react';
import {login} from '../../../service/SecurityService';
import './Login.css';
import {Link} from 'react-router-dom';
import {ACCESS_TOKEN} from '../../../constant/index';

class Login extends Component {
    render() {
        return (
            <div className="login-container">
                <h1 className="page-title">Login</h1>
                <div className="login-content">
                    <LoginForm onLogin={this.props.onLogin} />
                </div>
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameOrEmail: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        login(this.state)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                this.props.onLogin();
            }).catch(error => {
            if (error.status === 401) {
                console.log("401")
            } else {
                console.log("Error")
            }
        });

    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    };

    render() {

        return (
            <div>
                <form className="demoForm" onSubmit={this.handleSubmit}>
                    <h2>Sign up</h2>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="text" className="form-control"
                               name="usernameOrEmail" onChange={this.handleUserInput}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control"
                               name="password" onChange={this.handleUserInput}/>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Sign up
                    </button>
                </form>
            </div>
        );
    }
}


export default Login;