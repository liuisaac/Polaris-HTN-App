"use client"; // This tells Next.js that this is a client-side component

import { useEffect, useState } from 'react';
import eventsData from './events_data.json'; // Assuming you have an events data JSON file
import styles from './eventspage.module.css'; // Import the CSS module

interface Event {
  event_name: string;
  event_time: string;
  location: string;
  description: string;
}

export default function EventsPage() {
  const [filter, setFilter] = useState<string>('');
  const [sortType, setSortType] = useState<string>('event_time');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    darkModeMediaQuery.addEventListener('change', handleChange);
    
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const filteredEvents: Event[] = eventsData
    .filter((event: Event) =>
      event.event_name.toLowerCase().includes(filter.toLowerCase()) ||
      event.description.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a: Event, b: Event) => {
      if (sortType === 'event_time') {
        return new Date(a.event_time).getTime() - new Date(b.event_time).getTime();
      } else if (sortType === 'event_name') {
        return a.event_name.localeCompare(b.event_name);
      }
      return 0;
    });

  return (
    <div className={styles.localRoot}>
      <h1>Events at Hack the North</h1>
      
      {/* Search bar */}
      <input
        type="text"
        className={styles.searchInput}  // Local class for input
        placeholder="Search events"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      />
      
      {/* Sorting dropdown */}
      <select onChange={(e) => setSortType(e.target.value)} value={sortType}>
        <option value="event_time">Sort by Time</option>
        <option value="event_name">Sort by Name</option>
      </select>

      {/* Event cards */}
      <div className={styles.eventsContainer}>
        {filteredEvents.map((event: Event, index: number) => (
          <div className={styles.eventCard} key={index}>
            <h2>{event.event_name}</h2>
            <p><strong>Time:</strong> {event.event_time}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <div className={styles.eventInfo}>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
