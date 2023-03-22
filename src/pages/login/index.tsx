import { useState } from 'react'



export default function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <form method='post' action='/api/login'>
        <label>
            Username
            <input name='username' type='text' value={username} onChange={(event) => setUsername(event.currentTarget.value)}/>
        </label>
        <label>
            Password
            <input name='password' type='password' value={password} onChange={(event) => setPassword(event.currentTarget.value)}/>
        </label>
        <button type='submit'>Login</button>
      </form>
    </>
  )
}
