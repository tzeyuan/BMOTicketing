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
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/merchandise")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to load products", err));
  }, []);

  return (
    <div className="merch-home">
      <h2>Available Merchandise</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id} onClick={() => navigate(`/merch/${product.id}`)}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>RM {product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MerchHome;
