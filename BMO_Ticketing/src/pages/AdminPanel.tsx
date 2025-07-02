import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      alert("Access denied.");
      navigate("/"); // redirect if not admin
    }
  }, []);

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <ul>
        <li><a href="/admin/events">Manage Events</a></li>
        <li><a href="/admin/users">View Users</a></li>
        <li><a href="/admin/tickets">Manage Tickets</a></li>
      </ul>
    </div>
  );
};

export default AdminPanel;
