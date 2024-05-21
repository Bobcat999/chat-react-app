import React, { useEffect, useRef, useState } from 'react'
import './Messages.css';
import { Message } from './Message';

export const Messages = ({messages, user}) => {
  const messagesRef = useRef();

  useEffect(() => {
    messagesRef.current?.lastElementChild?.scrollIntoView();
  }, [messages]);

  return (
    <div className='messages' ref={messagesRef}>
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
