'use client';

import { useState } from 'react';

export default function VideoUploader() {
  const [frames, setFrames] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      // File handling logic will go here
      console.log('File selected:', file);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
          id="video-upload"
        />
        <label 
          htmlFor="video-upload"
          className="cursor-pointer block p-4 hover:bg-gray-50"
        >
          Click to upload or drag and drop a video file
        </label>
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