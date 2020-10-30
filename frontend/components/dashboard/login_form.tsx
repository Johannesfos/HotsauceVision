import React, { useState } from 'react'
import { useUserMethods } from '../../utils/auth/useUser'
import { Button } from 'semantic-ui-react'

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
    <>
      <div>
        <h1>Administration</h1>
        <input
          onChange={onUsernameChange}
          name="username"
          placeholder="Username..."
          className="input-field"
        />
        <br />
        <input
          onChange={onPasswordChange}
          name="password"
          placeholder="Password..."
          type="password"
          className="input-field"
        />
        <br />
        <br />
        <Button primary onClick={onLoginPressed}>
          Sign In
        </Button>
        <br />
        <br />
        <p>This functionality is only for Hotsauce Vision members.</p>
      </div>
      <style jsx>{`
        .input-field {
          appearance: none;
          border: 0;
          outline: 0;
          width: 200px;
          height: 37px;
          padding: 5px;
          margin: 2px;
          border: 1px solid rgba(0, 0, 0, 0.3);
          border-radius: 3px;
        }
        .input-field:focus {
          border: 1px solid rgba(0, 100, 200, 0.7);
        }
      `}</style>
    </>
  )
}
