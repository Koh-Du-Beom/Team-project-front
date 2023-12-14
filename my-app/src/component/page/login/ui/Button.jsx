/*eslint-disable*/
import styled from "styled-components";
import React from 'react';

const LoginButton = styled.button`
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin: 20px;
  font-size: 25px;
`;

function Button(props){
  const {type, children} = props;
  return <LoginButton type={type}>{children}</LoginButton>
}

export default Button;