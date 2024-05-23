import { serverTimestamp } from "firebase/firestore";


export function createChatData(chatName, owner){
    return {
        chatName,
        owner,
        members: [owner],
    }
}

export function createMessageData(content, chatId, user){
    return{
        content,
        chatId,
        createdAt: serverTimestamp(),
        user,
    };
}