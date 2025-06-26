import "../css/Profile.css";
import { useEffect, useState } from "react";

const Profile = () => {
  const [username, setUsername] = useState("Guest");
  const [tickets, setTickets] = useState([
    {
      event: "aespa SYNK: Parallel Line",
      date: "25/1/2026",
      qrCode: "/sampleQR.png",
    },
    {
      event: "JJ20 Final Lap Kuala Lumpur",
      date: "12/12/2025",
      qrCode: "/sampleQR.png",
    },
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img src="/default_profilepic.png" alt="Profile" className="profile-pic" />
        <h2>Welcome, {username}</h2>
      </div>

      <div className="tickets-section">
        <h3>Your Tickets</h3>
        <div className="ticket-list">
          {tickets.map((ticket, index) => (
            <div className="ticket-card" key={index}>
              <p><strong>Event:</strong> {ticket.event}</p>
              <p><strong>Date:</strong> {ticket.date}</p>
              <img src={ticket.qrCode} alt="QR Code" className="qr-img" />
            </div>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h3>User Settings</h3>
        <button className="logout-btn" onClick={() => {
          localStorage.removeItem("username");
          window.location.href = "/login";
        }}>Log Out</button>
      </div>
    </div>
  );
};

export default Profile;
