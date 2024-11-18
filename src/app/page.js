'use client';

import VideoUploader from '../components/VideoUploader';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Video Frame Extractor
          </h1>
          <p className="text-gray-500">
            Upload your video to extract and optimize key frames
          </p>
        </div>
        <VideoUploader />
      </div>
    </main>
  );
} 