import api from '../services/api.jsx'

export const getToken = () => {
  return localStorage.getItem('token')
}

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    localStorage.setItem('token', token)
  } else {
    delete api.defaults.headers.common['Authorization']
    localStorage.removeItem('token')
  }
}

export const isAuthenticated = () => {
  return !!getToken()
}