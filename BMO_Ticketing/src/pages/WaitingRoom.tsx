import { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "../css/WaitingRoom.css";

const WaitingRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    // Simulate wait time (e.g., 5 seconds)
    const timer = setTimeout(() => {
      navigate(`/select-ticket/${id}`, { state: location.state });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, location.state, id]);

  return (
    <div className="waiting-room">
      <h1>You are now in line</h1>
      <p>When it is your turn, you will have 10 minutes to enter the ticket selection page.</p>

      <div className="queue-bar">
        <div className="progress"></div>
      </div>

      <div className="queue-info">
        <p>Estimated wait time: <strong>Less than a minute</strong></p>
        <p>Status last updated: {new Date().toLocaleTimeString()}</p>
      </div>

      <p className="note">Please do not refresh or close the page.</p>
    </div>
  );
};

export default WaitingRoom;
