import React ,{ useRef } from 'react'
import '../style.css'
import { useEffect } from 'react'



const ChatLists = ({ chats }) => {
  const endOfMessages = useRef()
  const user = localStorage.getItem('user')
  function SenderChat({ message, username }) {
    return (
      <div className='d-flex justify-content-start mb-3'>
        <div className='p-2 bg-primary text-white rounded-3' style={{ maxWidth: '60%' }}>
          <p>
            <strong>{username}</strong><br />
            {message}
          </p>
        </div>
      </div>
    )
  }
  function ReceiverChat({ message, username }) {
    return (
      <div className='d-flex justify-content-end mb-3'>
        <div className='p-2 bg-secondary text-white rounded-3' style={{ maxWidth: '60%' }}>
          <p>
            <strong>{username}</strong><br />
            {message}
          </p>
        </div>
      </div>
    )
  }
  useEffect(() => {
    scrollToBottom()
  },[chats])
  const scrollToBottom = () =>{
    endOfMessages.current?.scrollIntoView({behavior: "smooth"})
  }
    return (
    <div className='chats_list'>
      {
        chats.map((chat, index) => {
          if (chat.username === user) {
            return <SenderChat
              key={index}
              message={chat.message}
              username={chat.usename} />
          }
          else {
            return <ReceiverChat
              key={index}
              message={chat.message}
              username={chat.username} />
          }

        })
      }
      <div ref={endOfMessages}></div>
    </div>
  )
}

export default ChatLists
