import { useParams } from "react-router-dom";
import { useState } from "react";
import "../css/commDiscussion.css";

interface Post {
  id: number;
  content: string;
  replies: string[];
}

const initialPosts: Post[] = [
  {
    id: 1,
    content: "What time should we gather before the aespa concert?",
    replies: ["Around 6 PM at the main gate!", "I'm thinking 5:30 to grab snacks."],
  },
  {
    id: 2,
    content: "Anyone bringing banners or lightsticks?",
    replies: ["I am! Got mine from Shopee.", "Let's design one together."],
  },
];

const CommDiscussion = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim()) {
      const newEntry: Post = {
        id: posts.length + 1,
        content: newPost,
        replies: [],
      };
      setPosts([newEntry, ...posts]);
      setNewPost("");
    }
  };

  const handleReply = (postId: number, reply: string) => {
    if (!reply.trim()) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, replies: [...p.replies, reply] } : p
      )
    );
  };

  return (
    <div className="discussion-page">
      <h2>Community Thread: Group Discussion</h2>

      <form onSubmit={handlePostSubmit} className="post-form">
        <textarea
          placeholder="Ask a question or start a discussion..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          required
        />
        <button type="submit">Post</button>
      </form>

      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <p className="post-content">{post.content}</p>
            <div className="replies">
              {post.replies.map((reply, idx) => (
                <div className="reply" key={idx}>↪ {reply}</div>
              ))}
              <ReplyForm postId={post.id} onReply={handleReply} />
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
