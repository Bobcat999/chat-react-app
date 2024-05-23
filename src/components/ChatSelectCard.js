import React from 'react'
import './ChatSelectCard.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const ChatSelectCard = ({ chatData }) => {
    return (
        <Link className='chat-select-card' to={'/chats/?chatId='+chatData.id}>
            <span className='chat-name'>{chatData.chatName}</span>
        </Link>
    )
}
