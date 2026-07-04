
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import AdminPanel from './pages/AdminPanel';
import Orders from './pages/Orders';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;