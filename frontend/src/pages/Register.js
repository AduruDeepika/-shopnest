
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = () => {
    axios.get(`http://localhost:8080/api/auth/register?name=${name}&email=${email}&password=${password}`)
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        setMessage('Registration failed!');
      });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '30px',
      border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#ff6b35' }}>Create Account</h2>
      {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
      <input placeholder="Your Name" value={name}
        onChange={e => setName(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '15px',
          borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
      <input placeholder="Email" value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '15px',
          borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
      <input placeholder="Password" type="password" value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '15px',
          borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
      <button onClick={handleRegister}
        style={{ width: '100%', padding: '12px', backgroundColor: '#ff6b35',
          color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer',
          fontSize: '16px' }}>
        Register
      </button>
    </div>
  );
}

export default Register;