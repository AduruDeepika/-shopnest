import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';

function Navbar() {
  const { getTotalItems } = useCart();

  return (
    <nav style={{
      backgroundColor: '#2874f0', padding: '0 30px',
      position: 'sticky', top: 0, zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: '56px'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: 'white', fontSize: '22px', fontWeight: '700' }}>Shop</span>
          <span style={{ color: '#ffe500', fontSize: '22px', fontWeight: '700' }}>Nest</span>
          <span style={{ fontSize: '18px' }}>🛒</span>
        </Link>

        <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>
            Home
          </Link>
          <Link to="/profile" style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>
            👤 Profile
          </Link>
          <Link to="/login" style={{
            color: '#2874f0', fontSize: '14px', fontWeight: '600',
            padding: '6px 16px', backgroundColor: 'white', borderRadius: '2px'
          }}>Login</Link>
          <Link to="/register" style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>
            Register
          </Link>
          <Link to="/admin" style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>
            Admin
          </Link>
          <Link to="/cart" style={{
            color: 'white', fontSize: '14px',
            fontWeight: '500', position: 'relative'
          }}>
            🛒 Cart
            {getTotalItems() > 0 && (
              <span style={{
                position: 'absolute', top: '-8px', right: '-10px',
                backgroundColor: '#ff6161', color: 'white',
                borderRadius: '50%', width: '18px', height: '18px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: '700'
              }}>{getTotalItems()}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;