import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not url or likes by default', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 10,
    user: {
      username: 'tester',
      name: 'Tester',
      id: 'user1'
    }
  }

  const { container } = render(
    <Blog blog={blog} updateBlog={() => {}} removeBlog={() => {}} user={{ username: 'tester' }} />
  )

  const text = container.textContent

  expect(text).toContain('Test Blog Title')
  expect(text).toContain('Test Author')
  
  expect(text).not.toContain('http://testurl.com')
  expect(text).not.toMatch(/likes/i)
})
