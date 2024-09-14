import React, { useState } from 'react';
import eventData from './events_data.json'; // make sure to import your JSON data correctly

export default function EventsPage() {
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState('All');

  // Filtering events based on category and search text
  const filteredEvents = eventData.filter(event =>
    (category === 'All' || event.description.includes(category)) &&
    event.event_name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <header>
        <h1>Happening</h1>
      </header>
      <div className="filters">
        <input
          type="text"
          placeholder="Search events..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Free">Free</option>
          <option value="New">New</option>
        </select>
      </div>
      <div className="event-grid">
        {filteredEvents.map((event, index) => (
          <div key={index} className="event-card">
            <img src={event.image || '/default-image.jpg'} alt={event.event_name} />
            <div>
              <h3>{event.event_name}</h3>
              <p>{event.location}</p>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        header {
          text-align: center;
        }
        .filters {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .event-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        .event-card {
          border: 1px solid #ccc;
          padding: 10px;
        }
        .event-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
}
