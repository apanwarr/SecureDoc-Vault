import React from 'react'

const AccessLogs = ({ logs, onClose }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className="card p-6 sticky top-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <span className="text-xl mr-2">📊</span>
          Access Logs
        </h3>
        <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-4">
        {logs.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">👁️</div>
            <p className="font-medium text-gray-900 mb-1">No access logs yet</p>
            <p className="text-sm text-gray-500">
              Logs will appear when someone accesses your shared document
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                Total accesses: <span className="font-semibold">{logs.length}</span>
              </p>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
              {logs.map((log, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">👤</span>
                    <span className="font-medium text-gray-900">
                      {log.accessedBy || 'Anonymous'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 ml-6">
                    {formatDate(log.accessedAt)}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AccessLogs