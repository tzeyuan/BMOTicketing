/* This is the form for create new group in community page.*/ 

import { useState } from "react";
import "../css/GroupModal.css";

const GroupModal = ({
  categories,
  onClose,
  onCreate,
}: {
  categories: string[];
  onClose: () => void;
  onCreate: (data: { name: string; topic: string; description: string }) => void;
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState(categories[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;
    onCreate({ name, topic, description });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Create New Community Group</h3>
        <form onSubmit={handleSubmit}>
          <label>Group Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Group Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <label>Group Topic</label>
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <div className="modal-actions">
            <button type="submit">Create</button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroupModal;
