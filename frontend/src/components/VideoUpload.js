import React, { useState } from 'react';
import KeyframeViewer from './KeyframeViewer';

const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [keyframes, setKeyframes] = useState([]);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('num_frames', '5');
    setUploading(true);

    try {
      const response = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setKeyframes(data.keyframes);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileSelect} />
      <button 
        onClick={handleUpload} 
        disabled={!selectedFile || uploading}
      >
        {uploading ? 'Processing...' : 'Upload Video'}
      </button>
      <KeyframeViewer keyframes={keyframes} />
    </div>
  );
};

export default VideoUpload; 