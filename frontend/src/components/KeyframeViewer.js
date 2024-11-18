import React from 'react';

const KeyframeViewer = ({ keyframes }) => {
  if (!keyframes || keyframes.length === 0) {
    return null;
  }

  return (
    <div className="keyframe-grid">
      {keyframes.map((frame, index) => (
        <div key={index} className="keyframe-item">
          <img 
            src={`http://localhost:8000${frame}`} 
            alt={`Keyframe ${index + 1}`}
            loading="lazy"
          />
        </div>
      ))}
      <style jsx>{`
        .keyframe-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
          padding: 1rem;
        }
        .keyframe-item img {
          width: 100%;
          height: auto;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default KeyframeViewer;