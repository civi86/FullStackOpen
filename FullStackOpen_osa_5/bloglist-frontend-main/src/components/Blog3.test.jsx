import { render, screen, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'
import { vi } from 'vitest'

test('calls createBlog with correct details when a new blog is created', () => {
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const showFormButton = screen.getByText('create new blog')
  fireEvent.click(showFormButton)

  const titleInput = screen.getByLabelText('title:')
  const authorInput = screen.getByLabelText('author:')
  const urlInput = screen.getByLabelText('url:')
  const createButton = screen.getByText('create')

  fireEvent.change(titleInput, { target: { value: 'New Blog Title' } })
  fireEvent.change(authorInput, { target: { value: 'New Blog Author' } })
  fireEvent.change(urlInput, { target: { value: 'http://newblogurl.com' } })
  fireEvent.click(createButton)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'New Blog Title',
    author: 'New Blog Author',
    url: 'http://newblogurl.com',
  })
})
