import * as React from 'react';
import './styles.css';
import { shuffleArray } from './utils';
/* Components */
import QuestionCard from './components/QuestionCard/QuestionCard';
import Summary from './components/Summary/Summary';
import Button from './components/Button/Button';

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

  focusElement = React.createRef<any>();

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

  /* Reset state before start a new Quiz */
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

  /* Set random current question */
  setCurrentQuestion = () => {
    let questionsList = this.state.questions;
    let index = Math.floor(Math.random()*questionsList.length);
    this.currentQuestion = questionsList[index];
    /* Randomize answers for multiple || boolean question type*/
    if(this.currentQuestion.type === 'multiple' 
      || this.currentQuestion.type === 'boolean') {
      let answers = [...this.currentQuestion.incorrect_answers, 
                    this.currentQuestion.correct_answer];
      shuffleArray(answers);
      this.currentQuestion.answers = answers;
    }
  };

  /* User answer selection handler*/
  selectedAnswerHandler = (e: any) => {
    this.setState({ userAnswer: e.target.value });
  };

  /* User click 'Next' button handler*/
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
    this.setFocus();
  };

  /* Explicitly set focus */
  setFocus = () => {
    this.focusElement.current.focus();
  }

  render() {
    return (
      <div className="app__container" >
        <h1 className="app__title">Lucid</h1>
        <h2 className="app__subtitle">Welcome to UI Team code assessment!</h2>
        {this.state.quizOver && 
          <Button
          class={'btn__secondary'}
          onClick={this.startQuiz}
          content={'Start Quiz'}/>
        }
        {!this.state.quizOver &&
          (this.state.totalAnswered < TOTAL_QUESTIONS 
            ?<QuestionCard 
            question={this.currentQuestion} 
            answers ={this.currentQuestion.answers}
            userAnswer={this.state.userAnswer}
            selectedAnswerHandler={this.selectedAnswerHandler}
            nextHandler={this.nextHandler}
            refElem={this.focusElement}/>
            :<Summary
            total={this.state.totalAnswered}
            correct={this.state.correct}
            incorrect={this.state.incorrect}
            resetQuiz={this.resetQuiz}
            refElem={this.focusElement}/>)
        }
      </div>
    );
    
  }
}

