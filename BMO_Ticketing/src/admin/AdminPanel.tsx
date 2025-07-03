import { useEffect, useState } from "react";
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
  const [editingId, setEditingId] = useState<number | null>(null);

  // Load data
  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(setEvents);

    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(setUsers);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTicketTypes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, ticketTypes: e.target.value.split(",") });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId
      ? `http://localhost:5000/api/events/${editingId}`
      : "http://localhost:5000/api/events";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const updated = await res.json();
      if (editingId) {
        setEvents(events.map(ev => (ev.id === editingId ? updated : ev)));
      } else {
        setEvents([...events, updated]);
      }
      setForm({});
      setEditingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Delete this event?");
    if (!confirm) return;

    const res = await fetch(`http://localhost:5000/api/events/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setEvents(events.filter(ev => ev.id !== id));
    }
  };

  const startEdit = (event: Event) => {
    setForm(event);
    setEditingId(event.id);
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <p>Manage Events and Users</p>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <h2>Event Management</h2>
        <form className="event-form" onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={form.title || ""} onChange={handleChange} required />
          <input name="artist" placeholder="Artist" value={form.artist || ""} onChange={handleChange} required />
          <input name="price" placeholder="Price" value={form.price || ""} onChange={handleChange} required />
          <input name="venue" placeholder="Venue" value={form.venue || ""} onChange={handleChange} required />
          <input name="date" placeholder="Date" value={form.date || ""} onChange={handleChange} required />
          <input name="image" placeholder="Image Path (e.g. /event1.png)" value={form.image || ""} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={form.description || ""} onChange={handleChange} required />
          <input name="ticketTypes" placeholder="Ticket Types (comma separated)" value={form.ticketTypes?.join(",") || ""} onChange={handleTicketTypes} required />
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
            <li key={user.id}>
              {user.username} - {user.email}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default AdminPanel;
