import { useState } from 'react'

const DocumentCard = ({ document, onViewLogs, onDelete }) => {
  const [showQR, setShowQR] = useState(false)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getFileIcon = (filename) => {
    const ext = filename.toLowerCase().split('.').pop()
    switch (ext) {
      case 'pdf': return '📄'
      case 'doc':
      case 'docx': return '📝'
      case 'txt': return '📃'
      case 'jpg':
      case 'jpeg':
      case 'png': return '🖼️'
      default: return '📁'
    }
  }

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(document.shareLink)
      alert('Share link copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const isExpired = new Date() > new Date(document.expiresAt)

  return (
    <div className={`card-hover p-6 ${isExpired ? 'opacity-75 border-red-200' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <span className="text-3xl flex-shrink-0">{getFileIcon(document.originalName)}</span>
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-gray-900 truncate" title={document.originalName}>
              {document.originalName}
            </h4>
            <p className="text-sm text-gray-500">
              Uploaded: {formatDate(document.createdAt)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            isExpired 
              ? 'bg-red-100 text-red-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {isExpired ? '🔴 Expired' : '🟢 Active'}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Expires:</span> {formatDate(document.expiresAt)}
        </p>
      </div>

      {!isExpired && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex flex-wrap gap-2 mb-3">
            <button 
              onClick={copyShareLink} 
              className="btn-secondary text-sm flex items-center space-x-1"
            >
              <span>📋</span>
              <span>Copy Link</span>
            </button>
            <button
              onClick={() => setShowQR(!showQR)}
              className="btn-secondary text-sm flex items-center space-x-1"
            >
              <span>{showQR ? '❌' : '📱'}</span>
              <span>{showQR ? 'Hide QR' : 'Show QR'}</span>
            </button>
          </div>
          
          {showQR && document.qrCode && (
            <div className="text-center">
              <img 
                src={document.qrCode} 
                alt="QR Code" 
                className="w-32 h-32 mx-auto mb-2 border rounded-lg"
              />
              <p className="text-xs text-gray-600">Scan to access document</p>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
        <button
          onClick={() => onViewLogs(document._id)}
          className="btn-secondary text-sm flex items-center space-x-1"
        >
          <span>👁️</span>
          <span>View Logs</span>
        </button>
        <button
          onClick={() => onDelete(document._id)}
          className="btn-danger text-sm flex items-center space-x-1"
        >
          <span>🗑️</span>
          <span>Delete</span>
        </button>
      </div>
    </div>
  )
}

export default DocumentCard