import React, { useEffect, useState } from 'react'
import './Messages.css';
import { Message } from './Message';

export const Messages = ({messages, user}) => {


  return (
    <div className='messages'>
      {
      messages.map((message) => {
        return <Message 
          sender={message.user} 
          content={message.content} 
          isOwner={message.user === user.displayName} 
          key={message.id}
          />;
      })
      }
    </div>
  )
}
