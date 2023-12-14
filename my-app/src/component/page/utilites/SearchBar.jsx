import styled from "styled-components";
import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import NavBarIcon from "./NavBarIcon";

const StyledSearchBar = styled(Form)`
  display: flex;
  width: auto; 
  flex-grow: 1;
  margin-left: 10px;
  transition: width 0.5s ease; 
 
  @media(max-width: 601px){
    width: 45%;
  }
  @media (max-width: 552px){
    width: 35%;
  }
  @media (max-width: 508px) {
    width: 20%;
  }
`;

function SearchBar() {
  return (
    <StyledSearchBar className="d-flex">
      <FormControl
        type="search"
        placeholder="검색"
        className="me-2"
        aria-label="Search"
      />
      <Button variant="outline-secondary">
        <i className="bi bi-search"></i>
        <NavBarIcon
          src="../../../images/searchIcon.png"
          alt="searchIcon"
        />
      </Button>
    </StyledSearchBar>
  );
};

export default SearchBar;
