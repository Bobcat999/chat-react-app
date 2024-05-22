import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { ChatHeader } from '../components/ChatHeader';
import "./ChatPage.css";
import { Messages } from '../components/Messages';
import { TextBox } from '../components/TextBox';
import { auth, db, provider } from ".././utils/firebase";
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy, where, getDoc, doc } from "firebase/firestore";

export const ChatPage = () => {
  const [chatId, setChatId] = useState(null);
  const [chatData, setChatData] = useState({
    chatName: " "
  });
  const [loadedMessages, setLoadedMessages] = useState([]);
  const location = useLocation();

  //load loaction information
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const chatId = params.get("chatId");
    setChatId(chatId);
  }, [location]);


  //load chat information
  useEffect(() => {
    if (chatId !== null) {
      //loading messages
      const queryMessages = query(getMessagesRef(),
        orderBy("createdAt"));
      const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
        let messages = [];
        snapshot.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });
        setLoadedMessages(messages);
      })
      //get chat data
      const chatRef = doc(db, "chats", chatId);
      getDoc(chatRef).then((snapshot) => {
        const data = snapshot.data();
        setChatData(data);
      });

      return () => unsubscribe();
    }
  }, [chatId]);


  //return a dynamic messages ref
  const getMessagesRef = () => {
    return collection(db, "chats/" + chatId + "/messages/");
  }

  //handle when a message is sent
  const handleMessageSent = async (message) => {
    if (message === '') return;

    const messageData = {
      content: message,
      createdAt: serverTimestamp(),
      chatId,
      user: auth.currentUser.displayName
    }
    await addDoc(getMessagesRef(), messageData);
  }

  return (
    <div className="chat-page">
      <ChatHeader chatName={chatData.chatName} />
      <Messages messages={loadedMessages} user={auth.currentUser} />
      <TextBox onMessageSend={handleMessageSent} />
    </div>
  );
}
