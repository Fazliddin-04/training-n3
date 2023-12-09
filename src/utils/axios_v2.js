import axios from 'axios'
import { store } from '@/store'

var request = axios.create({
  baseURL: import.meta.env.VITE_URL2,
  timeout: 60000,
})

// var waitingTime = 8000;

request.interceptors.request.use((config) => {
  var token = store.getState().auth?.user?.access_token
  if (token) {
    config.headers.Authorization = token // `Bearer ${token}`
  }
  return config
}, errorHandler)

request.interceptors.response.use((response) => response.data, errorHandler)

export function errorHandler(error) {
  return Promise.reject(error.response)
}

export default request
