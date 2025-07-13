import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";

interface Event {
  id: number;
  title: string;
  artist: string;
  price: string;
  image: string;
}

const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Failed to fetch events:", err));
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      {/* Left Sidebar */}
      <aside className="sidebar left-sidebar">
        <h3>News</h3>
          <ul className="news-list">
            <li>
              <a
                href="https://www.thestar.com.my/lifestyle/entertainment/2025/07/13/justin-bieber-unveils-surprise-7th-album-just-hours-after-teaser"
                target="_blank"
                rel="noopener noreferrer"
              >
                Justin Bieber unveils surprise 7th album just hours after teaser
              </a>
            </li>
            <li>
              <a
                href="https://www.travelandleisureasia.com/my/news/riize-set-to-bring-their-riizing-loud-tour-to-malaysia-with-a-one-night-only-concert/"
                target="_blank"
                rel="noopener noreferrer"
              >
                RIIZE Is Bringing Their ‘RIIZING LOUD’ Tour To Malaysia
              </a>
            </li>
            <li>
              <a
                href="https://says.com/my/entertainment/exo-d-o-reveals-ticketing-details-for-kl-concert"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ticketing Details For D.O.'s 2025 KL Concert Are Out. Here's What Your Pass Includes
              </a>
            </li>
          </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search event or keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>Search</button>
        </div>

        <h2 className="section-title">Trending Events in Malaysia</h2>

        <div className="event-grid">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Link to={`/ticket/${event.id}`} key={event.id} className="event-card">
                <img src={event.image} alt={event.title} />
                <h3>{event.title}</h3>
                <h3>{event.artist}</h3>
                <p>From {event.price}</p>
                <Link to={`/ticket/${event.id}`}>
                  <button>Buy Now</button>
                </Link>
              </Link>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="sidebar right-sidebar">
        <h2>May 2025</h2>
        <ul>
          <li>aespa SYNK: Parallel - 8:00PM</li>
          <li>Final Lap: JJ20- 6:30PM</li>
        </ul>
      </aside>
    </div>
  );
};

export default Home;
