const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const userExtractor = (req, res, next) => {
  const token = getTokenFrom(req)
  if (!token) {
    return res.status(401).json({ error: 'token missing' })
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }
    req.user = decodedToken
    next()
  } catch (error) {
    return res.status(401).json({ error: 'token invalid' })
  }
}

module.exports = { getTokenFrom, userExtractor }
