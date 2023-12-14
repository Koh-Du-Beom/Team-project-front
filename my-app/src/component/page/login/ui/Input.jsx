/*eslint-disable*/
import styled from "styled-components";
import React from 'react';

const StyledInput = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 250px;
  border-radius: 4px;
  border: 1px solid #000000;
`;

function Input(props){
  const { type, value, onChange, placeholder } = props;
  return <StyledInput type={type} value={value} onChange={onChange} placeholder={placeholder}/>
}

export default Input;