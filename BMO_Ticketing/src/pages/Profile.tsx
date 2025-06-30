import "../css/Profile.css";
import { useEffect, useState } from "react";

const Profile = () => {
  const [username, setUsername] = useState("Guest");
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    if (storedUser) {
      setUsername(storedUser);
    }

    if (userId) {
      fetch(`http://localhost:5000/api/tickets/${userId}`)
        .then((res) => res.json())
        .then((data) => setTickets(data))
        .catch((err) => console.error("Error fetching tickets", err));
    }
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img src="/default_profilepic.png" alt="Profile" className="profile-pic" />
        <h2>{username}</h2>
      </div>

      <div className="tickets-section">
        <h3>Your Tickets</h3>
        <div className="ticket-list">
          {tickets.map((ticket, index) => (
            <div className="ticket-card" key={index}>
              <p><strong>Event:</strong> {ticket.event}</p>
              <p><strong>Date:</strong> {ticket.date}</p>
              <p><strong>Type:</strong> {ticket.ticketType}</p>
              <img src={ticket.qrCode} alt="QR Code" className="qr-img" />
            </div>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h3>User Settings</h3>
        <button className="logout-btn" onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}>Log Out</button>
      </div>
    </div>
  );
};

export default Profile;
