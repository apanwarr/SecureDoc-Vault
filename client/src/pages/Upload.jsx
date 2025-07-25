import { useState } from 'react';
import axios from '../utils/api';

const Upload = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('/api/files/upload', formData);
      alert('File uploaded successfully!');
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <input type="file" onChange={e => setFile(e.target.files[0])} className="mb-4" />
      <button onClick={handleUpload} className="bg-purple-600 text-white px-4 py-2 rounded">Upload</button>
    </div>
  );
};

export default Upload;