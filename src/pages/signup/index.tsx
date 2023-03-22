import { useState } from "react"


export default function Home() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  return (
    <>
      <form action="/api/signup" method="post">
        <label>
            Username
            <input 
              name='username' 
              type='text'
              value={username} 
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
        </label>
        <label>
            Email
            <input 
              name='email' 
              type='text'
              value={email} 
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
        </label>
        <label>
            Password
            <input 
              name='password' 
              type='password'
              value={password} 
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
        </label>
        <button type='submit'>Sign Up</button>
      </form>
    </>
  )
}
