import React, { useState} from 'react'

const UserLogin = ({setUser}) => {
  const [userName, setUserName] = useState()
  
  const handleUser =  () => {
    if(!userName) return;
    localStorage.setItem("user", userName)
    setUser(userName)
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' ,backgroundImage: 'linear-gradient(to bottom, #e45fffff, #9e7bfeff)' }} className='container py-4 rounded'>
      <div>
        <h1>Chat App</h1>
      </div>
      <div className='m-4'>
        <input type="text" placeholder="Enter Unique Name" className='border border-primary rounded'
        onChange={(e) => setUserName(e.target.value)}/><br/><br/>
        <button className='btn btn-primary mt-3' onClick={handleUser}>Login</button>
      </div>
    </div>
  )
}

export default UserLogin
