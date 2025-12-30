import React, { useEffect, useRef, useState } from 'react';
import ChatLists from './ChatLists';
import InputText from './InputText';
import UserLogin from './UserLogin';
import socketIOClient from 'socket.io-client';

const ChatContainer = () => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [chats, setChats] = useState([]);

  // ✅ keep single socket instance (important for mobile)
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = socketIOClient(
      import.meta.env.VITE_BACKEND_URL,
      {
        transports: ['websocket'], // ✅ mobile-friendly
        secure: true
      }
    );

    socketRef.current.on('chat', (chats) => {
      setChats(chats);
    });

    socketRef.current.on('message', (msg) => {
      setChats((prevChats) => [...prevChats, msg]);
    });

    return () => {
      socketRef.current.off('chat');
      socketRef.current.off('message');
      socketRef.current.disconnect();
    };
  }, []);

  const addMessage = (chat) => {
    const newChat = {
      username: localStorage.getItem('user'),
      message: chat
    };
    socketRef.current.emit('newMessage', newChat);
  };

  const Logout = () => {
    localStorage.removeItem('user');
    setUser('');
  };

  return (
    <div>
      {user ? (
        <div
          className="vh-100"
          style={{
            backgroundImage:
              'linear-gradient(to bottom,hsla(258, 15%, 87%, 1.00), hsla(258, 73%, 77%, 1.00))'
          }}
        >
          <h4 className="d-flex justify-content-center">
            Username: {user}
          </h4>

          <p
            className="d-flex justify-content-end mb-3 me-3"
            style={{ cursor: 'pointer', color: 'blue' }}
            onClick={Logout}
          >
            <strong>Logout</strong>
          </p>

          <ChatLists chats={chats} />
          <InputText addMessage={addMessage} />
        </div>
      ) : (
        <UserLogin setUser={setUser} />
      )}
    </div>
  );
};

export default ChatContainer;
