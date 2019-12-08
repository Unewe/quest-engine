import React, {Component} from "react";
import {
    Link,
    withRouter
} from 'react-router-dom';
import {answerQuestion, getQuestion} from "../../../service/GameActionService";

class GameAction extends Component{

    constructor(props) {
        super(props);
        this.state = {
            question: {text: ""},
            answer: "",
            gameId: props.match.params.id
        }

        getQuestion(props.match.params.id).then(value => {
            this.setState({question: {text: value.message}})
        }).catch(error => console.log(error));
    }

    handleUserInput = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    submit = (e) => {
        e.preventDefault();
        answerQuestion(this.state.answer, this.state.gameId).then(value => {
            console.log(value)
            this.setState({question: {text: value.message}})
        }).catch(reason => console.log(reason));
    }

    render() {
        return <div>
            {this.state.question.text}
            <form onSubmit={this.submit}>
                <input type="text" name="answer" onChange={this.handleUserInput}/>
                <button onSubmit={this.submit}>Ok</button>
            </form>
        </div>
    }
}

export default withRouter(GameAction)