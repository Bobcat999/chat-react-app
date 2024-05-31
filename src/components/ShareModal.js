import React, { useState } from 'react'
import { TextBox } from './TextBox'
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import './ShareModal.css'

export const ShareModal = ({chatData, chatId, onClose}) => {
    const [email, setEmail] = useState('');

    const handleEnterPressed = (event) => {
        if(event.key === 'Enter' && email !== ''){
            console.log(email);
            if(isEmail(email)){
              addFriend(email);
              onClose();
              alert("Added " + email + " to chat");
            }else{
              alert("Invalid email, please try again")
            }
            resetTextBox();
        }
    }

    const resetTextBox = () => {
        setEmail('');
    }

    const handleChange = (event) => {
        setEmail(event.target.value);
    }

    const addFriend = async (newMember) => {
        chatData.members.push(newMember);
        const chatRef = doc(db, "chats", chatId);
        await updateDoc(chatRef, {
            members: chatData.members
        });
    }

    const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    const copyLinkToClipboard = () => {
      const urlToCopy = window.location.href;
      navigator.clipboard.writeText(urlToCopy);
      alert('Copied the link to clipboard');
    }

  return (
    <div className='share-modal'>
        <button className='close-modal' onClick={onClose}>X</button>
        <span>Invite a Friend</span>
        <input className='invite-friend' type="text" value={email} onChange={handleChange} onKeyDown={handleEnterPressed}/>
        <button className='copy-link' onClick={copyLinkToClipboard}>Copy Chat Link</button>
    </div>
  )
}
