import React from 'react';
import './Button.css';

const button = (props: any) => {
  let className = 'btn';
  if (props.class) {
    className += ' ' + props.class;
  }
  let disabledBtn = false;
  if(props.disabled) {
    disabledBtn = props.disabled;
  }
  return(
    <button className={className}
        disabled={disabledBtn}
        onClick={props.onClick}>
        {props.content}
    </button>
  );
};

export default button;
