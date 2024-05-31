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
        const unsubscribeAuth = auth.onAuthStateChanged(user => {
            if (user) {
                // User is signed in.
                const queryChats = query(
                    collection(db, "chats"),
                    where("members", 'array-contains', user.email)
                );
                const unsubscribeChats = onSnapshot(queryChats, snapshot => {
                    let chats = [];
                    snapshot.forEach((doc) => {
                        chats.push({ ...doc.data(), id: doc.id });
                    });
                    setLoadedChats(chats);
                });
                return () => unsubscribeChats();
            } else {
                // User is signed out.
                setLoadedChats([]); // Clear chats
            }
        });
        return () => unsubscribeAuth();
    }, [auth.currentUser]);

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
