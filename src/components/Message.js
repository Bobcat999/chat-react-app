import React from 'react'
import './Message.css';

export const Message = ({sender, content, isOwner}) => {


  return (
    <div className={'message ' + (isOwner ? 'owner' : 'recipient')}>
        <span className='sender'>{sender}</span>
        <p className='content'>{content}</p>
    </div>
  )
}
