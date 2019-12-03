import React, {Component} from "react";
import {
    Link,
    withRouter
} from 'react-router-dom';

class NewGame extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return <div><h1>Новая игра</h1></div>
    }
}

export default withRouter(NewGame)