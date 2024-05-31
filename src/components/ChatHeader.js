import React from 'react'
import './ChatHeader.css';
import { Link } from 'react-router-dom';

export const ChatHeader = ({chatData, setIsSharing}) => {

  const onShareBtn = () => {
    setIsSharing(true);
  }

  return (
    <div className='chat-header'>
      <Link to={"/"} className='back-button'>Back</Link>
      <div className='chat-actions'>
        <button className='share' onClick={onShareBtn}>Share</button>
      </div>
      <span className='chat-name'>{chatData.chatName}</span>
      <p className='members'>
        Members: {chatData.members.map((mem) => {return mem+" "})}
      </p>
    </div>
  )
}
