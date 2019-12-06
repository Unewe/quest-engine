import React, {Component} from "react";
import {
    Link,
    withRouter
} from 'react-router-dom';
import {create, game} from "../../../service/GameService";

class NewGame extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id:null,
            name:"",
            description:"",
            questions:[],
            category:"Test Game",
            isPrivate:false,
            isOpen: false,
            isHidden: false,
            startTime: null,
        }
    }

    game = () => {
        game().then(value => console.log(value)).catch(error => console.log(error));

    }

    create = () => {
        create().then(value => console.log(value)).catch(error => console.log(error));
    }

    render() {
        return <div>
            <h1>Новая игра</h1>
            <div>
                <button  onClick={this.game}>getGame</button>
                <button onClick={this.create}>createGame</button>
            </div>
        </div>
    }
}

export default withRouter(NewGame)