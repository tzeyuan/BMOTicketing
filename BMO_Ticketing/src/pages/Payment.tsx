import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Payment.css";

interface TicketItem {
  name: string;
  quantity: number;
  price: number;
}

const extractPriceFromTicket = (label: string): number => {
  const match = label.match(/RM\s*(\d+)/i);
  return match ? parseFloat(match[1]) : 0;
};

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const localData = localStorage.getItem("paymentData");
  const parsedLocal = localData ? JSON.parse(localData) : {};

  const event = location.state?.event || parsedLocal.event;
  const date = location.state?.date || parsedLocal.date;
  const ticketName = location.state?.ticketType || parsedLocal.ticketType || "";
  const quantity = location.state?.quantity || parsedLocal.quantity || 1;
  const price = extractPriceFromTicket(ticketName);

  const selectedTickets: TicketItem[] = ticketName
    ? [{ name: ticketName, quantity, price }]
    : [];

  const userId = localStorage.getItem("userId");

  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");

  const totalAmount = selectedTickets.reduce((sum, t) => sum + t.price * t.quantity, 0);

  useEffect(() => {
    console.log("Payment Page Loaded:", { event, date, selectedTickets, userId });
  }, [event, date, selectedTickets, userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !event || !date || !ticketName) {
      alert("Missing required payment data.");
      return;
    }

    const newTicket = {
      userId,
      event,
      date,
      ticketType: selectedTickets.map(t => ({
        name: t.name,
        quantity: t.quantity
      })),
      qrCode: "/sampleQR.png",
    };

    try {
      const res = await fetch("http://localhost:5000/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTicket),
      });

      if (res.ok) {
        alert("Payment successful. Ticket saved!");
        localStorage.removeItem("paymentData");
        navigate("/profile");
      } else {
        const errorData = await res.json();
        alert("Failed to save ticket: " + (errorData.message || "Unknown error"));
      }
    } catch (err) {
      alert("Server error during ticket saving.");
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-box">
        <h2>Confirm Your Selection</h2>
        <p>Please check your selection and click 'Confirm & Checkout'</p>

        <div className="ticket-summary">
          {selectedTickets.map((t, index) => (
            <div key={index} className="ticket-item">
              <img src="/sampleQR.png" alt="event" />
              <div>
                <strong>{event} ({t.name})</strong>
                <p>Date: {date}</p>
                <p>Quantity: {t.quantity}</p>
              </div>
              <div>MYR {(t.price * t.quantity).toFixed(2)}</div>
            </div>
          ))}
          <hr />
          <div className="total">
            <strong>Total Amount: </strong>MYR {totalAmount.toFixed(2)}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card-form">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            id="cardNumber"
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />

          <label htmlFor="cvv">CVV</label>
          <input
            id="cvv"
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />

          <label htmlFor="expiry">Expiration Date</label>
          <input
            id="expiry"
            type="month"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
          />

          <button type="submit" className="pay-btn">Confirm Payment</button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
