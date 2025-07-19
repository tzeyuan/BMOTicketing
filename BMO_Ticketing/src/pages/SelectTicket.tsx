import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/SelectTicket.css";

interface Event {
  id: number;
  title: string;
  date: string;
  ticketTypes: { type: string; sold: number }[];
}

const SelectTicket = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedType, setSelectedType] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const eventData = location.state?.event;

    if (!eventData || !eventData.id) {
    navigate("/");
    return;
    }

    setEvent(eventData);
  }, [location.state, navigate]);

  const handleProceed = () => {
    if (!selectedType || !event) return;

    const paymentData = {
      event: event.title,
      date: event.date,
      ticketType: selectedType,
      quantity,
    };

    localStorage.setItem("paymentData", JSON.stringify(paymentData));
    navigate("/payment", { state: paymentData });
  };

  return (
    <div className="select-ticket-container">
      <h2>Select Ticket Type</h2>
      {event ? (
        <div className="ticket-box">
          <h3>{event.title}</h3>
          <p><strong>Date:</strong> {event.date}</p>

          <label>Ticket Type:</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">-- Choose Ticket Type --</option>
            {event.ticketTypes.map((ticket, idx) => (
              <option key={idx} value={ticket.type}>
                {ticket.type} ({ticket.sold} sold)
              </option>
            ))}
          </select>

          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            min={1}
            max={10}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <button onClick={handleProceed} disabled={!selectedType}>
            Proceed to Payment
          </button>
        </div>
      ) : (
        <p>Loading event details...</p>
      )}
    </div>
  );
};

export default SelectTicket;
