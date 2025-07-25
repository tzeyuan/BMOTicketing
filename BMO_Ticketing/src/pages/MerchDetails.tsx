import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/MerchDetails.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const MerchDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/merchandise/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Failed to fetch product", err));
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exists = cart.find((item: any) => item.id === product?.id);

    if (!exists && product) {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    setAddedToCart(true);
  };

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="merch-details">
      <img src={product.image} alt={product.name} />
      <div className="details-info">
        <h2>{product.name}</h2>
        <p style={{ whiteSpace: "pre-line" }}>{product.description}</p>
        <p><strong>RM {product.price.toFixed(2)}</strong></p>

        {!addedToCart ? (
          <button onClick={handleAddToCart}>Add to Cart</button>
        ) : (
          <>
            <button onClick={() => navigate("/cart")}>View Cart</button>
            <button onClick={() => navigate("/MerchHome")}>Continue Shopping</button>
          </>
        )}
      </div>
    </div>
  );
};

export default MerchDetails;
