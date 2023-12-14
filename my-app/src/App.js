/*eslint-disable*/
import './App.css';
import React from 'react';
import LoginPage from './component/page/login/LoginPage';
import { Routes, Route } from 'react-router-dom';
import SignupPage from './component/page/login/SignupPage';
import HomePage from './component/page/home/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShortsPage from './component/page/shorts/ShortsPage';
import BoardPage from './component/page/board/BoardPage';
import WritePage from './component/page/board/WritePage';
import BoardDetailPage from './component/page/board/BoardDetailPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <LoginPage/> }/>
        <Route path="/signup" element={ <SignupPage/>} />
        <Route path="/home" element={ <HomePage/>}/>
        <Route path="/shorts" element={<ShortsPage/>}/>
        
        <Route path="/board" element={<BoardPage/>}/>
        <Route path='/board-write' element={<WritePage/>}/>
        <Route path="/board-detail/:boardNumber" element={<BoardDetailPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
