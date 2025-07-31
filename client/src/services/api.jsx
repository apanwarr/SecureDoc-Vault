import axios from 'axios'
import { toast } from 'react-toastify'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
      toast.error('Session expired. Please login again.')
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },
  
  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  }
}

export const documentsAPI = {
  upload: async (formData) => {
    const response = await api.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },
  
  getAll: async () => {
    const response = await api.get('/documents')
    return response.data
  },
  
  getAccessLogs: async (documentId) => {
    const response = await api.get(`/documents/${documentId}/logs`)
    return response.data
  },
  
  delete: async (documentId) => {
    const response = await api.delete(`/documents/${documentId}`)
    return response.data
  }
}

export const shareAPI = {  
  getDocumentInfo: async (shareLink) => {
    const response = await api.get(`/share/${shareLink}`);
    return response.data;
  },
  getDocument: async (shareLink, accessorName) => {
    const response = await api.post(`/share/${shareLink}/access`, {
      accessorName
    });
    return response.data;
  }
}

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me')
  return response.data
}

export default api;