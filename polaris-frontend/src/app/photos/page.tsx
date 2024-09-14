"use client";

import React, { useState, useEffect } from "react";

const ImageGallery = () => {
    const [imageIds, setImageIds] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch all image IDs from the backend
    useEffect(() => {
        async function fetchImageIds() {
            try {
              const response = await fetch('/api/image-ids');
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              console.log('Image IDs:', data);
            } catch (error) {
              console.error('Error fetching image IDs:', error);
            }
          }
          

        fetchImageIds();
    }, []);

    // Fetch images for each ID
    useEffect(() => {
        const fetchImages = async () => {
            const fetchedImages = await Promise.all(
                imageIds.map(async (id) => {
                    const response = await fetch(`/image/${id}`);
                    const blob = await response.blob();
                    return URL.createObjectURL(blob);
                })
            );
            setImages(fetchedImages);
            setLoading(false);
        };

        if (imageIds.length > 0) {
            fetchImages();
        }
    }, [imageIds]);

    if (loading) return <div>Loading images...</div>;

    return (
        <div>
            <h1>Image Gallery</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {images.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Image ${index}`}
                        style={{ width: "200px", height: "200px" }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
