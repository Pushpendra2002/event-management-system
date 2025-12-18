import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://event-management-system-dwdt.onrender.com", {
        title,
        description,
        date,
        location,
        createdBy: user._id
      });

      alert("Event created successfully");
      navigate("/events");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <div>
      <h2>Create Event</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br /><br />

        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><br /><br />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        /><br /><br />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default CreateEvent;
