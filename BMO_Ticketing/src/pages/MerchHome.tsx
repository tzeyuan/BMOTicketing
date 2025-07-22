import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/MerchHome.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  eventTitle: string; // new: used for filtering
}

const MerchHome = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("All");
  const [eventOptions, setEventOptions] = useState<string[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    eventTitle: ""
  });
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    eventTitle: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/merchandise")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const events = Array.from(new Set(data.map((p: Product) => p.eventTitle)));
        setEventOptions(["All", ...events]);
      });

    const isAdminFlag = localStorage.getItem("isAdmin");
    setIsAdmin(isAdminFlag === "true");
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedEvent !== "All") {
      filtered = filtered.filter((p) => p.eventTitle === selectedEvent);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedEvent, products]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormData({ ...formData, image: reader.result as string });
    reader.readAsDataURL(file);
  };

  const handleEditImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setEditData({ ...editData, image: reader.result as string });
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/merchandise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price),
      }),
    });
    if (res.ok) {
      const newProduct = await res.json();
      setProducts([newProduct, ...products]);
      setShowForm(false);
      setFormData({ name: "", description: "", price: "", image: "", eventTitle: "" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this product?")) return;
    const res = await fetch(`http://localhost:5000/api/merchandise/${id}`, { method: "DELETE" });
    if (res.ok) setProducts(products.filter((p) => p.id !== id));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProductId) return;

    const res = await fetch(`http://localhost:5000/api/merchandise/${editingProductId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editData,
        price: parseFloat(editData.price),
      }),
    });

    if (res.ok) {
      const updated = await res.json();
      setProducts(products.map(p => p.id === editingProductId ? updated : p));
      setEditingProductId(null);
    }
  };

  return (
    <div className="merch-home">
      <h2>Merchandise</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}>
          {eventOptions.map((event, idx) => (
            <option key={idx} value={event}>{event}</option>
          ))}
        </select>
      </div>

      {isAdmin && (
        <button className="create-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Create New Product"}
        </button>
      )}

      {showForm && (
        <form className="create-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Event Name"
            value={formData.eventTitle}
            onChange={(e) => setFormData({ ...formData, eventTitle: e.target.value })}
            required
          />
          <input type="file" accept="image/*" onChange={handleImageUpload} required />
          <button type="submit">Submit</button>
        </form>
      )}

      <div className="merch-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            {editingProductId === product.id ? (
              <form onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  required
                />
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  required
                />
                <input
                  type="number"
                  value={editData.price}
                  onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                  required
                />
                <input
                  type="text"
                  value={editData.eventTitle}
                  onChange={(e) => setEditData({ ...editData, eventTitle: e.target.value })}
                  required
                />
                <input type="file" accept="image/*" onChange={handleEditImageUpload} />
                <div style={{ marginTop: "10px" }}>
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingProductId(null)} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <img src={product.image} alt={product.name} />
                <h4>{product.name}</h4>
                <p>RM {product.price.toFixed(2)}</p>
                <small>Event: {product.eventTitle}</small>
                <button onClick={() => navigate(`/merch/${product.id}`)}>View</button>
                {isAdmin && (
                  <>
                    <button className="edit-btn" onClick={() => {
                      setEditingProductId(product.id);
                      setEditData({
                        name: product.name,
                        description: product.description,
                        price: product.price.toString(),
                        image: product.image,
                        eventTitle: product.eventTitle
                      });
                    }}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MerchHome;
