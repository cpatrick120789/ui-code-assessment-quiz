import React from 'react';
import './Summary.css';
import Button from '../Button/Button';

const summary = (props:any) => {
  return (
    <div className="summary">
      <h3 className="summary__title">SUMMARY</h3>
      <div className="summary__item">
        Correct:
        <span className="summary__result">{props.correct}</span>
      </div>
      <div className="summary__item">
        Wrong:
        <span className="summary__result">{props.incorrect}</span>
      </div>
      <div className="summary__item">
        Questions Answered:
        <span className="summary__result">{props.total}</span>
      </div>
      <div className="summary__item">
        Final Score:
        <span className="summary__result">
          {Math.floor(props.correct/props.total*100)}%
        </span>
      </div>
      <Button
        class={'btn__primary'}
        onClick={props.resetQuiz}
        content={'Restart Quiz'}/>
    </div>
  );
}

export default summary;
