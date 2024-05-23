import React from 'react'
import './ChatHeader.css';

export const ChatHeader = ({chatData}) => {
  return (
    <div className='chat-header'>
      <span className='chat-name'>{chatData.chatName}</span>
      <p className='members'>
        Members: {chatData.members.map((mem) => {return mem+" "})}
      </p>
    </div>
  )
}
