import { Link } from "react-router-dom";
import "../css/Home.css";


const Home = () => {
  return (
    <div className="home-container">
      {/* Left Sidebar */}
      <aside className="sidebar left-sidebar">
        
        <h2>Event Category</h2>
        <ul>
          <li>K-POP</li>
          <li>Mandarin</li>
          <li>J-POP</li>
          <li>Musical</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search event or keyword" />
          <button>Search</button>
        </div>

        <h2 className="section-title">Trending Events in Malaysia</h2>

        <div className="event-grid">
          <Link to="/ticket/1" className="event-card">
            <img src="/event1.png" alt="Event 1" />
            <h3>aespa SYNK: Parallel Line</h3>
            <h3>aespa</h3>
            <p>From RM 257.00</p>
            <button>Buy Now</button>
          </Link>

          <Link to="/ticket/2" className="event-card">
            <img src="/event2.png" alt="Event 2" />
            <h3>Final Lap : JJ20 Kuala Lumpur</h3>
            <h3>JJ Lin</h3>
            <p>From RM 288.00</p>
            <button>Buy Now</button>
          </Link>

          <Link to="/ticket/3" className="event-card">
            <img src="/event3.png" alt="Event 3" />
            <h3>KISS ROAD in Malaysia</h3>
            <h3>Kiss of Life</h3>
            <p>From RM 338.00</p>
            <button>Buy Now</button>
          </Link>

          <Link to="/ticket/4" className="event-card">
            <img src="/event4.png" alt="Event 4" />
            <h3>CoComelon: Sing-A-Long LIVE</h3>
            <h3>CoComelon</h3>
            <p>From RM 188.00</p>
            <button>Buy Now</button>
          </Link>

          <Link to="/ticket/5" className="event-card">
            <img src="/event5.png" alt="Event 5" />
            <h3>2025 DOH KYUNG SOO ASIA CONCERT TOUR -DO it! in Malaysia- </h3>
            <h3>DOH KYUNG SOO</h3>
            <p>From RM 488.00</p>
            <button>Buy Now</button>
          </Link>

          <Link to="/ticket/6" className="event-card">
            <img src="/event6.png" alt="Event 6" />
            <h3>“BOUNDLESS” MIKA KOBAYASHI SPECIAL SHOW 2025 </h3>
            <h3>MIKA KOBAYASHI</h3>
            <p>From RM 190.00</p>
            <button>Buy Now</button>
          </Link>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="sidebar right-sidebar">
        <h2>May 2025</h2>
        <ul>
          <li>aespa SYNK: Parallel - 8:00PM</li>
          <li>Final Lap: JJ20- 6:30PM</li>
          
          <li>
            <Link to="/community" className="community-link">Join Community</Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Home;
