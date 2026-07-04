
import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    // We will add real login logic later
    if (email && password) {
      setMessage('Login feature coming soon!');
    } else {
      setMessage('Please enter email and password!');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '30px',
      border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#ff6b35' }}>Login</h2>
      {message && <p style={{ color: 'blue', textAlign: 'center' }}>{message}</p>}
      <input placeholder="Email" value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '15px',
          borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
      <input placeholder="Password" type="password" value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '15px',
          borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
      <button onClick={handleLogin}
        style={{ width: '100%', padding: '12px', backgroundColor: '#333',
          color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer',
          fontSize: '16px' }}>
        Login
      </button>
    </div>
  );
}

export default Login;