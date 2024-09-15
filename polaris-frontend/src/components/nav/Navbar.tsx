"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
//comment for commiting
const Navbar = () => {
    const [hamburger, setHamburger] = useState(false);
    return (
        <nav className="w-screen h-12 bg-[#141414] flex-col-centered z-50 fixed top-0 font-saira font-medium tracking-tighter italic">
            <div className="w-[100vw] flex-row-centered h-12 z-10">
                <Link className="relative w-40 h-12 ml-4" href="/">
                    <Image
                        src="/logo/white_logo.svg"
                        className="hover:fill-black fill-white"
                        alt="polaris logo"
                        style={{ objectFit: "contain" }}
                        fill
                    />
                </Link>
                <div className="w-full"></div>
                <button
                    className={`relative w-40 h-12 ${
                        hamburger ? "hidden" : "flex"
                    }`}
                    onClick={() => {
                        setHamburger(true);
                    }}
                >
                    <Image
                        src="/nav/hamburger_menu.svg"
                        className="hover:fill-black fill-white"
                        alt="polaris logo"
                        style={{ objectFit: "contain" }}
                        fill
                    />
                </button>
                <button
                    className={`relative w-40 h-8 ${
                        hamburger ? "flex" : "hidden"
                    }`}
                    onClick={() => {
                        setHamburger(false);
                    }}
                >
                    <Image
                        src="/nav/close_menu.svg"
                        className="hover:fill-black fill-white"
                        alt="polaris logo"
                        style={{ objectFit: "contain" }}
                        fill
                    />
                </button>
            </div>

            <section
                className={`${
                    hamburger ? "flex-col-centered" : "hidden"
                } absolute w-screen h-screen bg-black top-0 text-white font-baumans`}
            >
                {[
                    ["home", "/"],
                    ["maps", "/maps"],
                    ["photos", "/photos"],
                    ["events", "/events"],
                ].map(([title, url, delay]) => (
                    <a
                        href={url}
                        className={`rounded-lg px-3 py-8 text-5xl`}
                        onClick={() => {
                            setHamburger(false);
                        }}
                        key={title}
                    >
                        {title}
                    </a>
                ))}
            </section>
        </nav>
    );
};

export default Navbar;
