"use client"

import React, { useRef, useState, useEffect } from 'react';

const PhotoTaker: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user'); // 'user' for front camera, 'environment' for back camera
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: facingMode,
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing webcam", err);
    }
  };

  const takePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setPhoto(canvas.toDataURL('image/png'));
      }
    }
  };

  const toggleCamera = () => {
    setFacingMode(prevMode => (prevMode === 'user' ? 'environment' : 'user'));
  };

  useEffect(() => {
    startCamera();
    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]); // Restart camera when facingMode changes

  return (
    <div className='w-[80vw] h-[80vh] bg-gray-200 rounded-2xl flex flex-col items-center justify-center'>
      <video ref={videoRef} autoPlay className='w-full h-full rounded-2xl'></video>
      <div className='mt-4'>
        <button onClick={takePhoto} className='bg-blue-500 text-white py-2 px-4 rounded mr-2'>
          Take Photo
        </button>
        <button onClick={toggleCamera} className='bg-green-500 text-white py-2 px-4 rounded'>
          Toggle Camera
        </button>
      </div>
      {photo && <img src={photo} alt="Captured" className='mt-4 w-full max-w-sm rounded' />}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default PhotoTaker;
