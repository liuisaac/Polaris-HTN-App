"use client";

import Modam from "@/components/phototaker/Modam";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const ImageGallery = () => {
    const [imageUrls, setImageUrls] = useState<string[][]>([]);
    const [popup, setPopup] = useState(false);
    const [firstUrl, setFirstUrl] = useState("");
    const [secondUrl, setSecondUrl] = useState("");
    const [text, setText] = useState("");
    const [author, setAuthor] = useState("");
    const [likes, setLikes] = useState("");

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
                        
                        const imageData = await fetch(
                            `http://localhost:8080/${id}`
                        );

                        const json = await imageData.json();
                        const caption = json.caption || ""; // Use default if not present
                        const author = json.author || "";   // Use default if not present


                        return [frontImageUrl, backImageUrl, caption, author];
                    })
                );
                setImageUrls(urls.reverse()); // Reverse the image URLs before setting them in the state
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
                {imageUrls.map((url, index) => {
                    // Ensure the title, author, and likes correspond to the image index
                    const [title, author, likes = "0"] = [url[2], url[3], "0"];

                    return (
                        <div
                            key={index}
                            onClick={() => {
                                setPopup(true);
                                setFirstUrl(url[0]);
                                setSecondUrl(url[1]);
                                setText(title || "");
                                setAuthor(author || "");
                                setLikes(likes || "0");
                            }}
                        >
                            <figure className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-[#8308FF] rotate-12 z-20 ml-20">
                                <figure className="w-48 h-48 relative">
                                    <Image
                                        src={url[0]}
                                        alt={`Image ${index} front`}
                                        className="object-cover"
                                        fill
                                    />
                                </figure>
                            </figure>
                            <figure className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-white -rotate-12 -mt-[11rem] mr-20 mb-4">
                                <figure className="w-48 h-48 relative">
                                    <Image
                                        src={url[1]}
                                        alt={`Image ${index} back`}
                                        className="object-cover"
                                        fill
                                    />
                                </figure>
                            </figure>
                            <div className="h-36 flex flex-col items-start justify-center">
                                <span className="font-semibold text-4xl text-white h-12 text-center">
                                    {title || "Untitled"}
                                </span>
                                <div className="flex-row-centered">
                                    <div className="flex-row-centered">
                                        <figure className="w-8 h-8 relative">
                                            <Image
                                                src={"/gallery/profile.svg"}
                                                alt={`Profile ${index}`}
                                                className="object-cover"
                                                fill
                                            />
                                        </figure>
                                        <span className="font-extralight text-white text-2xl">
                                            {author || "Unknown"}
                                        </span>
                                    </div>
                                    <div className="flex-row-centered ml-8">
                                        <figure className="w-8 h-8 relative">
                                            <Image
                                                src={"/gallery/hollow_heart.svg"}
                                                alt={`Likes ${index}`}
                                                className="object-cover"
                                                fill
                                            />
                                        </figure>
                                        <span className="font-extralight text-white text-2xl ml-1">
                                            {likes || "0"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={`${!popup ? "hidden" : "flex"} fixed top-0 z-40`}>
                <Modam
                    frontImageUrl={firstUrl}
                    backImageUrl={secondUrl}
                    text={text}
                    author={author}
                    likes={likes}
                    setPopup={setPopup}
                />
            </div>
        </div>
    );
};

export default ImageGallery;
