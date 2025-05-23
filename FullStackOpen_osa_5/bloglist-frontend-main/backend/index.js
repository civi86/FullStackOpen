const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

let blogs = [
  {
    id: '1',
    title: 'First blog',
    author: 'Author One',
    url: 'http://example.com/1',
    likes: 0,
    user: {
      id: 'user1',
      username: 'testuser',
      name: 'Test User'
    }
  },
  {
    id: '2',
    title: 'Second blog',
    author: 'Author Two',
    url: 'http://example.com/2',
    likes: 3,
    user: {
      id: 'user2',
      username: 'anotheruser',
      name: 'Another User'
    }
  }
]

app.get('/api/blogs', (req, res) => {
  res.json(blogs)
})

app.post('/api/blogs', (req, res) => {
  const blog = req.body
  if (!blog.title || !blog.author || !blog.url) {
    return res.status(400).json({ error: 'missing blog information' })
  }

  blog.id = (blogs.length + 1).toString()
  blog.likes = blog.likes || 0
  if (!blog.user || typeof blog.user !== 'object') {
  blog.user = {
    id: 'unknown',
    username: 'unknown',
    name: 'Unknown user'
  }
}

  blogs.push(blog)
  res.status(201).json(blog)
})

app.put('/api/blogs/:id', (req, res) => {
  const id = req.params.id
  const updatedBlog = req.body

  const blogIndex = blogs.findIndex(blog => blog.id === id)
  if (blogIndex === -1) {
    console.log('Blog not found with id:', id)
    return res.status(404).json({ error: 'blog not found' })
  }

  const existingUser = blogs[blogIndex].user

  blogs[blogIndex] = { ...blogs[blogIndex], ...updatedBlog, user: existingUser, id }

  res.json(blogs[blogIndex])
})


app.delete('/api/blogs/:id', (req, res) => {
  const id = req.params.id
  const blogIndex = blogs.findIndex(blog => blog.id === id)

  if (blogIndex === -1) {
    return res.status(404).json({ error: 'blog not found' })
  }

  blogs.splice(blogIndex, 1)
  res.status(204).end()
})



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
