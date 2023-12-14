/*eslint-disable*/
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavBarIcon from './NavBarIcon';
import React from 'react';
import styled, { keyframes } from "styled-components";
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import getSideBarData from './getSideBarData';
import { useDispatch } from 'react-redux';
import { clearUserThunk } from '../../../store/store'; 
import { useSelector } from 'react-redux';

const StyledNavbarBrand = styled(Navbar.Brand)`
  margin-right: auto;
  &:hover{
    cursor: pointer;
  }
  
`

const StyledOffCanvasHeader = styled(Offcanvas.Header)`
  border-bottom: 1px double #8c8c8c;
`

const StyledNavLink = styled(Nav.Link)`
  &:hover{
    background-color: #f8f9fa;
  }
`

const StyledNavDropdown = styled(NavDropdown)`
  padding-left: 10px;
`

const YoutubeLogo = styled.img`
  padding-left: 10px;
  height: 60px;
  width: auto;
  &:hover{
    cursor: default;
  }
`


function SideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.userLogin.isLogin)

  const handleLogout = () => {
    dispatch(clearUserThunk());
    alert("로그아웃이 완료되었습니다.");
    navigate('/');
  }

  const handleUserInfo = () => {
    if(!isLogin){
      navigate('/');
    }
  }

  const {navItems, dropdownNavItems} = getSideBarData(navigate);
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-white mb-3" >
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <StyledNavbarBrand
              onClick={() => {
                window.location.reload(); // 새로고침 버튼을 누른 것 같이 동작
              }}
            >
              <NavBarIcon
                src="../../../images/youtube.png"
                alt="homelogo"
              />
              Youtube
            </StyledNavbarBrand>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <StyledOffCanvasHeader closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <YoutubeLogo
                    src="../../../images/youtubeLogo.png"
                    alt="youtubeLogo"
                  />
                </Offcanvas.Title>
              </StyledOffCanvasHeader>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {navItems.map((item) => (
                    <StyledNavLink key={item.id} onClick={item.onClick}>
                      <NavBarIcon src={item.src} alt={item.alt}/>
                      {item.content}
                    </StyledNavLink>
                  ))}
                  <StyledNavDropdown
                    title="실시간 게시판"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    {dropdownNavItems.map((items)=> (
                      <NavDropdown.Item key={items.id} onClick={()=> {navigate('/board')}}>
                        <NavBarIcon src={items.src} alt={items.alt}/>
                        {items.content}
                      </NavDropdown.Item>
                    ))}
                  </StyledNavDropdown>
                </Nav>
                <Form className="d-flex" style={{marginTop: '20px'}}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
              
            </Navbar.Offcanvas>        
            <SearchBar/>
            <NavBarIcon
              src="../../../images/userInfo.png"
              alt="userinfo"
              onClick={handleUserInfo}
            />
            {/* <a href="https://www.flaticon.com/kr/free-icons/" title="사람 아이콘">사람 아이콘  제작자: Febrian Hidayat - Flaticon</a> */}
            <NavBarIcon
              src="../../../images/logout.png" 
              alt="logout"
              onClick={handleLogout} // 로그아웃 로직 구현
            />
            {/* <a href="https://www.flaticon.com/kr/free-icons/" title="떠나다 아이콘">떠나다 아이콘  제작자: Creatype - Flaticon</a> */}
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default SideBar;
