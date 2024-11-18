'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function VideoUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [frames, setFrames] = useState([]);

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
      // Simulated processing for now
      await new Promise(r => setTimeout(r, 2000));
      // Add dummy frames for UI testing
      setFrames([1,2,3,4,5,6].map(n => `https://picsum.photos/400/225?random=${n}`));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      {!selectedFile ? (
        <div 
          {...getRootProps()} 
          className={`drop-zone ${isDragActive ? 'active' : ''}`}
        >
          <input {...getInputProps()} />
          <svg 
            className="upload-icon"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <div className="text-center space-y-3">
            <h3 className="text-xl font-semibold text-gray-800">
              {isDragActive ? 'Drop your video here' : 'Upload your video'}
            </h3>
            <p className="text-gray-500">
              Drag and drop your video file here, or click to browse
            </p>
            <div className="text-sm text-gray-400 flex items-center justify-center space-x-2">
              <span>Supports:</span>
              {['.MP4', '.MOV', '.AVI'].map((format, i) => (
                <span 
                  key={format}
                  className="px-2 py-1 bg-gray-100 rounded-md text-gray-600"
                >
                  {format}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="file-preview">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg 
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {selectedFile.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSelectedFile(null)}
                  className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 
                           transition-colors duration-200"
                >
                  Change
                </button>
                <button
                  onClick={handleProcess}
                  disabled={loading}
                  className="process-button disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <svg className="loading-spinner" viewBox="0 0 24 24">
                        <circle 
                          className="opacity-25" 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="currentColor" 
                          strokeWidth="4"
                        />
                        <path 
                          className="opacity-75" 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Processing...</span>
                    </div>
                  ) : 'Process Video'}
                </button>
              </div>
            </div>
          </div>

          {frames.length > 0 && (
            <div className="frames-grid">
              {frames.map((frame, index) => (
                <div key={index} className="frame-card group">
                  <img 
                    src={frame} 
                    alt={`Frame ${index + 1}`}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 
                                group-hover:bg-opacity-40 transition-all duration-300">
                    <div className="absolute inset-0 flex items-center justify-center 
                                  opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button 
                        className="px-4 py-2 bg-white rounded-lg text-sm font-medium 
                                 text-gray-900 hover:bg-gray-100 transition-all duration-200
                                 transform scale-95 group-hover:scale-100"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 