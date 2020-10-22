import React, { useState } from 'react'
import { useUserMethods } from '../utils/auth/useUser'

export const LoginForm = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { login } = useUserMethods()

  function onLoginPressed() {
    login(username, password)
  }

  function onUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputUsername = event.target.value
    setUsername(inputUsername)
  }

  function onPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputPassord = event.target.value
    setPassword(inputPassord)
  }

  return (
    <div>
      <h1>Administration</h1>
      <input
        onChange={onUsernameChange}
        name="username"
        placeholder="Username..."
      />
      <br />
      <input
        onChange={onPasswordChange}
        name="password"
        placeholder="Password..."
        type="password"
      />
      <button onClick={onLoginPressed}>Sign In</button>
      <p>This functionality is only for Hotsauce Vision members.</p>
    </div>
  )
}
