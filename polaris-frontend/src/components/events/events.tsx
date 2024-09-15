"use client";

import { useEffect, useState } from "react";
import eventsData from "./events_data.json";
import styles from "./eventspage.module.css";
import Image from "next/image";

interface Event {
    event_name: string;
    event_time: string;
    location: string;
    description: string;
}

export default function EventsPage() {
    const [filter, setFilter] = useState<string>("");
    const [sortType, setSortType] = useState<string>("event_time");
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia(
            "(prefers-color-scheme: dark)"
        );
        setIsDarkMode(darkModeMediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setIsDarkMode(e.matches);
        };

        darkModeMediaQuery.addEventListener("change", handleChange);

        return () => {
            darkModeMediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    // Filtering and Sorting Events
    const filteredEvents: Event[] = eventsData
        .filter(
            (event: Event) =>
                event.event_name.toLowerCase().includes(filter.toLowerCase()) ||
                event.description.toLowerCase().includes(filter.toLowerCase())
        )
        .sort((a: Event, b: Event) => {
            if (sortType === "event_time") {
                return (
                    new Date(a.event_time).getTime() -
                    new Date(b.event_time).getTime()
                );
            } else if (sortType === "event_name") {
                return a.event_name.localeCompare(b.event_name);
            }
            return 0;
        });

    return (
        <div className="flex-col-centered mt-12 bg-space-blue">
            <div className="center">
                <h1>Events at Hack the North</h1>
            </div>
            {/* Fixed filter and sort */}
            <div className="w-[90vw] h-12 flex-row-centered">
                <figure className="absolute w-6 h-6 left-0 ml-6">
                    <Image
                        src="/nav/search_icon.svg"
                        alt="background picture"
                        style={{ objectFit: "cover" }}
                        fill
                        priority
                    />
                </figure>
                <input
                    type="text"
                    className="bg-transparent border border-[#949494] h-8 w-[60%] pl-8 rounded-l-full text-white"
                    placeholder="Search events"
                    onChange={(e) => setFilter(e.target.value)}
                    value={filter}
                />

                <select
                    className="bg-space-blue border border-[#949494] h-8 w-[40%] pl-2 rounded-r-full text-[#949494]"
                    onChange={(e) => setSortType(e.target.value)}
                    value={sortType}
                >
                    <option value="event_time">Sort by Time</option>
                    <option value="event_name">Sort by Name</option>
                </select>
            </div>

            <span className="text-white font-saira text-light text-2xl tracking-tighter mt-6 mb-6">
                Events at <span className="font-semibold">Hack the North</span>
            </span>

            <div className="w-[90vw] flex-col-centered gap-10">
                {filteredEvents.map((event: Event, index: number) => (
                    <div
                        className="w-full flex flex-col items-start justify-start px-4 bg-transparent border-2 border-white text-white rounded-[1.5rem] pt-2"
                        key={index}
                    >
                        <h2 className="text-xl font-semibold">
                            {event.event_name}
                        </h2>
                        <p className="text-[#949494]">
                            <strong>Time:</strong> {event.event_time}
                        </p>
                        <p className="text-[#949494]">
                            <strong>Location:</strong> {event.location}
                        </p>
                        <div className={styles.eventInfo}>
                            <p>{event.description}</p>
                        </div>
                        <button className="w-full h-8 my-2 bg-[#76238B] rounded-md font-semibold" onClick={() => {}}>
                            I'm interested in this activity
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
