import { useEffect, useState, ChangeEvent } from "react";
import "../css/AdminPanel.css";

interface Event {
  id: number;
  title: string;
  artist: string;
  price: string;
  venue: string;
  date: string;
  image: string;
  description: string;
  ticketTypes: string[];
}

interface User {
  id: number;
  username: string;
  email: string;
}

const AdminPanel = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<Partial<Event>>({});
  const [ticketTypes, setTicketTypes] = useState<string[]>([]);
  const [ticketInput, setTicketInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:5000/api/events").then(res => res.json()).then(setEvents);
    fetch("http://localhost:5000/api/users").then(res => res.json()).then(setUsers);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, date: e.target.value });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm({ ...form, image: reader.result as string });
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTicket = () => {
    if (ticketInput.trim()) {
      setTicketTypes([...ticketTypes, ticketInput.trim()]);
      setTicketInput("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const eventPayload = { ...form, ticketTypes };

    const url = editingId
      ? `http://localhost:5000/api/events/${editingId}`
      : "http://localhost:5000/api/events";

    const res = await fetch(url, {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventPayload),
    });

    if (res.ok) {
      const updated = await res.json();
      setEvents(editingId
        ? events.map(ev => (ev.id === editingId ? updated : ev))
        : [...events, updated]
      );
      resetForm();
    }
  };

  const resetForm = () => {
    setForm({});
    setTicketTypes([]);
    setTicketInput("");
    setEditingId(null);
    setImagePreview("");
  };

  const startEdit = (event: Event) => {
    setForm(event);
    setTicketTypes(event.ticketTypes);
    setImagePreview(event.image);
    setEditingId(event.id);
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:5000/api/events/${id}`, { method: "DELETE" });
    if (res.ok) {
      setEvents(events.filter(ev => ev.id !== id));
    }
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <p>Manage Events and Users</p>
      </aside>

      <main className="admin-main">
        <h2>Event Management</h2>

        <form className="event-form" onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={form.title || ""} onChange={handleChange} required />
          <input name="artist" placeholder="Artist" value={form.artist || ""} onChange={handleChange} required />
          <input name="price" placeholder="Price" value={form.price || ""} onChange={handleChange} required />
          <input name="venue" placeholder="Venue" value={form.venue || ""} onChange={handleChange} required />
          <input type="date" name="date" value={form.date || ""} onChange={handleDateChange} required />
          
          <label>Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {imagePreview && <img src={imagePreview} alt="Preview" className="preview-img" />}

          <textarea name="description" placeholder="Description" value={form.description || ""} onChange={handleChange} required />

          <div className="ticket-type-field">
            <input
              type="text"
              placeholder="Enter Ticket Type (e.g. VIP RM 988)"
              value={ticketInput}
              onChange={(e) => setTicketInput(e.target.value)}
            />
            <button type="button" onClick={handleAddTicket}>Add</button>
          </div>
          <ul className="ticket-type-list">
            {ticketTypes.map((t, idx) => (
              <li key={idx}>{t}</li>
            ))}
          </ul>

          <button type="submit">{editingId ? "Update Event" : "Create Event"}</button>
        </form>

        <h3>All Events</h3>
        <div className="event-list">
          {events.map(ev => (
            <div key={ev.id} className="event-card">
              <img src={ev.image} alt={ev.title} />
              <div>
                <strong>{ev.title}</strong>
                <p>{ev.artist}</p>
                <p>{ev.date}</p>
                <p>{ev.price}</p>
                <div className="admin-buttons">
                  <button onClick={() => startEdit(ev)}>Edit</button>
                  <button onClick={() => handleDelete(ev.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3>Registered Users</h3>
        <ul className="user-list">
          {users.map(user => (
            <li key={user.id}>{user.username} - {user.email}</li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default AdminPanel;
