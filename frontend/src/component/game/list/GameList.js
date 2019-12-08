import React, {Component} from "react";
import {
    Route,
    Link,
    withRouter
} from 'react-router-dom';
import {game} from "../../../service/GameService";
import {startGame} from "../../../service/GameActionService";

class GameList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };

        game().then(value => this.setState({list: value})).catch(error => console.log(error));
    }

    playGame(id) {
        startGame(id).then(value => {
            this.props.history.push(`/game/action/${id}`);
        }).catch(reason => console.log(reason));
    }

    render() {
        return <div>
            <h1>Список игр</h1>
            {this.state.list.map((value, index, array) => {
                return <div key={index}>
                    <Link to={{pathname: "/game/edit", game: value}}>{value.name}</Link>
                    <button onClick={() => this.playGame(value.id)}>Играть</button>
                </div>
            })}
        </div>
    }
}

export default withRouter(GameList);