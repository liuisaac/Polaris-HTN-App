"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";

const PhotoTaker: React.FC = () => {
    const router = useRouter();
    const [photo, setPhoto] = useState<string | null>(null);
    const [photo2, setPhoto2] = useState<string | null>(null);
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
                if (photo) {
                    setPhoto2(canvas.toDataURL("image/png"));
                } else {
                    setPhoto(canvas.toDataURL("image/png")); // Capture as base64 image
                }
            }
        }
    };

    const toggleCamera = () => {
        setFacingMode((prevMode) =>
            prevMode === "user" ? "environment" : "user"
        );
    };

    const submitPhoto = async () => {
        if (!photo || !photo2) {
            alert("Please take both photos before submitting.");
            return;
        }

        const convertBase64ToBlob = (base64Image: string): Blob => {
            // Remove the data URL prefix if present
            const base64Data = base64Image.split(",")[1];
            if (!base64Data) {
                throw new Error("Invalid base64 string");
            }

            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            return new Blob([byteArray], { type: "image/png" });
        };

        const base64ImageFront = photo; // Base64 string for the front image
        const blobFront = convertBase64ToBlob(base64ImageFront);

        const base64ImageBack = photo2; // Base64 string for the back image
        const blobBack = convertBase64ToBlob(base64ImageBack);

        const formData = new FormData();
        formData.append("namef", `photo_front_${Date.now()}.png`); // Image name for the front
        formData.append("imgf", blobFront); // Image data for the front
        formData.append("nameb", `photo_back_${Date.now()}.png`); // Image name for the front
        formData.append("imgb", blobBack); // Image data for the back

        try {
            const response = await fetch("http://localhost:8080/upload", {
                method: "POST",
                body: formData, // Use FormData
            });

            // Check if the response is OK and parse it as JSON
            const data = await response.json();

            if (response.ok) {
                router.push("/photos");
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
            <div className="h-24 text-white font-saira flex-col-centered">
                <span className="text-3xl font-medium">
                    Photo Number {photo ? "2/2" : "1/2"}{" "}
                </span>
                <span>{photo ? "Say Cheese Again :)" : "Say Cheese :)"}</span>
            </div>
            {!photo ? (
                <>
                    <video
                        ref={videoRef}
                        autoPlay
                        className="w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-[12px] bg-white mt-2"
                    ></video>
                </>
            ) : !photo2 ? (
                <>
                    <video
                        ref={videoRef}
                        autoPlay
                        className="w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-[12px] bg-white mt-2"
                    ></video>
                    <figure className="left-0 top-0 mt-[20vh] ml-[15vw] w-[calc(30%-16px)] h-[calc(20%-16px)] rounded-[12px] bg-white absolute">
                        <Image
                            src={photo}
                            alt="Captured"
                            style={{ objectFit: "cover" }}
                            fill
                        />
                    </figure>
                </>
            ) : (
                <>
                    <video
                        ref={videoRef}
                        autoPlay
                        className="w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-[12px] bg-white mt-2"
                    ></video>
                    <figure className="left-0 top-0 mt-[20vh] ml-[15vw] w-[calc(30%-16px)] h-[calc(20%-16px)] rounded-[12px] bg-white absolute">
                        <Image
                            src={photo}
                            alt="Captured"
                            style={{ objectFit: "cover" }}
                            fill
                        />
                    </figure>
                    <figure className="right-0 top-0 mt-[20vh] mr-[15vw] w-[calc(30%-16px)] h-[calc(20%-16px)] rounded-[12px] bg-white absolute">
                        <Image
                            src={photo2}
                            alt="Captured"
                            style={{ objectFit: "cover" }}
                            fill
                        />
                    </figure>
                </>
            )}

            <div className="mt-4 h-56 flex-col-centered">
                <div className="flex-row-centered">
                    <button
                        onClick={toggleCamera}
                        className="bg-[#141414] rounded-full text-white w-12 h-12 relative"
                    >
                        <Image
                            src="/cam/flash_button.svg"
                            className="hover:fill-black fill-white scale-[0.8]"
                            alt="polaris logo"
                            style={{ objectFit: "contain" }}
                            fill
                        />
                    </button>
                    <button
                        onClick={takePhoto}
                        className="bg-transparent text-white w-16 h-16 rounded mx-10 relative"
                    >
                        <Image
                            src="/cam/picture_button.svg"
                            className="hover:fill-black fill-white"
                            alt="polaris logo"
                            style={{ objectFit: "contain" }}
                            fill
                        />
                    </button>
                    <button
                        onClick={toggleCamera}
                        className="bg-[#141414] rounded-full text-white w-12 h-12 relative"
                    >
                        <Image
                            src="/cam/reverse_button.svg"
                            className="hover:fill-black fill-white"
                            alt="polaris logo"
                            style={{ objectFit: "contain" }}
                            fill
                        />
                    </button>
                </div>
                <button
                    onClick={submitPhoto}
                    disabled={!photo2}
                    className={`${
                        !photo2 ? "bg-[#141414]" : "bg-[#160546]"
                    } rounded-full ${
                        !photo2 ? "text-gray-200" : "text-white"
                    } font-semibold tracking-wide w-full h-10 mt-5 relative`}
                >
                    SUBMIT PHOTO
                </button>
            </div>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </div>
    );
};

export default PhotoTaker;
