import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('shows url, likes and user after clicking view button', () => {
  const blog = {
    title: 'Test blog',
    author: 'Author',
    url: 'http://example.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User',
      id: 'user1'
    }
  }

  render(<Blog blog={blog} updateBlog={() => {}} removeBlog={() => {}} user={null} />)

  const button = screen.getByText('view')
  fireEvent.click(button)

  expect(screen.getByText('http://example.com')).toBeDefined()
  expect(screen.getByText(/likes 5/i)).toBeDefined()
  expect(screen.getByText('Test User')).toBeDefined()
})
