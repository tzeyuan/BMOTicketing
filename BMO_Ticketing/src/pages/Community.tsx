import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Community.css";
import Modal from "./GroupModal";


const eventCategories = [
    "Sports", "Entertainment", "Exhibitions", "Seminars", "Business", "Travel", "Others",
];

type CommunityGroup = {
  id: number;
  name: string;
  topic: string;
  description: string;
};

const Community = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groups, setGroups] = useState<CommunityGroup[]>([]);
  const [joinedGroupIds, setJoinedGroupIds] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Load all communities
    fetch("http://localhost:5000/api/communities")
      .then((res) => res.json())
      .then((data) => setGroups(data))
      .catch((err) => console.error("Error fetching communities", err));

    // Load joined communities
    if (userId) {
      fetch(`http://localhost:5000/api/communities/joined/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          const joinedIds = data.map((entry: any) => entry.communityId);
          setJoinedGroupIds(joinedIds);
        })
        .catch((err) => console.error("Error fetching joined groups", err));
    }
  }, [userId]);

  const handleJoin = async (groupId: number) => {
    if (!userId) {
      alert("Please log in to join a community.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/communities/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, communityId: groupId }),
      });

      if (res.ok) {
        setJoinedGroupIds((prev) => [...prev, groupId]);
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to join group");
      }
    } catch (err) {
      alert("Error joining group");
    }
  };

  const handleCreateGroup = async (newGroup: { name: string; topic: string; description: string }) => {
    try {
      const res = await fetch("http://localhost:5000/api/communities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGroup),
      });

      if (!res.ok) {
      const errData = await res.json();
      console.error("Create failed:", errData);
      alert(errData.message || "Failed to create community.");
      return;
    }
      const created = await res.json();
      setGroups([...groups, created]);
    } catch (err) {
      console.error("Network error:", err);
      alert("Failed to create community.");
    }
  };

  const filteredGroups = groups.filter((group: any) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const joinedGroups = groups.filter((group: any) => joinedGroupIds.includes(group.id));

  return (
    <div className="community-container">
      <aside className="sidebar left-sidebar">
        <ul>
          <li>
            <h3><Link to="/CommunityHome">Community Main Page</Link></h3>
          </li>
        </ul>

        <h3>MY COMMUNITIES</h3>
        <ul>
          <li>
            <button onClick={() => setModalOpen(true)} className="create-link">
              ➕ Create a community
            </button>
          </li>
          {joinedGroups.map((group: any) => (
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
            filteredGroups.map((group: any) => (
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
