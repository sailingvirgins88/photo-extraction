'use client';

import VideoUploader from '../components/VideoUploader';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Video Frame Extractor
          </h1>
          <p className="text-lg text-gray-600">
            Extract high-quality keyframes from your videos in seconds
          </p>
        </div>
        <VideoUploader />
      </div>
    </main>
  );
} 