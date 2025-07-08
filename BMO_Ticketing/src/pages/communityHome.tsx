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
  user: { username: string };
  replies: { id: number; content: string; user: { username: string } }[];
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

  const handleReply = async (threadId: number, replyText: string) => {
    if (!replyText.trim()) return;

    const res = await fetch("http://localhost:5000/api/threads/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ threadId, content: replyText }),
    });

    if (res.ok) {
      const newReply = await res.json();
      setThreads(prev =>
        prev.map(thread =>
          thread.id === threadId
            ? { ...thread, replies: [...thread.replies, newReply] }
            : thread
        )
      );
    } else {
      alert("Failed to post reply.");
    }
  };

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
            <div key={thread.id} className="thread-box">
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

const ReplyForm = ({
  postId,
  onReply,
}: {
  postId: number;
  onReply: (id: number, reply: string) => void;
}) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReply(postId, text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="reply-form">
      <input
        type="text"
        placeholder="Write a reply..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Reply</button>
    </form>
  );
};

export default CommunityHome;
