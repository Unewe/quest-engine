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
        if (key === "logout") {
            this.props.onLogout();
        }
    }

    render() {
        let menuItems;
        if (this.props.currentUser) {
            menuItems = [
                <div>
                    <Link to="/">Home</Link>
                </div>,
                <div>
                    <Link to="/game/list">List</Link>
                </div>
            ];
        } else {
            menuItems = [
                <div>
                    <Link to="/login">Login</Link>
                </div>,
                <div>
                    <Link to="/signup">Signup</Link>
                </div>
            ];
        }

        return (
            <div className="app-header">
                <div className="container">
                    <div className="app-title">
                        <Link to="/">Quest-engine</Link>
                    </div>
                    <div
                        className="app-menu"
                        style={{lineHeight: '64px'}}>
                        {menuItems}
                    </div>
                </div>
            </div>
        );
    }
}

// function ProfileDropdownMenu(props) {
//     const dropdownMenu = (
//         <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
//             <Menu.Item key="user-info" className="dropdown-item" disabled>
//                 <div className="user-full-name-info">
//                     {props.currentUser.name}
//                 </div>
//                 <div className="username-info">
//                     @{props.currentUser.username}
//                 </div>
//             </Menu.Item>
//             <Menu.Divider />
//             <Menu.Item key="profile" className="dropdown-item">
//                 <Link to={`/users/${props.currentUser.username}`}>Profile</Link>
//             </Menu.Item>
//             <Menu.Item key="logout" className="dropdown-item">
//                 Logout
//             </Menu.Item>
//         </Menu>
//     );
//
//     return (
//         <Dropdown
//             overlay={dropdownMenu}
//             trigger={['click']}
//             getPopupContainer = { () => document.getElementsByClassName('profile-menu')[0]}>
//             <a className="ant-dropdown-link">
//                 <Icon type="user" className="nav-icon" style={{marginRight: 0}} /> <Icon type="down" />
//             </a>
//         </Dropdown>
//     );
// }

export default withRouter(AppHeader);