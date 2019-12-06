import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';
import { getCurrentUser } from '../src/service/SecurityService';
import { ACCESS_TOKEN } from '../src/constant';
import AppHeader from '../src/component/header/AppHeader'
import Login from "./component/security/login/Login";
import Signup from "./component/security/signup/Signup";
import  'bootstrap-4-grid';
import Home from "./component/home/Home";
import NewGame from "./component/game/edit/EditGame";
import PrivateRoute from "./service/PrivateRoute";
import GameList from "./component/game/list/GameList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: null,
      isLoading: null
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  loadCurrentUser() {
    //Когда будет добавлена загрузка
    // this.setState({
    //   isLoading: true
    // });
    getCurrentUser()
        .then(response => {
          this.setState({
            currentUser: response,
            isAuthenticated: true,
            isLoading: false
          });
        }).catch(error => {
      this.setState({
        currentUser: null,
        isAuthenticated: false,
        isLoading: false
      });
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
  }

  handleLogin() {
    this.loadCurrentUser();
    this.props.history.push("/");
  }

  render() {
    let content;
    if(this.state.isLoading) {
      content = <div><h1>Loading</h1></div>
    } else {
      content =
          <div className="container">
            <Switch>
              <Route exact path="/" render={(props) => <Home />} />
              <Route path="/login" render={(props) => <Login onLogin={this.handleLogin} {...props} />} />
              <Route path="/signup" component={Signup} />
              <PrivateRoute authenticated={this.state.isAuthenticated}  path="/game/edit" component={NewGame}/>
              <PrivateRoute authenticated={this.state.isAuthenticated}  path="/game/list" component={GameList}/>
            </Switch>
          </div>
    }
    return (
        <div className="app-container">
          <AppHeader isAuthenticated={this.state.isAuthenticated}
                     currentUser={this.state.currentUser}
                     onLogout={this.handleLogout} />

          <div className="app-content">
            {content}
          </div>
        </div>
    );
  }
}

export default withRouter(App);
