import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/SelectTicket.css";

interface TicketType {
  name: string;
  sold: number;
  limit: number;
}

interface Event {
  id: number;
  title: string;
  date: string;
  ticketTypes: TicketType[];
}

const SelectTicket = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedType, setSelectedType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [maxAvailable, setMaxAvailable] = useState<number | null>(null);

  // Load event passed from previous page
  useEffect(() => {
    const eventData = location.state?.event;
    if (!eventData || !eventData.id) {
      navigate("/");
      return;
    }
    setEvent(eventData);
  }, [location.state, navigate]);

  // Update maxAvailable when ticket type is selected
  useEffect(() => {
    if (!event || !selectedType) {
      setMaxAvailable(null);
      return;
    }

    const selected = event.ticketTypes.find(t => t.name === selectedType);
    if (selected) {
      const available = selected.limit - selected.sold;
      setMaxAvailable(available);

      if (quantity > available) {
        setQuantity(available);
      }
    } else {
      setMaxAvailable(null);
    }
  }, [selectedType, event]);

  // Handle submission
  const handleProceed = () => {
    if (!selectedType || !event || maxAvailable === null || quantity > maxAvailable) return;

    const paymentData = {
      event: event.title,
      date: event.date,
      ticketType: [{ name: selectedType, quantity }], // Make sure this is a string for now
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
            {event.ticketTypes.map((ticket, idx) => {
              const isSoldOut = ticket.sold >= ticket.limit;
              return (
                <option
                  key={idx}
                  value={ticket.name}
                  disabled={isSoldOut}
                >
                  {ticket.name}{isSoldOut ? " - Sold Out" : ""}
                </option>
              );
            })}
          </select>

          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            min={1}
            max={maxAvailable || 10}
            disabled={!selectedType || (maxAvailable ?? 0) <= 0}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          {maxAvailable !== null && maxAvailable <= 0 && (
            <p className="sold-out-msg">This ticket is sold out.</p>
          )}

          {selectedType && quantity > (maxAvailable ?? 0) && (
            <p className="error-msg">Only {maxAvailable} ticket(s) left</p>
          )}

          <button
            onClick={handleProceed}
            disabled={!selectedType || quantity > (maxAvailable ?? 0) || maxAvailable === 0}
          >
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
