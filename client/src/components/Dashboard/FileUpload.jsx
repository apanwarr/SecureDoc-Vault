import React, { useState } from 'react'

const FileUpload = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'image/jpeg',
    'image/png'
  ]

  const handleFileSelect = (file) => {
    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type. Only PDF, DOC, DOCX, TXT, JPG, PNG are allowed.')
      return
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB
      alert('File size must be less than 10MB')
      return
    }

    setSelectedFile(file)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    try {
      await onUpload(selectedFile)
      setSelectedFile(null)
    } catch (error) {
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span className="text-2xl mr-2">📤</span>
        Upload New Document
      </h3>
      
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          dragActive 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          <div className="text-6xl">☁️</div>
          <div>
            <p className="text-gray-600 mb-2">Drag and drop your file here, or</p>
            <input
              type="file"
              id="file-input"
              accept=".pdf,.doc,.docx,.txt,.jpg,.png"
              onChange={(e) => handleFileSelect(e.target.files[0])}
              className="hidden"
            />
            <label 
              htmlFor="file-input" 
              className="btn-primary cursor-pointer inline-block"
            >
              Choose File
            </label>
          </div>
          <p className="text-sm text-gray-500">
            Supported: PDF, DOC, DOCX, TXT, JPG, PNG (Max 10MB)
          </p>
        </div>
      </div>

      {selectedFile && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📄</span>
              <div>
                <p className="font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-gray-400 hover:text-gray-600 text-xl"
              disabled={uploading}
            >
              ✕
            </button>
          </div>
          
          <button
            onClick={handleUpload}
            className="btn-success w-full"
            disabled={uploading}
          >
            {uploading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="spinner w-4 h-4 border-2 border-white border-t-white/30"></div>
                <span>Uploading...</span>
              </div>
            ) : (
              'Upload Document'
            )}
          </button>
        </div>
      )}
    </div>
  )
}

export default FileUpload