import React, {Component} from "react";
import {
    Link,
    withRouter
} from 'react-router-dom';
import {create, deleteById, game} from "../../../service/GameService";

class EditGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: "",
            description: "",
            questions: [],
            category: "Test Game",
            isPrivate: false,
            isOpen: false,
            isHidden: false,
            startTime: null,
        };

        if (props.location.game) {
            this.state = props.location.game;
        }
    }

    game = () => {
        game().then(value => console.log(value)).catch(error => console.log(error));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        create(this.state).then(value => console.log(value)).catch(error => console.log(error));
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    };

    deleteGameById() {
        deleteById(1).then(value => console.log(value)).catch(error => console.log(error));
    }

    deleteQuestion = (e) => {
        e.preventDefault();
        let questions = this.state.questions;
        questions.pop();
        this.setState({...this.state, questions});
    };

    addQuestion = (e) => {
        e.preventDefault();
        let questions = this.state.questions;
        questions.push({
            position: this.state.questions.length + 1,
            text: "Question " + (this.state.questions.length + 1),
            answers: [{text: "Answer"}],
            hints: [{text: "Hint"}]
        });
        this.setState({...this.state, questions});
    };

    editQuestion(e, index) {
        e.preventDefault()
        let questions = this.state.questions;
        questions[index].text = e.target.value;
        this.setState({...this.state, questions});
    }

    addAnswer(e, index) {
        e.preventDefault();
        let questions = this.state.questions;
        questions[index].answers.push({text: ""});
        this.setState({...this.state, questions});
    }

    deleteAnswer(e, index) {
        e.preventDefault();
        let questions = this.state.questions;
        questions[index].answers.pop();
        this.setState({...this.state, questions});
    }

    editAnswer(e, index, answerIndex) {
        e.preventDefault();
        let questions = this.state.questions;
        questions[index].answers[answerIndex].text = e.target.value;
        this.setState({...this.state, questions});
    }

    addAHint(e, index) {
        e.preventDefault();
        let questions = this.state.questions;
        questions[index].hints.push({text: ""});
        this.setState({...this.state, questions});
    }

    deleteHint(e, index) {
        e.preventDefault();
        let questions = this.state.questions;
        questions[index].hints.pop();
        this.setState({...this.state, questions});
    }

    editHints(e, index, hintIndex) {
        e.preventDefault();
        let questions = this.state.questions;
        questions[index].hints[hintIndex].text = e.target.value;
        this.setState({...this.state, questions});
    }

    render() {
        return <div>
            <div>
                <button onClick={this.game}>getGames</button>
                <button onClick={this.deleteGameById}>deleteGame</button>
                <form onSubmit={this.handleSubmit}>
                    <h1>Создайте свою игру:</h1>
                    <div className="">
                        <div className="container">
                            <div className="row">
                                <div className="col-5">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-5">
                                                <label htmlFor="name">Название</label>
                                            </div>
                                            <div className="col-7">
                                                <input type="text" name="name"
                                                       onChange={(event) => this.handleUserInput(event)}
                                                       defaultValue={this.state.name}
                                                       autoComplete="off"/>
                                            </div>
                                            <div className="col-5">
                                                <label htmlFor="description">Описание</label>
                                            </div>
                                            <div className="col-7">
                                                <input type="text" name="description"
                                                       onChange={(event) => this.handleUserInput(event)}
                                                       defaultValue={this.state.description}
                                                       autoComplete="off"/>
                                            </div>
                                            <div className="col-5">
                                                <label htmlFor="category">Категория</label>
                                            </div>
                                            <div className="col-7">
                                                <input type="text" name="category"
                                                       onChange={(event) => this.handleUserInput(event)}
                                                       defaultValue={this.state.category}
                                                       autoComplete="off"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-7">
                                    {
                                        this.state.questions.map((value, index, array) => {
                                            return <div key={index} className={index % 2 === 0 ? "grey m-2 p-2" : "white m-2 p-2"}>
                                                <div>
                                                    {value.position} :
                                                    <input className="ml-2 question-input" type="text"
                                                           onChange={(event) => this.editQuestion(event, index)}
                                                           defaultValue={value.text}/>
                                                </div>
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div>Ответы</div>
                                                            {value.answers.map((answer, answerIndex) => {
                                                                return <div key={answerIndex}>
                                                                    {answerIndex + 1} :
                                                                    <input type="text"  className="ml-2"
                                                                           onChange={(event) => this.editAnswer(event, index, answerIndex)}
                                                                           defaultValue={answer.text}/>
                                                                </div>
                                                            })}
                                                            <button onClick={(event) => this.deleteAnswer(event, index)}>Удалить ответ</button>
                                                            <button onClick={(event) => this.addAnswer(event, index)}>Добавить ответ</button>
                                                        </div>

                                                        <div className="col-6">
                                                            <div>Подсказки</div>
                                                            {value.hints.map((hint, hintIndex) => {
                                                                return <div key={hintIndex}>
                                                                    {hintIndex + 1} :
                                                                    <input type="text"
                                                                           className="ml-2"
                                                                           onChange={(event) => this.editHints(event, index, hintIndex)}
                                                                           defaultValue={hint.text}/>
                                                                </div>
                                                            })}
                                                            <button onClick={(event) => this.deleteHint(event, index)}>Удалить подск.</button>
                                                            <button onClick={(event) => this.addAHint(event, index)}>Добавить подск.</button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                    <div>
                                        <button onClick={this.addQuestion}>Добавить вопрос</button>
                                    </div>
                                    <div>
                                        <button onClick={this.deleteQuestion}>Удалить вопрос</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <button type="submit" className="">
                                    Сохранить
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    }
}

export default withRouter(EditGame)