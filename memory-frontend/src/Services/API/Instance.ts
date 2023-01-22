import axios from 'axios'
// export const baseURL = 'https://memoryv2.herokuapp.com/'
console.log(process.env)
export const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://memory-app-backend.vercel.app.com/'

const Instance = axios.create({
  baseURL: baseURL,
  headers: {
    'content-type': 'application/json',
    accept: 'application/json',
  },
  withCredentials: true,
})

export default Instance
