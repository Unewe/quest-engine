import React, { Component } from 'react';
import { signup, checkUsernameAvailability, checkEmailAvailability } from '../../../service/SecurityService';
import './Signup.css';
import { Link } from 'react-router-dom';
import {
    NAME_MIN_LENGTH, NAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../../../constant/index';
import {validateLength, validateEmail, validatePassword} from '../../../service/ValidationService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            username: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            },
            repeatPassword: {
                value: ''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleInputChange(event, func) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...func(inputValue)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const signupRequest = {
            name: this.state.name.value,
            email: this.state.email.value,
            username: this.state.username.value,
            password: this.state.password.value
        };

        signup(signupRequest)
            .then(response => {
                this.props.history.push("/login");
            }).catch(error => {
        });
    }

    isFormInvalid() {
        return !(this.state.name.status === 'success' &&
            this.state.username.status === 'success' &&
            this.state.email.status === 'success' &&
            this.state.password.status === 'success' &&
            this.state.repeatPassword.status === 'success'
        );
    }

    handleUserInput = (e, f) => {
        let validation = f(e.target.value);
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: {...this.state[name], value, ...validation}});
    };

    render() {

        const success = <span className="form-conclusion"><div className="green"><FontAwesomeIcon icon={faCheckCircle} /></div></span>
        const error = <span className="form-conclusion"><div className="red"><FontAwesomeIcon icon={faExclamationCircle} /></div></span>

        return (
            <div className="login-container">
                <form onSubmit={this.handleSubmit}>
                    <h1>Регистрация</h1>
                    <div className="un-form-group">
                        <div className="container p-1">
                            <div className="row m-2">
                                <div className="col-5 pt-2">
                                    <label htmlFor="name">Имя</label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control"
                                           name="name"
                                           onChange={(event) => this.handleUserInput(event,
                                                   validateLength(NAME_MIN_LENGTH, NAME_MAX_LENGTH))}
                                           onBlur={(event) => this.blurFunction(event)}
                                           autoComplete="off"/>
                                    {this.state.name.conclusion === 'success'? success : this.state.name.conclusion === 'error' ? error : ""}
                                </div>
                            </div>
                            <div className="row m-2">
                                <div className="col-5 pt-2">
                                    <label htmlFor="username">Логин</label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control"
                                           name="username" onChange={(event) =>
                                        this.handleUserInput(event,
                                            validateLength(USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH))}
                                            onBlur={(event) => this.blurFunction(event)}
                                           autoComplete="off"/>
                                    {this.state.username.conclusion === 'success'? success : this.state.username.conclusion === 'error' ? error : ""}
                                </div>
                            </div>
                            <div className="row m-2">
                                <div className="col-5 pt-2">
                                    <label htmlFor="email">Почта</label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control"
                                           name="email"
                                           onChange={(event) => this.handleUserInput(event, validateEmail)}
                                           onBlur={(event) => this.blurFunction(event)}
                                           autoComplete="off"/>
                                    {this.state.email.conclusion === 'success'? success : this.state.email.conclusion === 'error' ? error : ""}
                                </div>
                            </div>
                            <div className="row m-2">
                                <div className="col-5 pt-2">
                                    <label htmlFor="password">Пароль</label>
                                </div>
                                <div className="col-7">
                                    <input type="password" className="form-control"
                                           name="password"
                                           onChange={(event) => this.handleUserInput(event,
                                                validateLength(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH))}
                                           onBlur={(event) => this.blurFunction(event)}
                                           autoComplete="off"/>
                                    {this.state.password.conclusion === 'success'? success : this.state.password.conclusion === 'error' ? error : ""}
                                </div>
                            </div>
                            <div className="row m-2">
                                <div className="col-5 pt-2">
                                    <label htmlFor="password">Пароль еще раз</label>
                                </div>
                                <div className="col-7">
                                    <input type="password" className="form-control"
                                           name="repeatPassword"
                                           onChange={(event) => this.handleUserInput(event,
                                               validatePassword(this.state.password.value))}
                                           onBlur={(event) => this.blurFunction(event)}
                                           autoComplete="off"/>
                                    {this.state.repeatPassword.conclusion === 'success'? success : this.state.repeatPassword.conclusion === 'error' ? error : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container p-1">
                        <div className="row m-2">
                            <div className="col-7 offset-5">
                                <button type="submit" className="un-button" disabled={this.isFormInvalid()}>
                                    Регистрация
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    // Validation Functions

    blurFunction = (e) => {
        let conclusion = this.state[e.target.name].status;
        this.setState({
            [e.target.name]: {
                ...this.state[e.target.name],
                conclusion
            }
        });
    }

    validateUsernameAvailability() {
        // First check for client side errors in username
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);

        if(usernameValidation.validateStatus === 'error') {
            this.setState({
                username: {
                    value: usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }

        checkUsernameAvailability(usernameValue)
            .then(response => {
                if(response.available) {
                    this.setState({
                        username: {
                            value: usernameValue,
                            validateStatus: 'success',
                            errorMsg: null
                        }
                    });
                } else {
                    this.setState({
                        username: {
                            value: usernameValue,
                            validateStatus: 'error',
                            errorMsg: 'This username is already taken'
                        }
                    });
                }
            }).catch(error => {
            // Marking validateStatus as success, Form will be rechecked at server
            this.setState({
                username: {
                    value: usernameValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validateEmailAvailability() {
        // First check for client side errors in email
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if(emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });
            return;
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkEmailAvailability(emailValue)
            .then(response => {
                if(response.available) {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'success',
                            errorMsg: null
                        }
                    });
                } else {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'error',
                            errorMsg: 'This Email is already registered'
                        }
                    });
                }
            }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }
}

export default Signup;