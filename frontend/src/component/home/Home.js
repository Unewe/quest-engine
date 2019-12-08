import React, {Component} from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './Home.css';
import {gamesCount} from "../../service/GameService";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {gamesCount: ""};
        gamesCount().then(value => this.setState({gamesCount: value})).catch(error => console.log(error));
    }

    render() {
        return <div className='container app-home'>
            <div className='row'>
                <div className='col'><h1>Создай свой квест!</h1></div>
            </div>
            <div className='row'>
                <div className='col-12'>Вы можете создать уникальную игру на день рождения,
                    корпоратив или просто в обычный день, закрытую (доступную только для друзей)
                    или публичную. Это просто! <span className='ml-2'><Link to="/game/edit">Создать игру</Link></span></div>
            </div>
            <div className='row'>
                <div className='col-6'></div>
                <div className='col-6 games-created text-right'>Создано <span>{this.state.gamesCount}</span> игр</div>
            </div>
        </div>
    }
}

export default withRouter(Home)