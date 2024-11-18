 from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .services.video_processor import VideoProcessingService
import os

app = FastAPI()
video_processor = VideoProcessingService()

# ... (previous CORS and static file configuration) ...

@app.post("/api/upload")
async def upload_video(
    file: UploadFile = File(...),
    num_frames: int = 5
):
    # Validate video file
    if not file.content_type.startswith("video/"):
        raise HTTPException(400, "File must be a video")
    
    # Save uploaded file
    file_path = f"uploads/{file.filename}"
    os.makedirs("uploads", exist_ok=True)
    
    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    try:
        # Process video and extract keyframes
        keyframe_paths = await video_processor.process_video(
            file_path,
            num_frames=num_frames
        )
        
        return {
            "filename": file.filename,
            "status": "completed",
            "keyframes": keyframe_paths
        }
    except Exception as e:
        raise HTTPException(500, str(e))