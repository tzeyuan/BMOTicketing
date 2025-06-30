import { useParams, useNavigate  } from "react-router-dom";
import { useState } from "react";
import "../css/TicketDetails.css";

const eventData: Record<
  string, 
  { title: string; 
    artist: string; 
    price: string; 
    venue: string; 
    date: string; 
    image: string;
    description: string;
    ticketTypes: string[];
  }> = {

  "1": {
    title: "aespa SYNK: Parallel Line",
    artist: "aespa",
    price: "RM 257.00",
    venue: "Bukit Jalil National Stadium",
    date: "25/1/2026",
    image: "/event1.png",
    description:
      "Join aespa live in Malaysia for an electrifying night of K-pop performances, stunning visuals, and unforgettable moments with the MY community.",
    ticketTypes: ["VIP RM 988", "CAT 1 RM 788", "CAT 2 RM 588", "CAT 3 RM257"],
  },

  "2": {
    title: "Final Lap : JJ20 Kuala Lumpur",
    artist: "JJ Lin",
    price: "RM 288.00",
    venue: "Bukit Jalil National Stadium",
    date: "12/12/2025",
    image: "/event2.png",
    description:
      "Experience JJ Lin's powerful vocals and emotional ballads in this once-in-a-lifetime anniversary concert.",
    ticketTypes: ["VIP RM 988", "CAT 1 RM 788", "CAT 2 RM 588", "CAT 3 RM288"],
  },

  "3": {
    title: "KISS ROAD in Malaysia",
    artist: "Kiss of Life",
    price: "RM 338.00",
    venue: "Mega Star Arena, Kuala Lumpur",
    date: "17/5/2026",
    image: "/event3.png",
    description:
      "Celebrate with Kiss of Life as they rock the stage with energy, charisma, and hits that fans love.",
    ticketTypes: ["VIP RM 988", "CAT 1 RM 788", "CAT 2 RM 588", "CAT 3 RM288"],
  },
};


const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = eventData[id ?? ""];
  const [activeTab, setActiveTab] = useState("ticket");
  const [selectedTicket, setSelectedTicket] = useState("");

  if (!event) {
    return <div className="ticket-details"><h2>Event not found</h2></div>;
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
        <button className={activeTab === "ticket" ? "active" : ""}
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

      {/* Tab */}
      <div className= "tab-content">
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

                <button className="buy-button" onClick={handleBuy} disabled={!selectedTicket}>
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
