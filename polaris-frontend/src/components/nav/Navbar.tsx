"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
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

                {/* <figure className="w-2/3 flex-row-end">
                    <div
                        className="relative w-8 h-5"
                        onClick={() => {
                            setHamburger(!hamburger);
                        }}
                    >
                        <Image
                            src="/nav/hamburger_ico.svg"
                            alt="western mechatronics logo"
                            style={{ objectFit: "contain" }}
                            fill
                        />
                    </div>
                </figure>
            </div>
            <div
                className={`z-50 w-sx-row-h-screen top-0 absolute bg-white backdrop-blur-sm ${
                    hamburger
                        ? "bg-opacity-95 opacity-100"
                        : "opacity-0 pointer-events-none"
                } transition-opacity duration-500 ease-in-out`}
            >
                <div className="w-screen h-[10vh]">
                    <figure className="w-full flex-row-end">
                        <div
                            className="relative w-5 h-5 my-6 mx-6"
                            onClick={() => {
                                setHamburger(false);
                            }}
                        >
                            <Image
                                src="/nav/close_ico.svg"
                                alt="western mechatronics logo"
                                style={{ objectFit: "contain" }}
                                fill
                            />
                        </div>
                    </figure>
                </div>
                <section className="w-screen h-[80vh] flex-col-centered gap-6 tracking-[-0.15em]">
                    {[
                        ["Home", "/", "delay-0"],
                        ["About", "/about", "delay-[50ms]"],
                        ["Programs", "/programs", "delay-[100ms]"],
                        ["Blog", "/blog", "delay-[150ms]"],
                    ].map(([title, url, delay]) => (
                        <a
                            href={url}
                            className={`${
                                active === url ? "text-[#939393]" : "text-black"
                            } ${
                                hamburger
                                    ? "translate-y-0 opacity-100"
                                    : "-translate-y-12 opacity-0"
                            } rounded-lg px-3 py-2 text-5xl 
                                transition duration-300 ease-in-out ${delay}`}
                            onClick={() => {
                                setHamburger(false);
                            }}
                            key={title}
                        >
                            {title}
                        </a>
                    ))}
                </section> */}
            </div>

            <section
                className={`${
                    hamburger ? "flex-col-centered" : "hidden"
                } absolute w-screen h-screen bg-black top-0 text-white`}
            >
                {[
                    ["Home", "/"],
                    ["Maps", "/maps"],
                    ["Photos", "/photos"],
                    ["Events", "/events"],
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
