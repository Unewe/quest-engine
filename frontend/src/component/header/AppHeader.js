import React, {Component} from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppHeader.css';

class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick({key}) {
        this.props.onLogout();
    }

    render() {
        let menuItems;
        let currentUser = this.props.currentUser;
        if (this.props.currentUser) {
            menuItems = [
                <div key="0" className="mr-5">
                    <Link to="/">Home</Link>
                </div>,
                <div key="1" className="mr-5">
                    <Link to="/game/list">List</Link>
                </div>
            ];
        } else {
            menuItems = [
                <div key="0" className="mr-5">
                    <Link to="/login">Login</Link>
                </div>,
                <div key="1" className="mr-5">
                    <Link to="/signup">Signup</Link>
                </div>
            ];
        }

        return (
            <div className="app-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3 text-center">
                            <Link to="/">Quest-engine</Link>
                        </div>
                        <div className="col-7 d-flex">
                            {menuItems}
                        </div>
                        <div className="col-2 text-center h-item">
                            <span onClick={this.handleMenuClick}>{this.props.currentUser ? this.props.currentUser.name : ""}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AppHeader);