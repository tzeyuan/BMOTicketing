import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/commDiscussion.css";

interface Thread {
  id: number;
  content: string;
  title: string;
  user: { username: string };
  replies: { id: number; content: string; user: { username: string } }[];
}

interface CommunityGroup {
  id: number;
  name: string;
  topic: string;
  description: string;
}

const CommDiscussion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [threads, setThreads] = useState<Thread[]>([]);
  const [title, setTitle] = useState("");
  const [newThread, setNewThread] = useState("");
  const [communityName, setCommunityName] = useState("");
  const [joined, setJoined] = useState(false);

  // Fetch community name
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/communities/${id}`)
        .then(res => res.json())
        .then((data: CommunityGroup) => setCommunityName(data.name))
        .catch(err => console.error("Failed to load community name:", err));
    }
  }, [id]);

  // Fetch threads
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/threads/community/${id}`)
        .then((res) => res.json())
        .then((data) => setThreads(data))
        .catch((err) => console.error("Error fetching threads:", err));
    }
  }, [id]);

  // Check if user joined the group
  useEffect(() => {
    if (userId && id) {
      fetch(`http://localhost:5000/api/communities/joined/${userId}`)
        .then(res => res.json())
        .then((data) => {
          const joinedIds = data.map((d: any) => d.communityId);
          setJoined(joinedIds.includes(Number(id)));
        })
        .catch(err => console.error("Error checking join status:", err));
    }
  }, [userId, id]);

  const handleLeaveGroup = async () => {
    if (!window.confirm("Are you sure you want to leave this group?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/communities/leave`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, communityId: id }),
      });

      if (res.ok) {
        alert("You have left the group.");
        navigate("/Community"); // or redirect to home page
      } else {
        const err = await res.json();
        alert(err.message || "Failed to leave group");
      }
    } catch (err) {
      console.error("Leave group error:", err);
      alert("Error leaving group.");
    }
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !newThread.trim()) {
      alert("Please fill in both title and content.");
      return;
    }
    if (!userId) {
      alert("Please log in to post a thread.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          communityId: Number(id),
          userId: Number(userId),
          title,
          content: newThread,
        }),
      });

      if (!res.ok) throw new Error("Failed to post thread");

      const created = await res.json();
      setThreads([created, ...threads]);
      setTitle("");
      setNewThread("");
    } catch (err) {
      alert("Failed to post thread.");
    }
  };

  const handleReply = async (threadId: number, replyText: string) => {
    if (!replyText.trim()) return;
    if (!userId) {
      alert("Please log in to reply.");
      return;
    }

    const res = await fetch("http://localhost:5000/api/threads/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        threadId,
        content: replyText,
        userId: Number(userId),
      }),
    });

    if (res.ok) {
      const newReply = await res.json();
      setThreads((prev) =>
        prev.map((thread) =>
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
    <div className="discussion-page">
      <h2>{communityName}</h2>

      {joined && (
        <button onClick={handleLeaveGroup} className="leave-btn">
          Leave Group
        </button>
      )}

      <form onSubmit={handlePostSubmit} className="post-form">
        <input
          type="text"
          placeholder="Thread title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Ask a question or start a discussion..."
          value={newThread}
          onChange={(e) => setNewThread(e.target.value)}
          required
        />
        <button type="submit">Post</button>
      </form>

      <div className="posts">
        {threads.map((thread) => (
          <div key={thread.id} className="post">
            <h4>{thread.title}</h4>
            <p className="post-content">{thread.content}</p>
            <small>By {thread.user?.username}</small>
            <div className="replies">
              {thread.replies.map((reply) => (
                <div key={reply.id} className="reply">
                  ↪ <strong>{reply.user?.username}:</strong> {reply.content}
                </div>
              ))}
              <ReplyForm postId={thread.id} onReply={handleReply} />
            </div>
          </div>
        ))}
      </div>
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

export default CommDiscussion;
