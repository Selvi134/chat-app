import React ,{useState} from 'react'

const InputText = ({addMessage}) => {
  const [message, setMessage] = useState("")
  const sendMessage = () => {
    addMessage(message);
    setMessage("");
  }
  return (
    <div>
        <div className='d-flex justify-content-center mt-5'>
            <input type="text" placeholder="Type a message..." className='form-control w-75'
            onChange={(e) => setMessage(e.target.value)}
            value= {message}/>
            <button className='btn btn-primary ms-2'
            onClick={sendMessage}>Send</button>
        </div>
    </div>
  );
}

export default InputText
