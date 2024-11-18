'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { extractFrames } from '@/services/api';

export default function VideoUploader() {
  const [frames, setFrames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const video = acceptedFiles[0];
    if (!video) return;

    setLoading(true);
    setError(null);

    try {
      const result = await extractFrames(video);
      setFrames(result.frames);
    } catch (err) {
      setError(err.message);
      console.error('Error processing video:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxFiles: 1
  });

  return (
    <div className="space-y-8">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the video here...</p>
        ) : (
          <p>Drag & drop a video file here, or click to select</p>
        )}
      </div>

      {loading && (
        <div className="text-center">
          <p>Processing video...</p>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center">
          <p>{error}</p>
        </div>
      )}

      {frames.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {frames.map((frame, index) => (
            <div key={index} className="relative group">
              <img 
                src={frame} 
                alt={`Frame ${index + 1}`}
                className="rounded-lg shadow-md"
              />
              <a 
                href={frame}
                download={`frame-${index + 1}.jpg`}
                className="absolute inset-0 bg-black bg-opacity-50 text-white 
                         flex items-center justify-center opacity-0 group-hover:opacity-100
                         transition-opacity duration-200"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 