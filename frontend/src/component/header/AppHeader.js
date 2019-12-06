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
                    <Link to="/">Главная</Link>
                </div>,
                <div key="1" className="mr-5">
                    <Link to="/game/edit">Новая игра</Link>
                </div>,
                <div key="2" className="mr-5">
                    <Link to="/game/list">Играть</Link>
                </div>
            ];
        } else {
            menuItems = [
                <div key="0" className="mr-5">
                    <Link to="/login">Войти</Link>
                </div>,
                <div key="1" className="mr-5">
                    <Link to="/signup">Зарегистрироваться</Link>
                </div>
            ];
        }

        return (
            <div className="app-header">
                <div className="container-fluid">
                    <div className="row d-none d-md-flex">
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
                    {/*Телефоны планшеты*/}
                    <div className="row d-sm-block d-md-none d-lg-none d-xl-none">
                        <div className="col-8">
                            <Link to="/">Quest-engine</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AppHeader);