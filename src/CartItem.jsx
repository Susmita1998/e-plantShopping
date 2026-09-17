/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      const unitCost = typeof item.cost === 'string' ? parseFloat(item.cost.substring(1)) : item.cost;
      total += unitCost * item.quantity;
    });
    return total.toFixed(2);
  };
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };



  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const unitCost = typeof item.cost === 'string' ? parseFloat(item.cost.substring(1)) : item.cost;
    return (unitCost * item.quantity).toFixed(2);
  };

  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    window.alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <div className="cart-summary">
        <p>{cart.reduce((total, item) => total + item.quantity, 0)} plants in your cart</p>
        <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      </div>
      <div>
        {cart.length === 0 ? <p className="empty-cart">Your cart is ready for something green.</p> : cart.map(item => (
          <div className="cart-item" key={item.id}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Unit price: {item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


