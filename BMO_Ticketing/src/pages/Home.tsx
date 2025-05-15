import { Link } from "react-router-dom";
       
const Home = () => {
  return (
    <div className="home-container">
      {/* Left Sidebar */}
      <aside className="sidebar left-sidebar">
        <h2>Event Category</h2>
        <ul>
          <li>Sports</li>
          <li>Entertainments</li>
          <li>Exhibitions</li>
          <li>Seminars</li>
          <li>Business</li>
          <li>Travel</li>
          <li>Others</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search event or keyword" />
          <button>Search</button>
        </div>

        <h2 className="section-title">Popular Events In Malaysia</h2>

        <div className="event-grid">
          <div className="event-card">
            <img src="https://placehold.co/300x150" alt="Event 1" />
            <h3>Zoo Negara Adoption Package</h3>
            <p>From RM 25.00</p>
            <button>Buy Now</button>
          </div>

          <div className="event-card">
            <img src="https://placehold.co/300x150" alt="Event 2" />
            <h3>Persatuan Ortopedik Sandakan</h3>
            <p>From RM 49.00</p>
            <button>Buy Now</button>
          </div>

          <div className="event-card">
            <img src="https://placehold.co/300x150" alt="Event 3" />
            <h3>EMPAT LIVE IN KUALA LUMPUR</h3>
            <p>From RM 288.00</p>
            <button>Buy Now</button>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Home;
