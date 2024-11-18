const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export async function extractFrames(videoFile) {
  const formData = new FormData();
  formData.append('video', videoFile);

  try {
    const response = await fetch(`${API_URL}/extract-frames`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to process video');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to process video');
  }
} 