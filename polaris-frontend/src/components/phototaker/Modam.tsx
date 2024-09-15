import Image from "next/image";
import React from "react";

interface ModamProps {
    frontImageUrl: string;
    backImageUrl: string;
    text: string;
    author: string;
    likes: string;
    setPopup: Function;
}

const Modam = ({
    frontImageUrl,
    backImageUrl,
    text,
    author,
    likes,
    setPopup,
}: ModamProps) => {
    return (
        <div
            className="w-screen h-screen bg-black bg-opacity-80 backdrop-blur-sm flex-col-centered"
            onClick={() => {
                setPopup(false);
            }}
        >
            <figure className="w-[18rem] h-[18rem] rounded-2xl overflow-hidden border-4 border-[#8308FF] z-20">
                <figure className="w-[18rem] h-[18rem] relative">
                    <Image
                        src={frontImageUrl}
                        alt={`Image ${frontImageUrl}`}
                        className="object-cover"
                        fill
                    />
                </figure>
            </figure>
            <figure className="w-[18rem] h-[18rem] rounded-2xl overflow-hidden border-4 border-white mt-2">
                <figure className="w-[18rem] h-[18rem] relative">
                    <Image
                        src={backImageUrl}
                        alt={`Image ${backImageUrl}`}
                        className="object-cover"
                        fill
                    />
                </figure>
            </figure>

            <span className="font-semibold text-4xl text-white h-12 mt-8">
                {text}
            </span>

            <div className="flex-row-centered">
                <span className="font-extralight text-white text-2xl">
                    Author:
                </span>
                <figure className="w-8 h-8 relative">
                    <Image
                        src={"/gallery/profile.svg"}
                        alt={`Image`}
                        className="object-cover"
                        fill
                    />
                </figure>
                <span className="font-extralight text-white text-2xl">
                    {author}
                </span>
            </div>

            <div className="flex-row-centered mt-5">
                <figure className="w-8 h-8 relative">
                    <Image
                        src={"/gallery/hollow_heart.svg"}
                        alt={`Image`}
                        className="object-cover"
                        fill
                    />
                </figure>
                <span className="font-extralight text-white text-2xl">
                    {likes} Likes
                </span>
            </div>
        </div>
    );
};

export default Modam;
