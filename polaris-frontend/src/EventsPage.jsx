import { useState } from 'react';
import eventData from './events_data.json'; // Import your events data

export default function EventsPage() {
    const [filter, setFilter] = useState('');

    // Function to handle filter change
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    // Function to filter events based on the filter state
    const filteredEvents = eventData.filter(event => {
        return event.description.toLowerCase().includes(filter.toLowerCase());
    });

    return (
        <div>
            <h1>Happening</h1>
            <input
                type="text"
                placeholder="Search events..."
                value={filter}
                onChange={handleFilterChange}
            />
            <div>
                {filteredEvents.map((event, index) => (
                    <div key={index}>
                        <h2>{event.event_name}</h2>
                        <p>{event.event_time}</p>
                        <p>{event.location}</p>
                        <p>{event.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
