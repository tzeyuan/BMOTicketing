import { useParams } from "react-router-dom";
import "../css/TicketDetails.css";

const eventData: Record<string, { title: string; artist: string; price: string; venue: string; date: string; image: string }> = {
  "1": {
    title: "aespa SYNK: Parallel Line",
    artist: "aespa",
    price: "RM 257.00",
    venue: "Bukit Jalil National Stadium",
    date: "25/1/2026",
    image: "/event1.png",
  },
  "2": {
    title: "Final Lap : JJ20 Kuala Lumpur",
    artist: "JJ Lin",
    price: "RM 288.00",
    venue: "Bukit Jalil National Stadium",
    date: "12/12/2025",
    image: "/event2.png",
  },
  "3": {
    title: "KISS ROAD in Malaysia",
    artist: "Kiss of Life",
    price: "RM 338.00",
    venue: "Mega Star Arena, Kuala Lumpur",
    date: "17/5/2026",
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
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Venue:</strong> {event.venue}</p>
        <button className="buy-button">Select Seat</button>
      </div>
    </div>
  );
};

export default TicketDetails;
