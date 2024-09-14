"use client"

import { useState } from 'react';
import eventsData from './events_data.json';

interface Event {
  event_name: string;
  event_time: string;
  location: string;
  description: string;
}

export default function EventsPage() {
  const [filter, setFilter] = useState<string>('');
  const [sortType, setSortType] = useState<string>('event_time');

  const filteredEvents: Event[] = eventsData
    .filter((event: Event) => 
      event.event_name.toLowerCase().includes(filter.toLowerCase()) ||
      event.description.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a: Event, b: Event) => {
      if (sortType === 'event_time') {
        // Example assumes event_time can be converted directly; adjust parsing as necessary
        return new Date(a.event_time).getTime() - new Date(b.event_time).getTime();
      } else if (sortType === 'event_name') {
        return a.event_name.localeCompare(b.event_name);
      }
      return 0;
    });

  return (
    <div>
      <h1>Events at Hack the North</h1>
      <input
        type="text"
        placeholder="Search events"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      />
      <select onChange={(e) => setSortType(e.target.value)} value={sortType}>
        <option value="event_time">Sort by Time</option>
        <option value="event_name">Sort by Name</option>
      </select>
      <ul>
        {filteredEvents.map((event: Event, index: number) => (
          <li key={index}>
            <h2>{event.event_name}</h2>
            <p><strong>Time:</strong> {event.event_time}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Description:</strong> {event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
