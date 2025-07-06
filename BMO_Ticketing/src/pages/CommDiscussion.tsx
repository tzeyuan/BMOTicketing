import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/commDiscussion.css";

interface Thread {
  id: number;
  content: string;
  replies: { id: number; content: string }[];
}

const CommDiscussion = () => {
  const { id } = useParams();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [newThread, setNewThread] = useState("");

  // Fetch threads for this community
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/threads/community/${id}`)
        .then((res) => res.json())
        .then((data) => setThreads(data))
        .catch((err) => console.error("Error fetching threads:", err));
    }
  }, [id]);

  // Post new thread
  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThread.trim() || !id) return;

    const res = await fetch("http://localhost:5000/api/threads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: newThread,
        communityId: Number(id),
      }),
    });

    if (res.ok) {
      const created = await res.json();
      setThreads((prev) => [created, ...prev]);
      setNewThread("");
    } else {
      alert("Failed to post thread.");
    }
  };

  const handleReply = async (threadId: number, replyText: string) => {
    if (!replyText.trim()) return;

    const res = await fetch("http://localhost:5000/api/threads/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ threadId, content: replyText }),
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
      <h2>Community Thread</h2>

      <form onSubmit={handlePostSubmit} className="post-form">
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
            <p className="post-content">{thread.content}</p>
            <div className="replies">
              {thread.replies.map((reply) => (
                <div key={reply.id} className="reply">↪ {reply.content}</div>
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
