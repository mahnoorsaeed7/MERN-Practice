import React from 'react'
import { useState, useContext } from 'react'
import UserContext from '../context/userContext'


function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const {setuser} = useContext(UserContext)
  const handlelogin = (e) => {
     e.preventDefault() 
     setuser({username, password})
  }


  return (
    <div>
      <h2>Login</h2>
      <input type="text" 
      placeholder='username'
      value={username} 
      onChange={(e)=> setUsername(e.target.value) } 
      />
      {"  "}
      <input type="password"
       placeholder='password' 
      value={password} 
      onChange={(e)=> setPassword(e.target.value) } />
       
      <button onClick={handlelogin}>Login</button>
    </div>
  )
}

export default Login
