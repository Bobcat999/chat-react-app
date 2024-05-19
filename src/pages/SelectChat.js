import React, { useState } from 'react'
import './SelectChat.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../utils/firebase';

export const SelectChat = ({onSetChat}) => {
    const [chat, setChat] = useState('');
    const location = useLocation();
    const navagate = useNavigate();

    const handleChatSelect = async (event) => {
        if(event.key === 'Enter'){
            //query chats
            const queryChats = await getDocs(query(collection(db, "chats"),
            where("chatName", "==", chat)));
            if(queryChats.docs.length !== 0){
                const chatId = queryChats.docs.at(0).id;
                const searchParams = new URLSearchParams(location.search);
                searchParams.set('chatId', String(chatId));
                navagate("/chats/?"+searchParams);
            }else{
                navagate("/create");
            }
            resetTextBox();
        }
    }

    const resetTextBox = () => {
        setChat('');
    }

    const handleChange = (event) => {
        setChat(event.target.value);
    }

    return (
        <div className='select-chat'>
            Select Chat - Github Deploy Test
            <input className='chat-box' type="text" value={chat} onChange={handleChange} onKeyDown={handleChatSelect}/>
        </div>
    );
}
