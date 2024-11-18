from http.server import BaseHTTPRequestHandler
from katna.video import Video
from katna.frame_extractor import FrameExtractor
import json
import os
import base64
from io import BytesIO
from PIL import Image

def process_video(video_path, num_frames=10):
    video = Video()
    output_dir = "/tmp/extracted_frames"
    os.makedirs(output_dir, exist_ok=True)
    
    frames = video.extract_frames_as_images(
        video_path=video_path,
        num_frames=num_frames,
        save_dir=output_dir
    )
    
    # Convert frames to base64 for sending to frontend
    frame_data = []
    for frame_path in frames:
        with Image.open(frame_path) as img:
            # Resize for optimization if needed
            img.thumbnail((800, 800))
            buffered = BytesIO()
            img.save(buffered, format="JPEG", quality=85)
            img_str = base64.b64encode(buffered.getvalue()).decode()
            frame_data.append(f"data:image/jpeg;base64,{img_str}")
        
        # Cleanup the temporary file
        os.remove(frame_path)
    
    return frame_data

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        # Save uploaded file temporarily
        temp_path = "/tmp/temp_video.mp4"
        with open(temp_path, "wb") as f:
            f.write(post_data)
        
        try:
            frames = process_video(temp_path)
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            response = json.dumps({"frames": frames})
            self.wfile.write(response.encode())
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
        
        finally:
            # Cleanup
            if os.path.exists(temp_path):
                os.remove(temp_path) 