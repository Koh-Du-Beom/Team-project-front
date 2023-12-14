/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import SideBar from '../utilites/SideBar';
import BoardItem from './BoardListItem'
import { latestBoardListMock } from '../../../mocks'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ButtonContainer = styled.div`
  display: flex;
  margin: 10px;
`

const StyledButton = styled.button`
  margin: 10px;
  height: 40px;
  padding: 0 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
`

const RefreshImage = styled.img`
  width: 24px;
  height: 24px;
`

function BoardPage(){
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.userLogin.isLogin);

  const loadData = async () => {
    try {
      const response = await axios.get('http://localhost:4002/api/board/latest-list');
      console.log(response.data);

      const updatedBoardList = response.data.latestList.map(board => {
        const [videoId, videoType] = board.videoInfo.split(', ');

        return {
          number: board.number,
          title: board.title,
          text: board.text,
          date: board.date,
          videoId: videoId,
          videoType: videoType,
        }
      });

      setBoardList(updatedBoardList);
    } catch (error) {
      console.error('Error : ', error);
    }
  };

  useEffect(()=>{
    loadData();
  }, [])

  return (
      <div>
        <SideBar/>
        {
          boardList.map(board => (
              <BoardItem
                  key={board.number}
                  number={board.number}
                  title={board.title}
                  videoId={board.videoId}
                  videoType={board.videoType}
                  date={board.date}
                  text={board.text}
              />
          ))
        }
        <ButtonContainer>
          <StyledButton
              onClick={() => navigate('/board-write')}
              disabled={!isLogin} // 로그인 상태에 따라 버튼 비활성화
          >
            게시물 작성하기
          </StyledButton>
          <StyledButton onClick={loadData}>
            <RefreshImage src="../../images/refresh.png" alt="Refresh" />
          </StyledButton>
          {/* 새로고침은 데이터베이스에서 영상들 다시 받아오는 기능으로 구현 */}
        </ButtonContainer>

      </div>

  )
}

export default BoardPage;