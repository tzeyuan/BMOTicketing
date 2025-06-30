import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Payment.css";

const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate ticket purchase
    const newTicket = {
      event: "Selected Event",
      date: "Pending Confirmation",
      qrCode: "/sampleQR.png", 
    };

    const existing = JSON.parse(localStorage.getItem("tickets") || "[]");
    localStorage.setItem("tickets", JSON.stringify([...existing, newTicket]));

    alert("Payment successful! Ticket added to your profile.");
    navigate("/profile");
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

          <button type="submit" className="pay-btn">Pay Now</button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
