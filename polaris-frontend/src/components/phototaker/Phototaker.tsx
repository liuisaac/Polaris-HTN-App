"use client";

import React, { useRef, useState, useEffect } from "react";

const PhotoTaker: React.FC = () => {
    const [photo, setPhoto] = useState<string | null>(null);
    const [facingMode, setFacingMode] = useState<"user" | "environment">(
        "user"
    );
    const [uploading, setUploading] = useState<boolean>(false); // For tracking upload status
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const startCamera = async () => {
        try {
            const constraints = {
                video: {
                    facingMode: facingMode,
                },
            };
            const stream = await navigator.mediaDevices.getUserMedia(
                constraints
            );
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
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                setPhoto(canvas.toDataURL("image/png")); // Capture as base64 image
            }
        }
    };

    const toggleCamera = () => {
        setFacingMode((prevMode) =>
            prevMode === "user" ? "environment" : "user"
        );
    };

    const submitPhoto = async () => {
        if (!photo) {
            alert("Please take a photo before submitting.");
            return;
        }
    
        // Convert base64 to a Blob (binary data) to mimic a file upload
        const base64Image = photo.split(",")[1];
        const byteCharacters = atob(base64Image);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "image/png" });
    
        const formData = new FormData();
        formData.append("image", blob, `photo_${Date.now()}.png`);
    
        try {
            const response = await fetch("http://localhost:8080/upload", {
                method: "POST",
                body: formData, // Use FormData
            });
    
            // Check if the response is OK and parse it as JSON
            const data = await response.json();
            
            if (response.ok) {
                alert(data.message);
            } else {
                console.error(data.error);
                alert(`Error uploading photo: ${data.error}`);
            }
        } catch (err) {
            console.error("Error uploading photo", err);
            alert("Error uploading photo. Please try again.");
        }
    };
    

    useEffect(() => {
        startCamera();
        return () => {
            const stream = videoRef.current?.srcObject as MediaStream;
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [facingMode]); // Restart camera when facingMode changes

    return (
        <div className="w-[80vw] h-[80vh] bg-[#21234B] border border-gray-200 rounded-2xl flex flex-col items-center justify-center">
            <div className="h-[20vh]">
                <span>Photo Number 1/2 </span>
                <span>Say Cheese :)</span>
            </div>

            <video
                ref={videoRef}
                autoPlay
                className="w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-[12px] bg-white mt-2"
            ></video>
            <div className="mt-4">
                <button
                    onClick={takePhoto}
                    className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                >
                    Take Photo
                </button>
                <button
                    onClick={toggleCamera}
                    className="bg-green-500 text-white py-2 px-4 rounded"
                >
                    Toggle Camera
                </button>
            </div>
            {photo && (
                <>
                    <img
                        src={photo}
                        alt="Captured"
                        className="mt-4 w-full max-w-sm rounded"
                    />
                    <button
                        onClick={submitPhoto}
                        className="bg-red-500 text-white py-2 px-4 rounded mt-4"
                        disabled={uploading} // Disable button during upload
                    >
                        {uploading ? "Uploading..." : "Submit Photo"}
                    </button>
                </>
            )}
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </div>
    );
};

export default PhotoTaker;
