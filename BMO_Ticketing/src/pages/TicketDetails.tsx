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
  seatingPlan?: string; 
}

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("ticket");

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/events/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Event not found");
          return res.json();
        })
        .then((data) => {
          setEvent(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  const handleBuyNow = () => {
    navigate(`/waiting-room/${id}`, {
      state: { event },
    });
  };

  if (loading) return <div className="ticket-details"><h2>Loading event...</h2></div>;
  if (error || !event) return <div className="ticket-details"><h2>{error || "Event not found"}</h2></div>;

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

              <button className="buy-button" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
        )}

        {activeTab === "details" && (
          <div className="tab-details">
            <h3>Event Description</h3>
            <p>{event.description}</p>

            <h3>Seating Plan</h3>
            {event.seatingPlan ? (
              <img src={event.seatingPlan} alt="Seating Plan" className="seating-plan" />
            ) : (
              <img src="/bukitjalil_seatingplan.png" alt="Default Seating" className="seating-plan" />
            )}

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
