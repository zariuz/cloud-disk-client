import React from 'react';
import './input.scss';

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  setValue: any;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      onChange={(event) => props.setValue(event.target.value)}
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
