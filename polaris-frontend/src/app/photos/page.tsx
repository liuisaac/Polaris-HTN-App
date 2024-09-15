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

    // Define titles with placeholders for likes
    const titles = [
        ["Late night coding", "Alizeh Larab", "6"],
        ["Broke but coding", "Isaac Liu", "0"],
        ["Running on coffee", "Baljeet Balyeet", "2"],
        ["Networking pros", "Mo Saleh", "0"],
        ["Lost in code", "Jonathan Paneva", "6"],
        ["Finished on time", "Zi Yi Zou", "17"],
        ["Chatting with hackers", "William Tang", "0"],
        ["Debugging at night", "Aisha Khan", "8"],
        ["Code, coffee, repeat", "Nina Patel", "12"],
        ["Pitching ideas late", "Samuel Grant", "7"],
        ["Struggling through", "Olivia Brown", "15"],
        ["Making it work", "Liam Martinez", "5"],
        ["Chasing deadlines", "Sophia Lee", "9"],
        ["AI in code", "Ethan Johnson", "20"],
        ["Robotics and Red Bull", "Emma Wilson", "14"],
        ["Game dev dilemmas", "Noah Smith", "3"],
        ["Design and debug", "Isabella Davis", "11"],
        ["VR vibes", "James Rodriguez", "6"],
        ["Securing the future", "Mia Clark", "13"],
        ["Blockchain buzz", "Lucas Lewis", "18"],
        ["Data science crunch", "Charlotte Walker", "10"],
        ["Web woes and wins", "Benjamin Hall", "7"],
        ["AR excitement", "Avery Allen", "16"],
        ["Deep learning dreams", "Zoe Young", "22"],
        ["Machine learning", "Jacob King", "12"],
        ["Engineering highs", "Grace Wright", "9"],
        ["Quantum leaps", "Alexander Scott", "11"],
        ["Coding chaos", "Chloe Baker", "4"],
        ["Trendy tech talk", "Michael Carter", "17"],
        ["Innovative ideas", "Harper Mitchell", "14"],
        ["Engineering goals", "Ella Adams", "8"],
        ["AI breakthroughs", "William Evans", "19"],
        ["Tech meets reality", "Aiden Collins", "5"],
        ["Startup struggles", "Scarlett Turner", "12"],
        ["Good tech vibes", "Mason Parker", "7"],
        ["Gadget obsession", "Madison Lewis", "9"],
        ["Digital evolution", "Elijah Hall", "16"],
        ["Tech dreams", "Lily Young", "13"],
        ["Smart solutions", "James Carter", "10"],
        ["Robotics redefined", "Sofia Hernandez", "14"],
        ["Tech adventures", "Oliver Wright", "8"],
        ["Next-gen innovations", "Emily King", "17"],
        ["Visionary tech", "Jack Green", "18"],
        ["Gadget fever", "Layla Mitchell", "15"],
        ["Cutting-edge tech", "Daniel Scott", "21"],
        ["Tech tales", "Evelyn Hill", "12"],
        ["Exploring tech", "Henry Young", "11"],
        ["Insightful tech", "Riley Brown", "14"],
        ["VR dreams", "Aaron Davis", "13"],
        ["Challenge accepted", "Aria Nelson", "16"],
        ["Future code", "Owen Adams", "8"],
        ["Tech revelations", "Bella Evans", "9"],
        ["Inspiring tech", "Sebastian Harris", "15"],
        ["Visionary projects", "Stella Walker", "11"],
        ["Coding fantasies", "Isaiah Robinson", "10"],
        ["New tech horizons", "Nora Martinez", "12"],
        ["Future tech", "Gabriel Walker", "13"],
        ["Breakthroughs", "Zara White", "14"],
        ["Engineering wonders", "Leo Carter", "18"],
        ["Emerging tech", "Aurora Lewis", "15"],
        ["Tech breakthroughs", "Wyatt Hall", "20"],
        ["Innovative dreams", "Piper Anderson", "16"],
        ["Late night debugging", "Haruki Tanaka", "10"],
        ["Code and ramen", "Mei Lin", "7"],
        ["In the zone", "Satoshi Nakamura", "15"],
        ["Fueled by caffeine", "Yumi Tanaka", "12"],
        ["Hustling for the win", "Kaito Suzuki", "18"],
        ["Breakthrough ideas", "Aiko Yamamoto", "13"],
        ["Dreaming in algorithms", "Hana Lee", "17"],
        ["Tech hustle", "Jin Park", "9"],
        ["Innovation on the go", "Ming Zhao", "20"],
        ["Code for days", "Riko Nakamura", "14"],
        ["Debugging dilemmas", "Hiroshi Matsumoto", "11"],
        ["Tech wizardry", "Lian Wu", "16"],
        ["Coding marathon", "Naomi Chang", "8"],
        ["Late-night brainstorming", "Taro Yamada", "15"],
        ["Winning with code", "Soo-jin Kim", "13"]
    ];    
    

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
                    const [title, author, likes = "0"] = titles[index] || [];

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
