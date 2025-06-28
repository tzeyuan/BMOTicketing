import { useState } from "react";
import "../css/Community.css";
import CommunitySidebar from "./CommunitySidebar";
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
  const [joinedGroups, setJoinedGroups] = useState<number[]>([1, 2]);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateGroup = (newGroup: { name: string; topic: string; description: string }) => {
    const newEntry = {
      id: groups.length + 1,
      ...newGroup,
    };
    setGroups([...groups, newEntry]);
  };

  const handleJoin = (groupId: number) => {
    if (!joinedGroups.includes(groupId)) {
      setJoinedGroups([...joinedGroups, groupId]);
    }
  };

  return (
    <div className="community-layout">
      <CommunitySidebar 
        joinedGroups={groups.filter(g => joinedGroups.includes(g.id))}
        onCreateClick={() => setModalOpen(true)} 
      />

      <div className="community-main-content">
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
                {joinedGroups.includes(group.id) ? (
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
      </div>

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
