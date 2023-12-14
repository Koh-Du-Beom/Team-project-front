import React from 'react'
import { CommentListItem } from '../../../../types/interface';
import "./style.css"

interface Props{
  commentListItem: CommentListItem;
}

export default function CommentItem({commentListItem}: Props) {
  const {commentWriter, commentText, commentDatetime, } = commentListItem;

  // render
  return (
    <div className="comment-list-item">
      <div className="comment-list-item-top">
        <div className="comment-list-item-profile-box">
          <div className="comment-list-item-profile-image" style={{backgroundImage: `url(${'../../../images/userInfo.png'})`}}></div>
        </div>
        <div className="comment-list-item-nickname">{commentWriter}</div>
        <div className="comment-list-item-divider">{`|`}</div>
        <div className="comment-list-item-time">{commentDatetime}</div>
      </div>
      <div className="comment-list-item-main">
        <div className='comment-list-item-content'>{commentText}</div>
      </div>
    </div>
  )
}
