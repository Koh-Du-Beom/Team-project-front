/*eslint-disable*/
import styled from "styled-components";
import React from 'react';

const NavIcon = styled.img`
  height: 30px; 
  width: auto; 
  cursor: pointer; 
  padding: 0 10px; 
  
`;

function NavBarIcon(props){
  const {src, alt, onClick} = props;
  return <NavIcon src={src} alt={alt} onClick={onClick}/>
}

export default NavBarIcon;
