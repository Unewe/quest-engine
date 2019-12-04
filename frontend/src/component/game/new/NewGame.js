import React, {Component} from "react";
import {
    Link,
    withRouter
} from 'react-router-dom';
import {game} from "../../../service/GameService";

class NewGame extends Component{
    constructor(props) {
        super(props);
    }

    game = () => {
        game().then(value => console.log(value)).catch(error => console.log(error));

    }

    render() {
        return <div onClick={this.game}><h1>Новая игра</h1></div>
    }
}

export default withRouter(NewGame)