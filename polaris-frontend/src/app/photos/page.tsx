"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

const ImageGallery = () => {
    const [imageUrls, setImageUrls] = useState<string[][]>([]);

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
                        const frontResponse = await fetch(
                            `http://localhost:8080/image/${id}/imgf`
                        );
                        const backResponse = await fetch(
                            `http://localhost:8080/image/${id}/imgb`
                        );
                        const frontBlob = await frontResponse.blob(); // Fetch the image as a blob
                        const backBlob = await backResponse.blob(); // Fetch the image as a blob
                        const frontImageUrl = URL.createObjectURL(frontBlob); // Create an object URL for the image
                        const backImageUrl = URL.createObjectURL(backBlob); // Create an object URL for the image

                        return [frontImageUrl, backImageUrl];
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
        <div className="w-screen bg-space-blue min-h-[100vh] pt-24">
            <h1 className="sm:hidden flex-col-centered text-4xl font-bold tracking-tighter font-saira z-10">
                <span className="text-white">Hack the North's</span>
                <span className="text-5xl bg-gradient-to-r from-[#fb881c] to-[#6C38FF] inline-block text-transparent bg-clip-text pb-2 font-bold">
                    Hacker Gallery
                </span>
            </h1>
            <div className="flex-col-centered gap-4 justify-center mt-12">
                {imageUrls.map((url, index) => (
                    <div>
                        <figure className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-[#8308FF] rotate-12 z-20 ml-20">
                            <figure key={index} className="w-48 h-48 relative">
                                <Image
                                    src={url[0]}
                                    alt={`Image ${index}`}
                                    className="object-cover"
                                    fill
                                />
                            </figure>
                        </figure>
                        <figure className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-white -rotate-12 -mt-[11rem] mr-20 mb-4">
                            <figure key={index} className="w-48 h-48 relative">
                                <Image
                                    src={url[1]}
                                    alt={`Image ${index}`}
                                    className="object-cover"
                                    fill
                                />
                            </figure>
                        </figure>
                        <div className="h-36 flex flex-col items-start justify-center">
                            <span className="font-semibold text-4xl text-white h-12">
                                Grinding at IKB
                            </span>
                            <div className="flex-row-centered">
                                <div className="flex-row-centered">
                                    <figure
                                        key={index}
                                        className="w-8 h-8 relative"
                                    >
                                        <Image
                                            src={"/gallery/profile.svg"}
                                            alt={`Image ${index}`}
                                            className="object-cover"
                                            fill
                                        />
                                    </figure>
                                    <span className="font-extralight text-white text-2xl">James Wong</span>
                                </div>
                                <div className="flex-row-centered ml-8">
                                    <figure
                                        key={index}
                                        className="w-8 h-8 relative"
                                    >
                                        <Image
                                            src={"/gallery/hollow_heart.svg"}
                                            alt={`Image ${index}`}
                                            className="object-cover"
                                            fill
                                        />
                                    </figure>
                                    <span className="font-extralight text-white text-2xl ml-1">{17}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
