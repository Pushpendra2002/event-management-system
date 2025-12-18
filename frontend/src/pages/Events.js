import { useEffect, useState } from "react";
import axios from "axios";

function Events() {
  const [events, setEvents] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);
    } catch (error) {
      alert("Failed to fetch events");
    }
  };

  const joinEvent = async (eventId) => {
    try {
      await axios.post("http://event-management-system-dwdt.onrender.com", {
        userId: user._id,
        eventId: eventId
      });
      alert("Successfully joined event");
    } catch (error) {
      alert(error.response?.data?.message || "Join failed");
    }
  };

  return (
    <div>
      <div className="container"></div>
      <h2>All Events</h2>

      {events.length === 0 && <p>No events available</p>}

      {events.map((event) => (
        
         <div key={event._id} className="event-card" >
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p><b>Date:</b> {new Date(event.date).toDateString()}</p>
          <p><b>Location:</b> {event.location}</p>
          <p><b>Created By:</b> {event.createdBy?.name}</p>

          <button onClick={() => joinEvent(event._id)}>
            Join Event
          </button>
        </div>
      ))}
    </div>
  );
}

export default Events;
