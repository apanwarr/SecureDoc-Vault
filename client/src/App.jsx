import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// Components
import Login from './components/Auth/Login.jsx'
import Register from './components/Auth/Register.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import ShareView from './components/Shared/ShareView.jsx'
import Layout from './components/Layout/Layout.jsx'

// Services
import { getCurrentUser } from './services/api.jsx'
import { getToken, setAuthToken } from './utils/auth.jsx'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken()
      if (token) {
        setAuthToken(token)
        try {
          const userData = await getCurrentUser()
          setUser(userData)
        } catch (error) {
          console.error('Auth initialization failed:', error)
          localStorage.removeItem('token')
        }
      }
      setLoading(false)
    }

    initializeAuth()
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    toast.success(`Welcome back, ${userData.name}!`)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setAuthToken(null)
    setUser(null)
    toast.info('Logged out successfully')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-primary">
        <div className="text-center space-y-4">
          <div className="spinner mx-auto border-white border-t-white/30"></div>
          <p className="text-white text-lg font-medium">Loading SecureDoc Vault...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="App min-h-screen">
      <Routes>
        {/* Public Routes */}
        <Route path="/share/:shareLink" element={<ShareView />} />
        
        {/* Auth Routes */}
        {!user ? (
          <>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={
              <Layout user={user} onLogout={handleLogout}>
                <Dashboard user={user} />
              </Layout>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </div>
  )
}

export default App