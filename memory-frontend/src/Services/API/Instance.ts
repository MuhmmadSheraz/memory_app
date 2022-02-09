import axios from 'axios'
export const baseURL = 'http://127.0.0.1:3002'

const Instance = axios.create({
  baseURL: baseURL,
  headers: {
    'content-type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
})
export default Instance
