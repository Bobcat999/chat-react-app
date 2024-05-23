import React, { useEffect, useState } from 'react'
import './SelectChat.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { collection, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';
import { ChatSelectCard } from '../components/ChatSelectCard';

export const SelectChat = ({ onSetChat }) => {
    const [loadedChats, setLoadedChats] = useState([]);

    //load chats
    useEffect(() => {
            //loading messages
            const queryChats = query(collection(db, "chats"),//);
                where("members", 'array-contains', auth.currentUser.email));
            const unsubscribe = onSnapshot(queryChats, (snapshot) => {
                let chats = [];
                snapshot.forEach((doc) => {
                    chats.push({ ...doc.data(), id: doc.id });
                });
                setLoadedChats(chats);
            })
            return () => unsubscribe();
    }, []);

    return (
        <div className='select-chat'>
            <div> Select Chat </div>
            <h3>Your Chats:</h3>
            <div className='loaded-chats'>
            {
                loadedChats.map((chatData) => {
                    return <ChatSelectCard chatData={chatData} />
                })
            }
            </div>
            <Link className={'create-chat-btn'} to={"/create"}>Create Chat</Link>
        </div>
    );
    // <input className='chat-box' type="text" value={chat} onChange={handleChange} onKeyDown={handleChatSelect}/>
}
