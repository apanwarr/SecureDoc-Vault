import React from 'react'

const Header = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-soft border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="flex items-center space-x-2 text-2xl font-bold text-gradient">
            <span className="text-3xl">🔒</span>
            <span>SecureDoc Vault</span>
          </h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
            </div>
            
            <button 
              onClick={onLogout} 
              className="btn-secondary text-sm"
              title="Logout"
            >
              Logout
            </button>
            
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header