import * as React from 'react';
import './styles.css';
import { shuffleArray } from './utils';
import QuestionCard from '../client/components/QuestionCard/QuestionCard';
import Summary from '../client/components/Summary/Summary';

const TOTAL_QUESTIONS = 10;

interface IQuestion {
  category: string,
  type: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[],
  answers: string[];
}

export class App extends React.Component {
  state = {
    questions: [],
    userAnswer: '',
    totalAnswered: 0,
    correct: 0,
    incorrect: 0,
    quizOver: true
  }
  currentQuestion: IQuestion = {
    category: '',
    type: '',
    question: '',
    correct_answer: '',
    incorrect_answers: [],
    answers: []
  };

  componentDidMount() {
    fetch('http://localhost:4000/api/questions')
      .then(resp => resp.json())
      .then(data => {
        let questions = data.results;
        shuffleArray(questions);
        this.setState({ questions: questions });
      })
  }

  startQuiz = () => {
    this.setState({ quizOver: false});
    this.setCurrentQuestion();
  };

  resetQuiz = () => {
    this.setState({
      userAnswer: null,
      totalAnswered: 0,
      correct: 0,
      incorrect: 0,
      quizOver: true,
      asquedQuestions: []
    });
  };

  setCurrentQuestion = () => {
    let questionsList = this.state.questions;
    let index = Math.floor(Math.random()*questionsList.length);
    this.currentQuestion = questionsList[index];

    if(this.currentQuestion.type === 'multiple' 
      || this.currentQuestion.type === 'boolean') {
      let answers = [...this.currentQuestion.incorrect_answers, 
                    this.currentQuestion.correct_answer];
      shuffleArray(answers);
      this.currentQuestion.answers = answers;
    }
  };

  selectedAnswerHandler = (e: any) => {
    this.setState({ userAnswer: e.target.value });
  };

  nextHandler = () => {
    if(this.currentQuestion.correct_answer === this.state.userAnswer ) {
      this.setState({
        correct: this.state.correct + 1,
        totalAnswered: this.state.totalAnswered + 1,
        userAnswer: ''
      });
    } else {
      this.setState({
        incorrect: this.state.incorrect + 1,
        totalAnswered: this.state.totalAnswered + 1,
        userAnswer: ''
      });
    }
    this.setCurrentQuestion();
  };

  render() {
    return (
      <div className="app__container">
        <h1 className="app__title">Lucid</h1>
        <h2 className="app__subtitle">Welcome to UI Team code assessment!</h2>
        {this.state.quizOver && 
          <button className="btn btn__primary" onClick={this.startQuiz}>
            Start Quiz
          </button>
        }
        {!this.state.quizOver &&
          (this.state.totalAnswered < TOTAL_QUESTIONS 
            ?<QuestionCard 
            question={this.currentQuestion} 
            answers ={this.currentQuestion.answers}
            userAnswer={this.state.userAnswer}
            selectedAnswerHandler={this.selectedAnswerHandler}
            nextHandler={this.nextHandler}/>
            :<Summary
            total={this.state.totalAnswered}
            correct={this.state.correct}
            incorrect={this.state.incorrect}
            resetQuiz={this.resetQuiz}/>)
        }
      </div>
    );
  }
}

