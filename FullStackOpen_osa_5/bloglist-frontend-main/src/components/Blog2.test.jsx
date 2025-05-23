import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import { vi } from 'vitest'

vi.mock('../services/blogs', () => {
  return {
    default: {
      update: vi.fn().mockResolvedValue({ likes: 6 }),
    },
  }
})

test('calls event handler twice when like button is clicked twice', async () => {
  const blog = {
    id: '1',
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: { username: 'Tester' }
  }

  const mockHandler = vi.fn()

  render(
    <Blog
      blog={blog}
      updateBlog={mockHandler}
      removeBlog={() => {}}
      user={{ username: 'Tester' }}
    />
  )

  const viewButton = screen.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = screen.getByText('like')

  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  await new Promise(process.nextTick)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})
