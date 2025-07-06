import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/commDiscussion.css";

interface Thread {
  id: number;
  content: string;
  title: string;
  replies: { id: number; content: string }[];
}

const CommDiscussion = () => {
  const { id } = useParams();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [title, setTitle] = useState("");
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

    if (!title.trim() || !newThread.trim()) {
      alert("Please fill in both title and content.");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to post a thread.");
      return;
    }

    console.log("Posting thread:", {
      communityId: Number(id),
      userId: Number(userId),
      title,
      content: newThread,
    });

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

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Server error");
      }

      const created = await res.json();
      setThreads([created, ...threads]);
      setTitle("");
      setNewThread("");
    } catch (err) {
      alert("Failed to post thread.");
      console.error("Thread post error:", err);
    }
  };

  // Post a reply
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
