import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Fallback from localStorage in case location.state is missing
  const localData = localStorage.getItem("paymentData");
  const parsedLocal = localData ? JSON.parse(localData) : {};

  const event = location.state?.event || parsedLocal.event;
  const date = location.state?.date || parsedLocal.date;
  const ticketType = location.state?.ticketType || parsedLocal.ticketType;
  const userId = localStorage.getItem("userId");

  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");

  useEffect(() => {
    console.log("Payment Page Loaded with:", { event, date, ticketType, userId });
  }, [event, date, ticketType, userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !event || !date || !ticketType) {
      console.error("Missing values:", { userId, event, date, ticketType });
      alert("Missing required information.");
      return;
    }

    const newTicket = {
      userId,
      event,
      date,
      ticketType,
      qrCode: "/sampleQR.png", // static for now
    };

    try {
      const res = await fetch("http://localhost:5000/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTicket),
      });

      if (res.ok) {
        alert("Payment successful. Ticket saved!");
        localStorage.removeItem("paymentData"); // optional cleanup
        navigate("/profile");
      } else {
        alert("Failed to save ticket.");
      }
    } catch (err) {
      alert("Server error during ticket saving.");
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-box">
        <h2>Payment Information</h2>
        <form onSubmit={handleSubmit}>
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
