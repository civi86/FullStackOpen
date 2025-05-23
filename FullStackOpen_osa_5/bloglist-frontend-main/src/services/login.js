const login = async ({ username, password }) => {
  if (username === '111' && password === '111') {
    return {
      username: '111',
      name: '111 222',
      token: '111222',
    }
  } else {
    throw new Error('Wrong credentials')
  }
}

export default { login }
