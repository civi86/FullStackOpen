import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visible, setVisible] = useState(false)

  const handleCreate = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
    setVisible(false)
  }

  return (
    <div>
      {!visible && (
        <button onClick={() => setVisible(true)}>create new blog</button>
      )}
      {visible && (
        <div>
          <h2>Create a new blog</h2>
          <form onSubmit={handleCreate}>
            <div>
                <label htmlFor="title">title:</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
            <div>
                <label htmlFor="author">author:</label>
                    <input
                        id="author"
                        type="text"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
            <div>
                <label htmlFor="url">url:</label>
                    <input
                        id="url"
                        type="text"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            <button type="button" onClick={() => setVisible(false)}>
                cancel
            </button>
            </form>
        </div>
      )}
    </div>
  )
}

export default BlogForm
