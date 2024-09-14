import React, { useState } from 'react';

type Event = {
  event_name: string;
  location: string;
  description: string;
};

// Importing the event data as an array of Event objects
import eventData from "./events_data.json";

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <div className="container">
      <header>
        <h1>Happening</h1>
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
      </header>
      <div className="events-list">
        {eventData
          .filter((event: Event) =>
            event.event_name.toLowerCase().includes(searchTerm)
          )
          .map((event: Event, index: number) => (
            <div key={index} className="event-card">
              <div className="event-image">
                <img src="/path/to/default/image.jpg" alt={event.event_name} />
              </div>
              <div className="event-details">
                <h2>{event.event_name}</h2>
                <p>{event.location}</p>
                <p>{event.description}</p>
              </div>
            </div>
          ))}
      </div>
      <style jsx>{`
        .container {
          padding: 20px;
          max-width: 800px;
          margin: auto;
        }
        header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }
        input {
          padding: 10px;
          font-size: 16px;
          width: 100%;
          margin-top: 10px;
        }
        .events-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .event-card {
          border: 1px solid #ccc;
          border-radius: 8px;
          overflow: hidden;
        }
        .event-image img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .event-details {
          padding: 10px;
        }
        h2 {
          margin-top: 0;
        }
      `}</style>
    </div>
  );
}
