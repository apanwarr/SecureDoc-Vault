import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import FileUpload from './FileUpload.jsx'
import DocumentCard from './DocumentCard.jsx'
import AccessLogs from './AccessLogs.jsx'
import { documentsAPI } from '../../services/api.jsx'

const Dashboard = ({ user }) => {
  const [documents, setDocuments] = useState([])
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [accessLogs, setAccessLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      const docs = await documentsAPI.getAll()
      setDocuments(docs)
    } catch (error) {
      toast.error('Failed to fetch documents')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      await documentsAPI.upload(formData)
      toast.success('File uploaded successfully!')
      fetchDocuments()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed')
    }
  }

  const handleViewLogs = async (documentId) => {
    try {
      const logs = await documentsAPI.getAccessLogs(documentId)
      setAccessLogs(logs)
      setSelectedDocument(documentId)
    } catch (error) {
      toast.error('Failed to fetch access logs')
    }
  }

  const handleDeleteDocument = async (documentId) => {
    if (!window.confirm('Are you sure you want to delete this document?')) {
      return
    }

    try {
      await documentsAPI.delete(documentId)
      toast.success('Document deleted successfully')
      fetchDocuments()
      if (selectedDocument === documentId) {
        setSelectedDocument(null)
        setAccessLogs([])
      }
    } catch (error) {
      toast.error('Failed to delete document')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center space-y-4">
          <div className="spinner mx-auto"></div>
          <p className="text-gray-600">Loading your documents...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Secure Documents</h2>
        <p className="text-gray-600">Upload, share, and track your documents securely</p>
      </div>

      <FileUpload onUpload={handleFileUpload} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Documents ({documents.length})
            </h3>
          </div>
          
          {documents.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="text-6xl mb-4">📁</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">No documents yet</h4>
              <p className="text-gray-600">Upload your first document to get started</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {documents.map((doc) => (
                <DocumentCard
                  key={doc._id}
                  document={doc}
                  onViewLogs={handleViewLogs}
                  onDelete={handleDeleteDocument}
                />
              ))}
            </div>
          )}
        </div>

        {selectedDocument && (
          <div className="lg:col-span-1">
            <AccessLogs
              logs={accessLogs}
              onClose={() => {
                setSelectedDocument(null)
                setAccessLogs([])
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard