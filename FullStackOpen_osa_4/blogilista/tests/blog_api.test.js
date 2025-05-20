process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const initialBlogs = [
    { title: 'Blog 1', author: 'Author 1', url: 'blog1.fi', likes: 1 },
    { title: 'Blog 2', author: 'Author 2', url: 'blog2.fi', likes: 2 }
  ]

  await Blog.insertMany(initialBlogs)
})

test('blog objects contain id field, not _id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
    expect(blog._id).toBeUndefined()
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Testiblogi',
    author: 'Testaaja',
    url: 'http://example.com',
    likes: 9
  }

  const blogsAtStart = await Blog.find({})

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await Blog.find({})
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('Testiblogi')
})


test('blogs are returned as json and correct length', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(2)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await Blog.find({})
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await Blog.find({})

  expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

  const ids = blogsAtEnd.map(b => b.id)
  expect(ids).not.toContain(blogToDelete.id)
})


afterAll(async () => {
  await mongoose.connection.close()
})
