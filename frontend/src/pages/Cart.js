
import React from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ fontSize: '80px', marginBottom: '20px' }}>🛒</div>
        <h2 style={{ color: '#333', marginBottom: '10px' }}>Your cart is empty!</h2>
        <p style={{ color: '#878787' }}>Add some products to get started</p>
        <button onClick={() => navigate('/')} style={{
          marginTop: '20px', padding: '12px 30px',
          backgroundColor: '#2874f0', color: 'white',
          border: 'none', borderRadius: '4px',
          fontSize: '15px', cursor: 'pointer'
        }}>Shop Now</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '0 20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>🛒 Your Cart</h2>

      <div style={{ backgroundColor: 'white', borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
        {cartItems.map(item => (
          <div key={item.id} style={{
            display: 'flex', alignItems: 'center', padding: '20px',
            borderBottom: '1px solid #f0f0f0', gap: '20px'
          }}>
            <div style={{ fontSize: '50px', width: '80px', textAlign: 'center' }}>
              🛍️
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>{item.name}</h3>
              <p style={{ color: '#878787', fontSize: '13px', marginBottom: '8px' }}>
                {item.category}
              </p>
              <p style={{ color: '#388e3c', fontSize: '13px' }}>In Stock</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                style={{ width: '30px', height: '30px', borderRadius: '50%',
                  border: '1px solid #ddd', backgroundColor: 'white',
                  fontSize: '18px', cursor: 'pointer' }}>-</button>
              <span style={{ fontSize: '16px', fontWeight: '500',
                minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                style={{ width: '30px', height: '30px', borderRadius: '50%',
                  border: '1px solid #ddd', backgroundColor: 'white',
                  fontSize: '18px', cursor: 'pointer' }}>+</button>
            </div>
            <div style={{ textAlign: 'right', minWidth: '100px' }}>
              <p style={{ fontSize: '18px', fontWeight: '700' }}>
                ₹{item.price * item.quantity}
              </p>
              <p style={{ fontSize: '12px', color: '#878787' }}>₹{item.price} each</p>
            </div>
            <button onClick={() => removeFromCart(item.id)}
              style={{ backgroundColor: 'white', border: '1px solid #ddd',
                padding: '6px 12px', borderRadius: '2px', cursor: 'pointer',
                color: '#ff4444', fontSize: '13px' }}>Remove</button>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '20px' }}>
        <h3 style={{ color: '#878787', fontSize: '14px',
          marginBottom: '15px', textTransform: 'uppercase' }}>Price Details</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between',
          marginBottom: '10px' }}>
          <span>Price ({cartItems.length} items)</span>
          <span>₹{getTotalPrice()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between',
          marginBottom: '10px' }}>
          <span>Delivery Charges</span>
          <span style={{ color: '#388e3c' }}>FREE</span>
        </div>
        <div style={{ borderTop: '1px solid #ddd', paddingTop: '15px',
          marginTop: '10px', display: 'flex', justifyContent: 'space-between',
          fontWeight: '700', fontSize: '18px' }}>
          <span>Total Amount</span>
          <span>₹{getTotalPrice()}</span>
        </div>

        <button onClick={() => navigate('/orders')} style={{
          width: '100%', padding: '14px', marginTop: '20px',
          backgroundColor: '#fb641b', color: 'white', border: 'none',
          borderRadius: '2px', fontSize: '16px', fontWeight: '600',
          cursor: 'pointer'
        }}>
          Place Order ⚡
        </button>

        <button onClick={clearCart} style={{
          width: '100%', padding: '10px', marginTop: '10px',
          backgroundColor: 'white', color: '#ff4444',
          border: '1px solid #ff4444', borderRadius: '2px',
          fontSize: '14px', cursor: 'pointer'
        }}>Clear Cart</button>
      </div>
    </div>
  );
}

export default Cart;