"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/calendar");
        const data = await response.json();
        setEvents(data.items || []);
      } catch (error) {
        console.error("Error fetching calendar events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="p-[16px] w-full overflow-auto">
      {events.length === 0 ? (
        <p>No upcoming events.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id} className="p-2 border-b">
              <>{event.summary}</>
              {
                event.start && event.start.dateTime !== "Invalid date" ?
                new Date(event.start.dateTime).toLocaleString()
                : ""
              }
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
