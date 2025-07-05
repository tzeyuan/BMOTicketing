import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Community.css";

interface CommunityGroup {
  id: number;
  name: string;
  topic: string;
  description: string;
}

interface Thread {
  id: number;
  communityId: number;
  title: string;
  content: string;
  createdAt: string;
  username: string;
}

const CommunityHome = () => {
  const userId = localStorage.getItem("userId");
  const [joinedGroups, setJoinedGroups] = useState<CommunityGroup[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    if (userId) {
      // Load joined communities
      fetch(`http://localhost:5000/api/communities/joined/${userId}`)
        .then(res => res.json())
        .then(async joined => {
          const groupIds = joined.map((j: any) => j.communityId);
          
          // Fetch community details
          const allGroups = await fetch("http://localhost:5000/api/communities").then(res => res.json());
          const matchedGroups = allGroups.filter((g: any) => groupIds.includes(g.id));
          setJoinedGroups(matchedGroups);

          // Fetch threads from all joined groups
          const allThreads: Thread[] = [];
          for (const id of groupIds) {
            const res = await fetch(`http://localhost:5000/api/threads/community/${id}`);
            const data = await res.json();
            allThreads.push(...data);
          }
          setThreads(allThreads);
        })
        .catch(err => console.error("Failed to load community threads", err));
    }
  }, [userId]);

  return (
    <div className="community-container">
      {/* Sidebar */}
      <aside className="sidebar left-sidebar">
        <ul>
          <li><h3><Link to="/">Home</Link></h3></li>
        </ul>
        <h3>COMMUNITIES</h3>
        <ul>
          {joinedGroups.map(group => (
            <li key={group.id}>
              <Link to={`/community/${group.id}`}>{group.name}</Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="community-main">
        <h2>All Joined Community Threads</h2>
        {threads.length === 0 ? (
          <p>No threads available.</p>
        ) : (
          threads.map(thread => (
            <div key={thread.id} className="thread-box">
              <h4>{thread.title}</h4>
              <p>{thread.content}</p>
              <small>By {thread.username} | {new Date(thread.createdAt).toLocaleString()}</small>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default CommunityHome;
