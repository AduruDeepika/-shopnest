
import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../CartContext';

function Orders() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const [showOrders, setShowOrders] = useState(false);

  const handlePlaceOrder = () => {
    if (!name || !email) {
      setMessage('Please enter your name and email!');
      return;
    }
    if (cartItems.length === 0) {
      setMessage('Your cart is empty!');
      return;
    }
    const productNames = cartItems.map(item =>
      item.name + ' x' + item.quantity).join(', ');
    const total = getTotalPrice();
    const url = 'http://localhost:8080/api/orders/place?customerName='
      + name + '&customerEmail=' + email
      + '&productNames=' + encodeURIComponent(productNames)
      + '&totalAmount=' + total;
    axios.get(url)
      .then(() => {
        setMessage('Order placed successfully!');
        clearCart();
      })
      .catch(() => setMessage('Failed to place order!'));
  };

  const handleViewOrders = () => {
    if (!email) {
      setMessage('Please enter your email first!');
      return;
    }
    axios.get('http://localhost:8080/api/orders/myorders?email=' + email)
      .then(res => {
        setOrders(res.data);
        setShowOrders(true);
        setMessage('');
      })
      .catch(() => setMessage('Failed to fetch orders!'));
  };

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '0 20px' }}>
      <h2 style={{ marginBottom: '25px', color: '#333' }}>Place Order</h2>

      <div style={{ backgroundColor: 'white', padding: '25px',
        borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '25px' }}>

        {message && (
          <div style={{ padding: '12px', marginBottom: '15px',
            borderRadius: '4px', backgroundColor: '#e8f5e9',
            fontSize: '14px' }}>{message}</div>
        )}

        <input placeholder="Your Name" value={name}
          onChange={e => setName(e.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '12px',
            borderRadius: '4px', border: '1px solid #ddd',
            fontSize: '14px', boxSizing: 'border-box' }} />

        <input placeholder="Your Email" value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '20px',
            borderRadius: '4px', border: '1px solid #ddd',
            fontSize: '14px', boxSizing: 'border-box' }} />

        {cartItems.length > 0 ? (
          <div style={{ backgroundColor: '#f5f5f5', padding: '15px',
            borderRadius: '4px', marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '10px' }}>Order Summary:</h4>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex',
                justifyContent: 'space-between', marginBottom: '6px',
                fontSize: '14px' }}>
                <span>{item.name} x{item.quantity}</span>
                <span>Rs.{item.price * item.quantity}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #ddd', paddingTop: '10px',
              marginTop: '10px', display: 'flex',
              justifyContent: 'space-between', fontWeight: '700' }}>
              <span>Total</span>
              <span>Rs.{getTotalPrice()}</span>
            </div>
          </div>
        ) : (
          <div style={{ backgroundColor: '#f5f5f5', padding: '15px',
            borderRadius: '4px', marginBottom: '20px',
            textAlign: 'center', color: '#878787' }}>
            Cart is empty - add products first!
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handlePlaceOrder} style={{
            flex: 1, padding: '12px', backgroundColor: '#fb641b',
            color: 'white', border: 'none', borderRadius: '4px',
            fontSize: '15px', fontWeight: '600', cursor: 'pointer'
          }}>Place Order</button>

          <button onClick={handleViewOrders} style={{
            flex: 1, padding: '12px', backgroundColor: '#2874f0',
            color: 'white', border: 'none', borderRadius: '4px',
            fontSize: '15px', fontWeight: '600', cursor: 'pointer'
          }}>View My Orders</button>
        </div>
      </div>

      {showOrders && (
        <div style={{ backgroundColor: 'white', padding: '25px',
          borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '20px' }}>My Orders ({orders.length})</h3>
          {orders.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#878787' }}>
              No orders found!
            </p>
          ) : (
            orders.map(order => (
              <div key={order.id} style={{ border: '1px solid #f0f0f0',
                borderRadius: '8px', padding: '20px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between',
                  marginBottom: '10px' }}>
                  <h4>Order #{order.id}</h4>
                  <span style={{ backgroundColor: '#fff3e0', color: '#e65100',
                    padding: '4px 12px', borderRadius: '12px',
                    fontSize: '13px' }}>{order.status}</span>
                </div>
                <p style={{ fontSize: '14px', marginBottom: '6px' }}>
                  Products: {order.productNames}
                </p>
                <p style={{ fontSize: '14px', marginBottom: '6px' }}>
                  Total: Rs.{order.totalAmount}
                </p>
                <p style={{ fontSize: '12px', color: '#878787' }}>
                  Date: {new Date(order.orderDate).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Orders;