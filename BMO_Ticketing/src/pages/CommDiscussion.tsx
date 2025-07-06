import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/commDiscussion.css";

interface Thread {
  id: number;
  content: string;
  replies: string[];
}

const CommDiscussion = () => {
  const { id: communityId } = useParams();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [newThread, setNewThread] = useState("");

  useEffect(() => {
    if (communityId) {
      fetch(`http://localhost:5000/api/threads/${communityId}`)
        .then(res => res.json())
        .then(data => setThreads(data))
        .catch(err => console.error("Error fetching threads:", err));
    }
  }, [communityId]);

  const handlePostThread = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThread.trim() || !communityId) return;

    const res = await fetch("http://localhost:5000/api/threads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ communityId: parseInt(communityId), content: newThread }),
    });

    if (res.ok) {
      const created = await res.json();
      setThreads([created, ...threads]);
      setNewThread("");
    } else {
      alert("Failed to post thread.");
    }
  };

  const handleReply = async (threadId: number, reply: string) => {
    if (!reply.trim()) return;

    const res = await fetch(`http://localhost:5000/api/threads/${threadId}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply }),
    });

    if (res.ok) {
      const updated = await res.json();
      setThreads(threads.map(t => (t.id === threadId ? updated : t)));
    } else {
      alert("Failed to post reply.");
    }
  };

  return (
    <div className="discussion-page">
      <h2>Community Thread</h2>

      <form onSubmit={handlePostThread} className="post-form">
        <textarea
          placeholder="Start a discussion..."
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
              {thread.replies.map((r, idx) => (
                <div key={idx} className="reply">↪ {r}</div>
              ))}
              <ReplyForm threadId={thread.id} onReply={handleReply} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReplyForm = ({ threadId, onReply }: { threadId: number; onReply: (id: number, reply: string) => void }) => {
  const [replyText, setReplyText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReply(threadId, replyText);
    setReplyText("");
  };

  return (
    <form onSubmit={handleSubmit} className="reply-form">
      <input
        type="text"
        placeholder="Write a reply..."
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
      />
      <button type="submit">Reply</button>
    </form>
  );
};

export default CommDiscussion;
