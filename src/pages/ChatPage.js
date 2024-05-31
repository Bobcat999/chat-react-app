import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ChatHeader } from '../components/ChatHeader';
import "./ChatPage.css";
import { Messages } from '../components/Messages';
import { TextBox } from '../components/TextBox';
import { auth, db, provider } from ".././utils/firebase";
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy, where, getDoc, doc, updateDoc } from "firebase/firestore";
import { createChatData, createMessageData } from '../utils/ChatDataObjects';
import { ShareModal } from '../components/ShareModal';

export const ChatPage = () => {
  const [chatId, setChatId] = useState(null);
  const [chatData, setChatData] = useState(createChatData());
  const [loadedMessages, setLoadedMessages] = useState([]);
  const [isSharing, setIsSharing] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const location = useLocation();
  const navagate = useNavigate();

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

        if (!data.members.includes(auth.currentUser.email)) {
          setShowJoinModal(true);
        }
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

    const messageData = createMessageData(message, chatId, auth.currentUser.displayName);
    await addDoc(getMessagesRef(), messageData);
  }

  const handleJoinChat = async () => {
    chatData.members.push(auth.currentUser.email);
    const chatRef = doc(db, "chats", chatId);
    setShowJoinModal(false);
    await updateDoc(chatRef, {
      members: chatData.members
    });
  }

  //if we arent part of the chat - add to the chat
  if (showJoinModal) {
    return <div className="chat-page">
      <div className='join-chat'>
        <h1>You have been invited to join:</h1>
        <span>{chatData.chatName}</span>
        <button onClick={handleJoinChat}>Join Now</button>
      </div>
    </div>
  }


  return (
    <div className="chat-page">
      {
        isSharing
          ?
          <ShareModal chatData={chatData} chatId={chatId} onClose={() => { setIsSharing(false) }} />
          :
          <>
            <ChatHeader chatData={chatData} setIsSharing={setIsSharing} />
            <Messages messages={loadedMessages} user={auth.currentUser} />
            <TextBox onMessageSend={handleMessageSent} />
          </>
      }
    </div>
  );
}
