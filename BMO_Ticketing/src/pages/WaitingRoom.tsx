// WaitingRoom.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WaitingRoom = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(Math.floor(Math.random() * 30) + 30); // 30–60 sec

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/ticket/:id"); // Navigate to the ticket selection page
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="waiting-room">
      <h2>You are now in line</h2>
      <p>Please wait for your turn to buy tickets.</p>
      <p>Estimated wait time: {timeLeft} seconds</p>
      <progress value={60 - timeLeft} max="60"></progress>
    </div>
  );
};

export default WaitingRoom;
