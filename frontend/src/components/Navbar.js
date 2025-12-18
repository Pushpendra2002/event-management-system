import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={{ padding: "10px", borderBottom: "1px solid black" }}>
      <Link to="/events">Events</Link> |{" "}
      <Link to="/create-event">Create Event</Link> |{" "}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;
