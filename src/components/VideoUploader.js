'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function VideoUploader() {
  const [frames, setFrames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxFiles: 1
  });

  const handleProcess = async () => {
    if (!selectedFile) return;
    
    setLoading(true);
    try {
      // API call will go here
      console.log('Processing file:', selectedFile);
      // Temporary timeout to simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the video file here...</p>
        ) : (
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <label 
              htmlFor="video-upload"
              className="cursor-pointer block p-4 hover:bg-gray-50"
            >
              Click to upload or drag and drop a video file
            </label>
          </div>
        )}
      </div>

      {loading && (
        <div className="text-center">
          <p>Processing video...</p>
        </div>
      )}

      {frames.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {frames.map((frame, index) => (
            <div key={index} className="relative">
              <img 
                src={frame} 
                alt={`Frame ${index + 1}`}
                className="rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 