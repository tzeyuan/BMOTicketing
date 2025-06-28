import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Community.css";
import Modal from "./GroupModal";


const eventCategories = [
    "Sports", "Entertainment", "Exhibitions", "Seminars", "Business", "Travel", "Others",
];

const Community = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groups, setGroups] = useState([
    { id: 1, name: "aespa Fans Malaysia", topic: "Entertainments", description: "Discuss everything aespa!"},
    { id: 2, name: "JJ Lin KL Concert Group", topic: "Entertainments", description: "Fan Chant Discussion 2025" },
    { id: 3, name: "Kiss Of Life Malaysia Supporters", topic: "Entertainments", description: "KIOF concert 2025."},
  ]);
  const [joinedGroupIds, setJoinedGroupIds] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateGroup = (newGroup: { name: string; topic: string; description: string }) => {
    const newEntry = {
      id: groups.length + 1,
      ...newGroup,
    };
    setGroups([...groups, newEntry]);
  };

  const handleJoin = (groupId: number) => {
    if (!joinedGroupIds.includes(groupId)) {
      setJoinedGroupIds([...joinedGroupIds, groupId]);
    }
  };

  const joinedGroups = groups.filter((group) => joinedGroupIds.includes(group.id));
  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="community-container">
      <aside className="sidebar left-sidebar">

        <ul>
          <li>
            <h3><Link to="/">Home</Link></h3>
          </li>
        </ul>

        <h3>COMMUNITIES</h3>
        <ul>
          <li>
            <button onClick={() => setModalOpen(true)} className="create-link">
              ➕ Create a community
            </button>
          </li>
          {joinedGroups.map((group) => (
            <li key={group.id}>
              <Link to={`/community/${group.id}`}>{group.name}</Link>
            </li>
          ))}
        </ul>
      </aside>

      <main className="community-main">
        <h2>Community Discussions</h2>

        {/* Search existing groups */}
        <input
          type="text"
          placeholder="Search community groups..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        {/* Group list */}
        <div className="group-list">
          <h3>Available Communities</h3>
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => (
              <div key={group.id} className="group-item">
                <div>
                  <strong>{group.name}</strong>
                  <p>{group.description}</p>
                  <small>Topic: {group.topic}</small>
                </div>
                {joinedGroupIds.includes(group.id) ? (
                  <span className="joined-text">Joined</span>
                ) : (
                  <button className="join-btn" onClick={() => handleJoin(group.id)}>
                    Join
                  </button>
                )}
              </div>
            ))
          ) : (<p>No groups found.</p>)}
        </div>
      </main>

      {modalOpen && (
        <Modal
          categories={eventCategories}
          onClose={() => setModalOpen(false)}
          onCreate={handleCreateGroup}
        />
      )}
  </div>
  );
};

export default Community;
