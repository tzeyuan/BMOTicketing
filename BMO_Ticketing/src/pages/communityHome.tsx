import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  user: { username: string };
  replies: { id: number; content: string; user: { username: string } }[];
}

const CommunityHome = () => {
  const userId = localStorage.getItem("userId");
  const [joinedGroups, setJoinedGroups] = useState<CommunityGroup[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/api/communities/joined/${userId}`)
        .then(res => res.json())
        .then(async joined => {
          const groupIds = joined.map((j: any) => j.communityId);
          const allGroups = await fetch("http://localhost:5000/api/communities").then(res => res.json());
          const matchedGroups = allGroups.filter((g: any) => groupIds.includes(g.id));
          setJoinedGroups(matchedGroups);

          const allThreads: Thread[] = [];
          for (const id of groupIds) {
            const res = await fetch(`http://localhost:5000/api/threads/community/${id}`);
            const data = await res.json();
            allThreads.push(...data);
          }

          // Optional: sort by newest
          allThreads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

          setThreads(allThreads);
        })
        .catch(err => console.error("Failed to load community threads", err));
    }
  }, [userId]);

  return (
    <div className="community-container">
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

      <main className="community-main">
        <h2>All Joined Community Threads</h2>
        {threads.length === 0 ? (
          <p>No threads available.</p>
        ) : (
          threads.map((thread) => (
            <div
              key={thread.id}
              className="thread-box"
              onClick={() => navigate(`/community/${thread.communityId}`)}
              style={{ cursor: "pointer" }}
              title="Click to open full discussion"
            >
              <h4>{thread.title}</h4>
              <p>{thread.content}</p>
              <small>By {thread.user?.username} | {new Date(thread.createdAt).toLocaleString()}</small>

              <div className="replies">
                {thread.replies.map((reply) => (
                  <div key={reply.id} className="reply">
                    ↪ <strong>{reply.user?.username}:</strong> {reply.content}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default CommunityHome;
