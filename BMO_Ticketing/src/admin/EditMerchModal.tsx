import { useState } from "react";
import "../css/MerchModal.css";

interface Props {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
  };
  onClose: () => void;
  onUpdate: (updatedProduct: any) => void;
}

const EditMerchModal = ({ product, onClose, onUpdate }: Props) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price.toString());
  const [image, setImage] = useState(product.image);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updated = {
      name,
      description,
      price: parseFloat(price),
      image,
    };

    try {
      const res = await fetch(`http://localhost:5000/api/merchandise/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.message || "Failed to update product.");
        return;
      }

      const result = await res.json();
      onUpdate(result);
      onClose();
    } catch (err) {
      alert("Failed to update product.");
      console.error("Edit error:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Merchandise</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <textarea
            placeholder="Product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input type="file" accept="image/*" onChange={handleImageChange} />

          {image && (
            <img
              src={image}
              alt="Preview"
              style={{ width: "100%", marginTop: "10px", borderRadius: "6px" }}
            />
          )}

          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMerchModal;
