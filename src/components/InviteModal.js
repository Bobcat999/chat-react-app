import React from 'react'
import { TextBox } from './TextBox'
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

export const InviteModal = ({chatData, chatId}) => {
    const addFriend = async (newMember) => {
        chatData.members.push(newMember);
        const chatRef = doc(db, "chats", chatId);
        await updateDoc(chatRef, {
            members: chatData.members
        });
    }

  return (
    <div className='invite-modal'>
        Invite a Friend
        <TextBox onMessageSend={addFriend}/>
    </div>
  )
}
