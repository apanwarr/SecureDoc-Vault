import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { shareAPI } from '../../services/api.jsx'

const ShareView = () => {
  const { shareLink } = useParams()
  const [document, setDocument] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [accessorName, setAccessorName] = useState('')
  const [hasAccessed, setHasAccessed] = useState(false)

  useEffect(() => {
    fetchDocumentInfo()
  }, [shareLink])

  const fetchDocumentInfo = async () => {
    try {
      const docInfo = await shareAPI.getDocumentInfo(shareLink)
      setDocument(docInfo)
    } catch (error) {
      if (error.response?.status === 404) {
        setError('Document not found or link is invalid')
      } else if (error.response?.status === 410) {
        setError('This share link has expired')
      } else {
        setError('Failed to load document')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleAccess = async () => {
    if (!accessorName.trim()) {
      toast.error('Please enter your name')
      return
    }

    try {
      setLoading(true)
      const docData = await shareAPI.getDocument(shareLink, accessorName)
      setDocument(docData)
      setHasAccessed(true)
      toast.success('Document accessed successfully!')
    } catch (error) {
      if (error.response?.status === 410) {
        setError('This share link has expired')
      } else {
        toast.error('Failed to access document')
      }
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="spinner mx-auto border-white border-t-white/30"></div>
          <p className="text-white text-lg">Loading document...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center px-4">
        <div className="card p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.close()}
            className="btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center text-white mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-3xl">🔒</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">SecureDoc Vault</h1>
          <p className="text-white/80">Secure Document Sharing</p>
        </div>

        <div className="card p-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">📄</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{document.filename}</h2>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Shared by:</span> {document.owner}</p>
              <p><span className="font-medium">Uploaded:</span> {formatDate(document.uploadedAt)}</p>
              <p><span className="font-medium">Expires:</span> {formatDate(document.expiresAt)}</p>
            </div>
          </div>

          {!hasAccessed ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Enter your name to access this document</h3>
                <input
                  type="text"
                  placeholder="Your name (for access logging)"
                  value={accessorName}
                  onChange={(e) => setAccessorName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAccess()}
                  className="form-input"
                />
              </div>
              <button 
                onClick={handleAccess} 
                className="btn-primary w-full py-3"
              >
                Access Document
              </button>
              <p className="text-xs text-gray-500 text-center">
                Your access will be logged with the document owner
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4">
                  <span className="mr-1">✅</span>
                  Document Access Granted
                </div>
              </div>
              
              <div className="grid gap-3">
                <a
                  href={document.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-center flex items-center justify-center space-x-2"
                >
                  <span>📖</span>
                  <span>View Document</span>
                </a>
                {hasAccessed && (
                  <iframe
                    src={`${import.meta.env.VITE_API_URL}/api/share/${shareLink}/download`}
                    style={{ display: 'none' }}
                    title="hidden-download"
                  />
                )}
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm text-gray-600">
                <p className="flex items-center">
                  <span className="mr-2">✨</span>
                  Access logged successfully
                </p>
                <p className="flex items-center">
                  <span className="mr-2">🔗</span>
                  Link expires: {formatDate(document.expiresAt)}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-white/60 text-sm">
          <p>Powered by SecureDoc Vault</p>
        </div>
      </div>
    </div>
  )
}

export default ShareView