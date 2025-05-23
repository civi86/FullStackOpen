import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => axios.get(baseUrl).then(res => res.data)

const create = (newBlog) => {
  const config = { headers: { Authorization: token } }
  return axios.post(baseUrl, newBlog, config).then(res => res.data)
}

const update = (id, updatedBlog) => {
  const config = { headers: { Authorization: token } }
  return axios.put(`${baseUrl}/${id}`, updatedBlog, config).then(res => res.data)
}

const remove = (id) => {
  const config = { headers: { Authorization: token } }
  return axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, update, setToken, remove }
