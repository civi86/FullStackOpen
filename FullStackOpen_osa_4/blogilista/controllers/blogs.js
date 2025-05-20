const express = require('express')
const blogsRouter = express.Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(404).end()
  }
  if ( blog.user.toString() !== req.user.id ) {
    return res.status(401).json({ error: 'unauthorized' })
  }
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogsRouter.post('/', userExtractor, async (req, res) => {
  const user = await User.findById(req.user.id)

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})


module.exports = blogsRouter
