/*eslint-disable*/
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, loginUserThunk } from '../../../store/store';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import Input from "./ui/Input";

const LogoImage = styled.img`
  width: auto;
  height: 200px;
`

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; 
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;


const LoginTitle = styled.h1`
  margin: 10px;
`

const StyledButton = styled.button`
  font-weight: bold;
  color: black;
  text-decoration: none;
  background-color: white;
  border: 0px;
  &:hover{
    animation: twinkling infinite;
  }

  @keyframes twinkling{
    0% { opacity: 1; }
    50% { opacity : 0.5; }
    100% { opacity : 1; }
  }

`

const GuestLoginButton = styled.div`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border: 2px solid black;
  margin: 10px;
  font-size: 25px;
  &:hover{
    background-color: #f2f2f2;
    cursor: pointer;
  }
`

function LoginPage(){
  let user = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState("");

  const checkCredentials = async (email, password) => {
    
    const body = { email, password }
    try{
      const response = await axios.post('http://localhost:4002/api/auth/signIn', body);
      //백엔드에서 성공 사용자에 대한 데이터를 돌려줘야함. 아이디랑 이름을 돌려주기
      if (response.status === 200) {
        return response.data;
      }
    }catch(error){
      console.log("Login error: ", error);
      alert("loginerror");
      return null;
    }
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    
    const userInfo = await checkCredentials(email, password);
    if (userInfo){
      setMsg("로그인 성공!")
      alert(msg);
      //데이터베이스에서 회원가입한 사람 이름을 돌려줘야함. 
      dispatch(loginUserThunk(userInfo)); // 로그인 성공하면 이메일, 이름을 로컬스토리지에 저장
      navigate('/home'); 
      // 로그인 성공하면 리덕스 상태 업데이트 후 home으로 이동
    }else{
      setMsg("로그인 정보가 올바르지 않습니다.");
      alert(msg);
      setId('');
      setPassword('');
    }
  }
  
  return (
    <LoginContainer>
      <LogoImage src="../../images/youtube.png" alt="loginImage"/>
      <LoginTitle>로그인하기</LoginTitle>
      <LoginForm onSubmit={handleLogin}>
        <Input 
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="아이디를 입력하세요" 
        />
        <Input
          type="password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
        />
        <Button type="submit">로그인</Button>
        <GuestLoginButton onClick={()=>{navigate("/home")}}>게스트 로그인</GuestLoginButton>
      </LoginForm >
      <p>
        계정이 없으신가요? <StyledButton onClick={()=>{navigate('/signup')}}>회원가입하기</StyledButton>
      </p>
      {(msg.length> 5) ? msg: ''}
    </LoginContainer>
  );
}

export default LoginPage;
