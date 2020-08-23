import React from 'react';
import './QuestionCard.css';
import Button from '../Button/Button';

const questionCard = (props: any) => {
  return(
    <div className="questionCard">
      <h3 className="questionCard__title" 
      dangerouslySetInnerHTML={{ __html: props.question.question }} />
      { (props.question.type === 'multiple' 
      || props.question.type === 'boolean') 
      && (props.answers.map((option: any, id: any) => {
          return(
            <div className="questionCard__item--radio" key={id}>
              <label>
                <input
                  type="radio"
                  name="multiple"
                  value={option}
                  checked={props.userAnswer === option}
                  onChange={props.selectedAnswerHandler}/>
                <span dangerouslySetInnerHTML={{ __html: option }}></span>
              </label>
            </div>
          );
      }))}
      {props.question.type === 'text' && 
        <input 
          className="questionCard__item--text" 
          type="text" 
          value={props.userAnswer}
          onChange={props.selectedAnswerHandler}/>}
      <Button
        class={'btn__primary'}
        disabled={props.userAnswer ? false : true}
        onClick={props.nextHandler}
        content={'Next'}/>
    </div>
  );
};

export default questionCard;
