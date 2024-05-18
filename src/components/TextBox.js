
import { useState } from 'react';
import './TextBox.css';

export const TextBox = ({onMessageSend}) => {
    const [message, setMessage] = useState('');

    const handleMessageSent = (event) => {
        if(event.key === 'Enter'){
            console.log(message);
            onMessageSend(message);
            resetTextBox();
        }
    }

    const resetTextBox = () => {
        setMessage('');
    }

    const handleChange = (event) => {
        setMessage(event.target.value);
    }

    return (
        <input className='text-box' type="text" value={message} onChange={handleChange} onKeyDown={handleMessageSent}/>
    )
}
