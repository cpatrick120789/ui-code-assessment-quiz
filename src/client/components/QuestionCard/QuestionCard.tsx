import React from 'react';
import './QuestionCard.css';
import Button from '../Button/Button';

/**
 Render question base on the question 'type'
 @props question, answers, userAnswer,
        selectedAnswerHandler, nextHandler,
        ref: Store a reference to the element DOM to set focus
 */
const questionCard = (props: any) => {
  return(
    <div className="questionCard" role="group" 
      aria-labelledby="questionCard__title" ref={props.refElem}>
      <h3 id="questionCard__title" 
      dangerouslySetInnerHTML={{ __html: props.question.question }}/>
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
