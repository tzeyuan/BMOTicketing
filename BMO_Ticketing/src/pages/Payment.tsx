import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Payment.css";

const Payment = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state || JSON.parse(localStorage.getItem("paymentData") || "{}");
  const { event, date, ticketType } = initialData;
  const userId = localStorage.getItem("userId");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !event || !date || !ticketType) {
      alert("Missing required information.");
      return;
    }

    const newTicket = {
      userId,
      event,
      date,
      ticketType,
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
          <label>Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />

          <label>CVV</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />

          <label>Expiration Date</label>
          <input
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
