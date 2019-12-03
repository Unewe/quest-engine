import React, {Component} from 'react';
import {login} from '../../../service/SecurityService';
import './Login.css';
import {Link} from 'react-router-dom';
import {ACCESS_TOKEN} from '../../../constant/index';

class Login extends Component {
    render() {
        return (
            <div className="login-container">
                <LoginForm onLogin={this.props.onLogin} />
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
                <form onSubmit={this.handleSubmit}>
                    <h1>Авторизация</h1>
                    <div className="un-form-group">
                        <div className="container p-1">
                            <div className="row m-2">
                                <div className="col-5 pt-2">
                                    <label htmlFor="email">Почта / Логин</label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control"
                                           name="usernameOrEmail" onChange={this.handleUserInput}/>
                                </div>
                            </div>
                            <div className="row m-2">
                                <div className="col-5  pt-2">
                                    <label htmlFor="password">Пароль</label>
                                </div>
                                <div className="col-7">
                                    <input type="password" className="form-control"
                                           name="password" onChange={this.handleUserInput}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container p-1">
                        <div className="row m-2">
                            <div className="col-7 offset-5">
                                <button type="submit" className="un-button">
                                    Войти
                                </button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        );
    }
}


export default Login;