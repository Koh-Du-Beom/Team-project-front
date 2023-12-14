/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BoardListItem } from '../../../../types/interface';
import "./style.css";


export default function BoardItem(props) {
  const { number , date, title, text, videoId , videoType, } = props; // boardPage에서 number, title, text, videotype을 넘겨줄거임.
  
  //function : 네비게이트 함수 
  const navigate = useNavigate();
  const [isShorts, setIsShorts] = useState(false);
  // event handler
  const onClickHandler = () => {
    console.log({
      number,
      date,
      title,
      text,
      videoId,
      videoType
    });
    navigate(`/board-detail/${number}`, {
      state: { number, date, title, text, videoId, videoType, }
    });
  }



  useEffect(()=>{
    const checkShorts = () => {
      if(videoType === 'shorts'){
        setIsShorts(true);
      }else{
        setIsShorts(false);
      }
    }

    checkShorts();
  }, []);

  return (
    <div className='board-list-item' onClick={onClickHandler}>
      <div className='board-list-item-main-box'>
        <div className='board-list-item-top'>
          <div className="board-list-item-profile-box">
            <div className='board-list-item-profile-image' style={{backgroundImage: 'url(../../../images/userInfo.png)'}}></div>
          </div>
          <div className="board-list-item-write-box">
            <div className='board-list-item-nickname'>Jamie</div>
            <div className='board-list-item-write-date'>{date}</div>
          </div>
        </div>
        <div className='board-list-item-middle'>
          <div className='board-list-item-title'>{title}</div>
          <div className='board-list-item-content'>{text}</div>
        </div>
        <div className='board-list-item-bottom'>
          <div className='board-list-item-counts'>
            {`댓글 : ${ 34 }   ·  좋아요 : ${ 121 }  ·  조회수 : ${ 1324 }`}
          </div>
        </div>
        
         
      </div>  
      <div className='board-list-item-image-box'>
        <div className='board-list-item-image'style={{backgroundImage: `url(${!isShorts? "../../../images/youtube.png" : '../../../images/shorts.svg'})`}}></div>
      </div>  
    </div>
  )
}
