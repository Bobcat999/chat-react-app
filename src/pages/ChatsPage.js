import React, { useEffect, useState } from 'react'
import { Conversation } from '../components/Conversation'
import { useLocation } from 'react-router-dom';

export const ChatsPage = () => {
    const [chatId, setChatId] = useState(null);
    const location = useLocation();

    useEffect(() => {
         const params = new URLSearchParams(location.search);
         setChatId(params.get("chatId"));
    }, [location]);

  return (
    <div className='chat-page'>
        <Conversation chatId={chatId}/>
    </div>
  )
}
