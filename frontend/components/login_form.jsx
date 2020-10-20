import React, { useState } from 'react'
import { useUserMethods } from '../utils/auth/useUser'

export const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useUserMethods()

  function onLoginPressed() {
    login(username, password)
  }

  function onUsernameChange(event) {
    const inputUsername = event.target.value
    setUsername(inputUsername)
  }

  function onPasswordChange(event) {
    const inputPassord = event.target.value
    setPassword(inputPassord)
  }

  return (
    <div>
      <input onChange={onUsernameChange} name="username" />
      <input onChange={onPasswordChange} name="password" />
      <button onClick={onLoginPressed}>Sign In</button>
    </div>
  )
}
