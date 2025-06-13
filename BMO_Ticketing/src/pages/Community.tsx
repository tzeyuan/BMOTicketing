import { useState } from "react";
import "../css/Community.css";

const Community = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([
    { id: 1, name: "aespa Fans Malaysia" },
    { id: 2, name: "JJ Lin KL Concert Group" },
    { id: 3, name: "KISS Malaysia Supporters" },
  ]);

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (groupName.trim()) {
      setGroups([...groups, { id: groups.length + 1, name: groupName }]);
      setGroupName("");
    }
  };

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="community-page">
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
        <h3>Available Groups</h3>
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <div key={group.id} className="group-item">
              <span>{group.name}</span>
              <button className="join-btn">Join</button>
            </div>
          ))
        ) : (
          <p>No groups found.</p>
        )}
      </div>

      {/* Create new group */}
      <div className="create-group">
        <h3>Create New Group</h3>
        <form onSubmit={handleCreateGroup}>
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
          <button type="submit" className="create-btn">Create Group</button>
        </form>
      </div>

      {/* Private chat section (placeholder) */}
      <div className="private-chat-placeholder">
        <h3>Private Chat (Coming Soon)</h3>
        <p>Send direct messages to other users privately.</p>
      </div>
    </div>
  );
};

export default Community;
