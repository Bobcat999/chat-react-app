import React, { useState } from 'react'
import './CreateChat.css';
import { addDoc, collection, doc } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';
import { useLocation, useNavigate } from 'react-router-dom';

export const CreateChat = () => {
    const [chat, setChat] = useState('');
    const navagate = useNavigate();
    const location = useLocation();

    const chatsRef = collection(db, "chats");

    const handleChatSelect = async (event) => {
        if(event.key === 'Enter'){
            console.log(chat);
            if(chat === '') return;
            const newChat = {
                chatName: chat,
                owner: auth.currentUser.displayName
            }
            const chatRef = await addDoc(chatsRef, newChat);
            const searchParams = new URLSearchParams(location.search);
            searchParams.set('chatId', String(chatRef.id));
            navagate("/chats/?"+searchParams);
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
        <div className='create-chat'>
            Create Chat
            <p className='description'> 
                Enter the name of your new chat
            </p>
            <input className='chat-box' type="text" value={chat} onChange={handleChange} onKeyDown={handleChatSelect}/>
        </div>
    );
}
