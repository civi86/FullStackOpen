import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        username
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          name="Username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          name="Password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
