import React from 'react'
import './ChatHeader.css';

export const ChatHeader = ({chatName}) => {
  return (
    <div className='chat-header'>
      <span className='chat-name'>{chatName}</span>
    </div>
  )
}
