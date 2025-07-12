import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/MerchHome.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const MerchHome = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/merchandise")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    const isAdminFlag = localStorage.getItem("isAdmin");
    setIsAdmin(isAdminFlag === "true");
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormData({ ...formData, image: reader.result as string });
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
      setFormData({ name: "", description: "", price: "", image: "" });
    }
  };

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Delete this product?");
    if (!confirm) return;
    const res = await fetch(`http://localhost:5000/api/merchandise/${id}`, { method: "DELETE" });
    if (res.ok) setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="merch-home">
      <h2>Merchandise</h2>

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
          <input type="file" accept="image/*" onChange={handleImageUpload} required />
          <button type="submit">Submit</button>
        </form>
      )}

      <div className="merch-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h4>{product.name}</h4>
            <p>RM {product.price.toFixed(2)}</p>
            <button onClick={() => navigate(`/merch/${product.id}`)}>View</button>
            {isAdmin && (
              <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MerchHome;
