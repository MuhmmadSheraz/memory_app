import axios from 'axios'
// export const baseURL = 'https://mymemoryapp111.herokuapp.com'
export const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://mymemoryapp111.herokuapp.com'

const Instance = axios.create({
  baseURL: baseURL,
  headers: {
    'content-type': 'application/json',
    accept: 'application/json',
  },
  withCredentials: true,
})

export default Instance
