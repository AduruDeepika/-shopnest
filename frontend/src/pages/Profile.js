
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState([]);
  const [searched, setSearched] = useState(false);
  const [message, setMessage] = useState('');

  const handleSearch = () => {
    if (!email) {
      setMessage('Please enter your email!');
      return;
    }
    axios.get(`http://localhost:8080/api/orders/myorders?email=${email}`)
      .then(res => {
        setOrders(res.data);
        setSearched(true);
        setMessage('');
      })
      .catch(() => setMessage('Failed to fetch profile!'));
  };

  const getTotalSpent = () => {
    return orders.reduce((total, order) => total + order.totalAmount, 0);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'PENDING': return { bg: '#fff3e0', color: '#e65100' };
      case 'SHIPPED': return { bg: '#e3f2fd', color: '#1565c0' };
      case 'DELIVERED': return { bg: '#e8f5e9', color: '#2e7d32' };
      default: return { bg: '#f5f5f5', color: '#333' };
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '0 20px' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#2874f0', color: 'white',
        padding: '30px', borderRadius: '8px', marginBottom: '25px',
        display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%',
          backgroundColor: 'white', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '40px' }}>👤</div>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px' }}>
            {searched && orders.length > 0 ? orders[0].customerName : 'My Profile'}
          </h1>
          <p style={{ margin: '5px 0 0', opacity: 0.8 }}>
            {searched ? email : 'View your orders and profile'}
          </p>
        </div>
      </div>

      {/* Search Form */}
      {!searched && (
        <div style={{ backgroundColor: 'white', padding: '25px',
          borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginBottom: '25px' }}>
          <h3 style={{ marginBottom: '15px', color: '#333' }}>
            🔍 Find Your Profile
          </h3>
          {message && (
            <p style={{ color: '#c62828', marginBottom: '10px' }}>{message}</p>
          )}
          <input placeholder="Enter your email address"
            value={email} onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '12px',
              borderRadius: '4px', border: '1px solid #ddd',
              fontSize: '14px', boxSizing: 'border-box' }} />
          <button onClick={handleSearch} style={{
            width: '100%', padding: '12px', backgroundColor: '#2874f0',
            color: 'white', border: 'none', borderRadius: '4px',
            fontSize: '15px', fontWeight: '600', cursor: 'pointer'
          }}>View My Profile & Orders</button>
        </div>
      )}

      {/* Profile Stats */}
      {searched && (
        <>
          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '15px', marginBottom: '25px' }}>
            <div style={{ backgroundColor: 'white', padding: '20px',
              borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              textAlign: 'center' }}>
              <div style={{ fontSize: '35px', marginBottom: '8px' }}>📦</div>
              <h2 style={{ fontSize: '28px', color: '#2874f0', margin: '0' }}>
                {orders.length}
              </h2>
              <p style={{ color: '#878787', fontSize: '13px', margin: '4px 0 0' }}>
                Total Orders
              </p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '20px',
              borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              textAlign: 'center' }}>
              <div style={{ fontSize: '35px', marginBottom: '8px' }}>💰</div>
              <h2 style={{ fontSize: '28px', color: '#388e3c', margin: '0' }}>
                ₹{getTotalSpent()}
              </h2>
              <p style={{ color: '#878787', fontSize: '13px', margin: '4px 0 0' }}>
                Total Spent
              </p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '20px',
              borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              textAlign: 'center' }}>
              <div style={{ fontSize: '35px', marginBottom: '8px' }}>⭐</div>
              <h2 style={{ fontSize: '28px', color: '#ff9f00', margin: '0' }}>
                {orders.length > 5 ? 'Gold' : orders.length > 2 ? 'Silver' : 'Bronze'}
              </h2>
              <p style={{ color: '#878787', fontSize: '13px', margin: '4px 0 0' }}>
                Member Status
              </p>
            </div>
          </div>

          {/* Order History */}
          <div style={{ backgroundColor: 'white', padding: '25px',
            borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#333', margin: 0 }}>
                📋 Order History ({orders.length})
              </h3>
              <button onClick={() => setSearched(false)} style={{
                padding: '6px 14px', backgroundColor: 'white',
                color: '#2874f0', border: '1px solid #2874f0',
                borderRadius: '4px', cursor: 'pointer', fontSize: '13px'
              }}>Switch Account</button>
            </div>

            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px',
                color: '#878787' }}>
                <div style={{ fontSize: '50px', marginBottom: '15px' }}>📦</div>
                <h3>No orders yet!</h3>
                <p>Start shopping to see your orders here</p>
                <button onClick={() => navigate('/')} style={{
                  marginTop: '15px', padding: '10px 25px',
                  backgroundColor: '#2874f0', color: 'white',
                  border: 'none', borderRadius: '4px', cursor: 'pointer'
                }}>Start Shopping</button>
              </div>
            ) : (
              orders.map(order => {
                const statusStyle = getStatusColor(order.status);
                return (
                  <div key={order.id} style={{
                    border: '1px solid #f0f0f0', borderRadius: '8px',
                    padding: '20px', marginBottom: '15px',
                    transition: 'box-shadow 0.2s'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', marginBottom: '12px' }}>
                      <div>
                        <h4 style={{ margin: 0, color: '#333' }}>
                          Order #{order.id}
                        </h4>
                        <p style={{ margin: '4px 0 0', fontSize: '12px',
                          color: '#878787' }}>
                          📅 {new Date(order.orderDate).toLocaleString()}
                        </p>
                      </div>
                      <span style={{
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.color,
                        padding: '5px 14px', borderRadius: '12px',
                        fontSize: '13px', fontWeight: '600'
                      }}>{order.status}</span>
                    </div>

                    <div style={{ backgroundColor: '#f9f9f9', padding: '12px',
                      borderRadius: '4px', marginBottom: '12px' }}>
                      <p style={{ fontSize: '14px', color: '#555', margin: 0 }}>
                        🛍️ {order.productNames}
                      </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center' }}>
                      <span style={{ fontSize: '18px', fontWeight: '700',
                        color: '#333' }}>₹{order.totalAmount}</span>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button style={{
                          padding: '6px 14px', backgroundColor: 'white',
                          color: '#2874f0', border: '1px solid #2874f0',
                          borderRadius: '4px', cursor: 'pointer', fontSize: '13px'
                        }}>Track Order</button>
                        <button onClick={() => navigate('/')} style={{
                          padding: '6px 14px', backgroundColor: '#ff9f00',
                          color: 'white', border: 'none',
                          borderRadius: '4px', cursor: 'pointer', fontSize: '13px'
                        }}>Buy Again</button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;