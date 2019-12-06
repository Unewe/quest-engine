import React, {Component} from "react";
import {
    Link,
    withRouter
} from 'react-router-dom';
import {game} from "../../../service/GameService";

class GameList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };

        game().then(value => this.setState({list: value})).catch(error => console.log(error));
    }

    render() {
        return <div>
            <h1>Список игр</h1>
            {this.state.list.map((value, index, array) => {
                return <div key={index}>
                    <Link to={{pathname: "/game/edit", game: value}}>{value.name}</Link>
                </div>
            })}
        </div>
    }
}

export default withRouter(GameList);