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


    </div>
  );
};

export default Home;
