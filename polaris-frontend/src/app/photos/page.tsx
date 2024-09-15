"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

const ImageGallery = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // Fetch all image IDs from the backend
  useEffect(() => {
    async function fetchImageIds() {
      try {
        const response = await fetch("http://localhost:8080/image-ids");
        const data = await response.json();
        console.log("Image IDs:", data);
        fetchImages(data); // Fetch images after getting the IDs
      } catch (error) {
        console.error("Error fetching image IDs:", error);
      }
    }

    async function fetchImages(imageIds: string[]) {
      try {
        const urls = await Promise.all(
          imageIds.map(async (id) => {
            const response = await fetch(`http://localhost:8080/image/${id}/imgf`);
            const blob = await response.blob(); // Fetch the image as a blob
            const imageUrl = URL.createObjectURL(blob); // Create an object URL for the image
            return imageUrl;
          })
        );
        setImageUrls(urls); // Set the image URLs for rendering
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImageIds();
  }, []);

  return (
    <div className="w-screen bg-space-blue min-h-[100vh]">
      <h1 className="text-white text-center">Image Gallery</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {imageUrls.map((url, index) => (
          <figure key={index} className="w-36 h-36 relative">
            <Image
              src={url}
              alt={`Image ${index}`}
              className="object-contain"
              fill
            />
          </figure>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
