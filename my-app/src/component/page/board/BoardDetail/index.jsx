/*eslint-disable*/
import React, { useState, useRef, ChangeEvent, useEffect } from 'react'
import "./style.css";
import styled from 'styled-components';
import YouTube from "react-youtube";
import { useNavigate, useLocation } from 'react-router-dom';
import { commentListMock } from '../../../../mocks';
import CommentItem from '../CommentListItem';
import { CommentListItem } from '../../../../types/interface';
import { useSelector } from 'react-redux';
import axios from 'axios';
import NavBarIcon from '../../utilites/NavBarIcon';



const VideoWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`


const StyledYoutube = styled(YouTube)`
  display: block; 
  width: 100%; 
  height: 0; 
  padding-top: 56.25%; 
  position: relative; 

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%; 
    height: 100%; 
  }
`

const StyledShorts = styled(YouTube)`
  display: block;
  position: relative;
 

  iframe {
    width: 360px;
    height: 640px;

  }
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledButton = styled.button`
  background-color: white;
  font-size: 20px;
  border: 1px solid grey;
  margin: 10px;
`

export default function BoardDetail() {
  const isLogin = useSelector((state) => state.userLogin.isLogin);
  const navigate = useNavigate();
  const location = useLocation();

  const [boardData, setBoardData] = useState({
    title: "",
    text: "",
    date: "",
    videoId: "",
    videoType: "",
  })

  useEffect(() => {
    if (location.state) {
      const { title, text, date, videoId, videoType } = location.state;
      setBoardData({
        title: title,
        text: text,
        date: date,
        videoId: videoId,
        videoType: videoType,
      });
    } else {
      console.log("No data passed from BoardItem");
    }
  }, [location]);






  const [commentText, setCommentText] = useState("");
  const [commentAreaHeight, setCommentAreaHeight] = useState("auto");
  const commentAreaRef = useRef(null);
  const handleCommentAreaChange =(event) => {
    setCommentText(event.target.value);
    setCommentAreaHeight("auto");
    if (commentAreaRef.current) {
      setCommentAreaHeight(`${commentAreaRef.current.scrollHeight}px`);
    }
  }

  const handleCommentWriteButton = () => {
    const commentDate = new Date().toISOString().substring(0, 10);
    //로컬 스토리지에 저장된 이름정보 보내주기
    const StoredUserInfo = localStorage.getItem('userInfo');
    const userInfo = StoredUserInfo ? JSON.parse(StoredUserInfo) : {};
    const commentWriter = userInfo.name;

    const body = {commentWriter, commentText, commentDate};
    axios.post('commentApiEndPointURL - comment', body)
      .then(response => {
        alert("댓글이 등록되었습니다.")
      }).catch(error => {
        alert("댓글 데이터 전송이 실패했습니다.");
      })
  }






  const opts = {
    playerVars: {
      autoplay: 0, 
      modestbranding: 1, 
      controls: 0, 
      fs: 0, 
      iv_load_policy: 3, 
      showinfo: 0, 
      rel: 0, 
    },
  };

  return (
    <div id='board-detail-wrapper'>
      <div className='board-detail-container'>
        <div className='board-detail-box'>
          <div className='board-detail-title-box'>
            <div className='board-detail-title'>{boardData.title}</div>
            <div className='board-detail-writer-box'>
              <div className='board-detail-writer-box-writer-info'>Jamie · {boardData.date} </div>
            </div>
          </div>
          <div className='divider'></div>
          <div className='youtube-add-button'>
            <VideoWrapper>
              {boardData.videoType === '' && (
                <img
                  className='youtube-add-button-icon'
                  alt="youtube"
                  src='../../../images/youtube.png'
                />
              )}
              {boardData.videoType === 'long' && (
                <StyledYoutube videoId={boardData.videoId} opts={opts} />
              )}
              {boardData.videoType === 'shorts' && (
                <StyledShorts videoId={boardData.videoId} opts={opts} />
              )}
            </VideoWrapper>
          </div>
          <div className='divider'></div>
          <div className='board-detail-content-box'>
            <div className='board-detail-content-textarea'>{boardData.text}</div>
          </div>
          <div className='divider'></div>
        </div>
        
        <CommentContainer>
          {commentListMock.map((commentListItem, index) => (
            <CommentItem key={index} commentListItem={commentListItem}/>
          ))} 
        </CommentContainer>
        <div className='divider'></div> 

        <div className='comment-write-content-box'>
          <textarea  
            ref={commentAreaRef}
            className='comment-write-content-textarea'
            value={commentText}
            style={{height: commentAreaHeight}}
            placeholder='댓글을 작성해주세요!'
            onChange={handleCommentAreaChange}
          />

        </div>
        
        <ButtonContainer>
          <StyledButton onClick={handleCommentWriteButton}>댓글 작성하기</StyledButton>
        </ButtonContainer>
        {/* 작성 후 상태 업데이트 하는 로직 */}
      </div>
      
    </div>
  )
}

