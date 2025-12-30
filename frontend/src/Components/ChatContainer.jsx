import React, { useEffect, useState } from  'react'
import ChatLists from './ChatLists'
import InputText from './InputText'
import UserLogin from './UserLogin';
import socketIOClient from 'socket.io-client';


const ChatContainer = () => {
    const [user, setUser] = useState(localStorage.getItem('user'));
    const socketio = socketIOClient('http://localhost:3001');
    const [chats, setChats] = useState([])
    

    useEffect(() => {
        socketio.on('chat',(chats) => {
            setChats(chats);
        });

        socketio.on('message', (msg) => {
            setChats((prevChats) => [...prevChats, msg])
        });

        return () => {
            socketio.off('chat')
            socketio.off('meassage')
        }
    }, []);

    
    const addMessage = (chat) =>{
        const newChat = { username: localStorage.getItem('user'),
            message: chat
        };
        socketio.emit('newMessage', newChat);
    };
    const Logout = () => {
        localStorage.removeItem('user')
        setUser("")
    }
  return (
    <div>
        {user ? (
        <div className="vh-100" style ={{backgroundImage: 'linear-gradient(to bottom,hsla(258, 15%, 87%, 1.00) , hsla(258, 73%, 77%, 1.00)'}}>
        <h4 className='d-flex justify-content-center'>Username: {user}</h4>
        <p className='d-flex justify-content-end mb-3 me-3' style={{ cursor: 'pointer', color: 'blue' }} 
        onClick={Logout}>
            <strong>Logout</strong>
        </p>
        <ChatLists chats={chats}/>
        <InputText addMessage = {addMessage}/>
        </div>
        

        ) : (
        <UserLogin setUser = {setUser}/>)
    }
    </div>
  )
}

export default ChatContainer
