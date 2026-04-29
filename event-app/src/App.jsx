import React, { useEffect, useState } from 'react'
import EventCard from "./components/EventCard";
import { events } from "./data/events";
import './App.css'

function App() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await res.json();

        const formatted = data.slice(0, 9).map((item) => ({
          id: item.id,
          title: item.title,
          date: "May 2026",
          location: "Nigeria",
        }));

        setEvents(formatted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading events...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-center mb-2">
        EventFlow
      </h1>

      <p className="text-center text-gray-600 mb-6">
        Discover events happening near you
      </p>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search events..."
          className="p-3 w-full max-w-md border rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
          {
            filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No events found
              </p>
              
            )
          }

       
      </div>
      <div className="flex justify-center gap-6 mb-6 text-sm">
  <div>{events.length} Events</div>
  <div>{filteredEvents.length} Results</div>
</div>

    </div>
  );
}

export default App;

