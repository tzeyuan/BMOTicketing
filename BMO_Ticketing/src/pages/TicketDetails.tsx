import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/TicketDetails.css";

interface EventData {
  id: number;
  title: string;
  artist: string;
  price: string;
  venue: string;
  date: string;
  image: string;
  description: string;
  ticketTypes: string[];
}

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventData | null>(null);
  const [activeTab, setActiveTab] = useState("ticket");
  const [selectedTicket, setSelectedTicket] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/events/${id}`)
        .then((res) => res.json())
        .then((data) => setEvent(data))
        .catch((err) => console.error("Failed to fetch event:", err));
    }
  }, [id]);

  if (!event) {
    return <div className="ticket-details"><h2>Loading event...</h2></div>;
  }

  const handleBuy = () => {
    if (!selectedTicket) return;

    const paymentData = {
      event: event.title,
      date: event.date,
      ticketType: selectedTicket,
    };

    localStorage.setItem("paymentData", JSON.stringify(paymentData));

    navigate("/payment", {
      state: paymentData,
    });
  };

  return (
    <div className="ticket-details">
      <h2 className="event-title">{event.title}</h2>

      <div className="tab-nav">
        <button
          className={activeTab === "ticket" ? "active" : ""}
          onClick={() => setActiveTab("ticket")}
        >
          Ticket
        </button>
        <button
          className={activeTab === "details" ? "active" : ""}
          onClick={() => setActiveTab("details")}
        >
          Details
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "ticket" && (
          <div className="tab-ticket">
            <img src={event.image} alt={event.title} className="event-img" />
            <div className="ticket-info">
              <h2>{event.title}</h2>
              <p><strong>Artist:</strong> {event.artist}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
              <p><strong>Price From:</strong> {event.price}</p>

              <label>Select Ticket Type:</label>
              <select
                value={selectedTicket}
                onChange={(e) => setSelectedTicket(e.target.value)}
              >
                <option value="">-- Choose Ticket --</option>
                {event.ticketTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>

              <button
                className="buy-button"
                onClick={handleBuy}
                disabled={!selectedTicket}
              >
                {selectedTicket ? `Buy ${selectedTicket}` : "Select Ticket"}
              </button>
            </div>
          </div>
        )}

        {activeTab === "details" && (
          <div className="tab-details">
            <h3>Event Description</h3>
            <p>{event.description}</p>

            <h3>Seating Plan</h3>
            <img src="/bukitjalil_seatingplan.png" alt="Seating Plan" className="seating-plan" />

            <h3>Terms & Conditions</h3>
            <ul>
              <li>No refund or exchange after purchase.</li>
              <li>Admission is subject to venue rules and regulations.</li>
              <li>Ticket holders must comply with all event safety measures.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketDetails;
