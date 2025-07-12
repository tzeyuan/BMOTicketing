import { useEffect, useState } from "react";
import "../css/Cart.css";

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const updateCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleIncrement = (id: number) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  const handleDecrement = (id: number) => {
    const updated = cart
      .map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updated);
  };

  const handleRemove = (id: number) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Your Cart</h2>
        <a href="/merchandise" className="continue-link">Continue Shopping</a>
      </div>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-details">
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <p><strong>RM {item.price.toFixed(2)}</strong></p>
                <div className="cart-quantity">
                  <button onClick={() => handleDecrement(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item.id)}>+</button>
                </div>
                <button onClick={() => handleRemove(item.id)} className="delete-icon">
                  Clear
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <p><strong>Subtotal</strong> &nbsp;&nbsp; RM {getTotal()}</p>
            <p className="checkout-info">
              <em>Shipping, taxes, and discounts will be calculated at checkout.</em>
            </p>
            <button className="checkout-btn">Checkout ➞</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
