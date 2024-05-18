import React, { useEffect, useRef, useState } from 'react'
import { Messages } from './Messages';
import { TextBox } from './TextBox';
import "./Conversation.css";
import { auth, db, provider } from ".././utils/firebase";
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy, where} from "firebase/firestore";


export const Conversation = ({chatId}) => {
    const [loadedMessages, setLoadedMessages] = useState([]);

    const messagesRef = collection(db, "messages");

    useEffect(() => {
        const queryMessages = query(getMessagesRef(),
            where("chatId", "==", chatId),
            orderBy("createdAt"));
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id});
            });
            setLoadedMessages(messages);
        })

        return () => unsubscribe();
    }, [chatId]);

    const getMessagesRef = () => {
        return collection(db, "chats/"+chatId+"/messages/");
    }

    const handleMessageSent = async (message) => {
        if(message === '') return;

        const messageData = {
            content: message,
            createdAt: serverTimestamp(),
            chatId,
            user: auth.currentUser.displayName
        }
        await addDoc(getMessagesRef(), messageData);
    }

    return (
        <div className="conversation">
            <Messages messages={loadedMessages} user={auth.currentUser}/>
            <TextBox onMessageSend={handleMessageSent}/>
        </div>
    );
}
