import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  console.log('Logged in user:', user)
  console.log('Blog user:', blog.user)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleDelete = async () => {
    if (window.confirm(`Delete blog "${blog.title}" by ${blog.author}?`)) {
      try {
        await removeBlog(blog.id || blog._id)
      } catch (error) {
        console.error('Failed to delete blog:', error)
      }
    }
  }

  const handleLike = async () => {
    try {
      const userId =
        blog.user && typeof blog.user === 'object'
          ? blog.user.id || blog.user._id
          : blog.user

      const blogId = blog.id || blog._id

      const updatedBlog = {
        id: blogId,
        user: userId,
        likes: likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      }

      const returnedBlog = await blogService.update(blogId.toString(), updatedBlog)

      setLikes(returnedBlog.likes)
      if (updateBlog) {
        updateBlog({ ...returnedBlog, user: blog.user })
      }
    } catch (error) {
      console.log('Liking blog id:', blog.id, 'or', blog._id)
      console.error('Error liking the blog:', error)
    }
  }

  const isBlogAuthor =
  user &&
  blog.user &&
  (typeof blog.user === 'object'
    ? blog.user.username === user.username || blog.user.id === user.id
    : blog.user === user.id)

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user && typeof blog.user === 'object' ? blog.user.name : ''}</div>
          {isBlogAuthor && <button onClick={handleDelete}>delete</button>}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
    user: PropTypes.oneOfType([
      PropTypes.shape({
        id: PropTypes.string,
        username: PropTypes.string,
        name: PropTypes.string,
      }),
      PropTypes.string,
    ]),
  }).isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string,
  }),
}

export default Blog
