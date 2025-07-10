import { useState } from "react";
import "../css/MerchModal.css";

interface CreateMerchModalProps {
  onClose: () => void;
  onCreate: (newMerch: {
    name: string;
    description: string;
    price: number;
    image: string;
  }) => void;
}

const CreateMerchModal = ({ onClose, onCreate }: CreateMerchModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return alert("Please select an image.");

    const reader = new FileReader();
    reader.onloadend = () => {
      onCreate({
        name,
        description,
        price,
        image: reader.result as string,
      });
      onClose();
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add New Product</h3>
        <form onSubmit={handleSubmit} className="modal-form">
            <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                required
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
            />

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

export default CreateMerchModal;
