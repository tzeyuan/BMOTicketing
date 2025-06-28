import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/CommunitySidebar.css";

const dummyJoined = [
  { id: 1, name: "aespa Fans Malaysia" },
  { id: 2, name: "JJ Lin KL Concert Group" },
];

const CommunitySidebar = ({ onCreateClick }: { onCreateClick: () => void }) => {
  const [joinedGroups, setJoinedGroups] = useState(dummyJoined);

  useEffect(() => {
    // Later: Fetch joined communities from backend
  }, []);

  return (
    <div className="community-sidebar">
      <ul>
        <li>
          <Link to="/community/home">
            🏠 Home
          </Link>
        </li>

        <li className="section-title">COMMUNITIES</li>
        <li>
          <button className="create-community-btn" onClick={onCreateClick}>
            ➕ Create a community
          </button>
        </li>

        {joinedGroups.map((group) => (
          <li key={group.id}>
            <Link to={`/community/${group.id}`}>{group.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunitySidebar;
