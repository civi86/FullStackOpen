const login = async ({ username, password }) => {
  if (username === '111' && password === '111') {
    return {
      username: '111',
      name: '111 222',
      token: '111222',
    }
  } else if (username === '222' && password === '222') {
    return {
      username: '222',
      name: '222 111',
      token: '222111',  // tässä oli puuttuva kaksoispiste
    }
  } else {
    throw new Error('Wrong credentials')
  }
}

export default { login }
