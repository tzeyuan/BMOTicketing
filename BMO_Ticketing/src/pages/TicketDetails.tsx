import { useParams } from "react-router-dom";
import "../css/TicketDetails.css";

const eventData: Record<string, { title: string; artist: string; price: string; image: string }> = {
  "1": {
    title: "aespa SYNK: Parallel Line",
    artist: "aespa",
    price: "RM 257.00",
    image: "/event1.png",
  },
  "2": {
    title: "Final Lap : JJ20 Kuala Lumpur",
    artist: "JJ Lin",
    price: "RM 288.00",
    image: "/event2.png",
  },
  "3": {
    title: "KISS ROAD in Malaysia",
    artist: "Kiss of Life",
    price: "RM 338.00",
    image: "/event3.png",
  },
};

const TicketDetails = () => {
  const { id } = useParams();
  const event = eventData[id ?? ""];

  if (!event) {
    return <div className="ticket-details"><h2>Event not found</h2></div>;
  }

  return (
    <div className="ticket-details">
      <img src={event.image} alt={event.title} />
      <div className="ticket-info">
        <h2>{event.title}</h2>
        <p><strong>Artist:</strong> {event.artist}</p>
        <p><strong>Price:</strong> {event.price}</p>
        <p><strong>Date:</strong> 18 October 2025</p>
        <p><strong>Venue:</strong> Mega Star Arena, Kuala Lumpur</p>
        <button className="buy-button">Proceed to Buy</button>
      </div>
    </div>
  );
};

export default TicketDetails;
