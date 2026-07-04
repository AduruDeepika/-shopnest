
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const categories = ['Electronics', 'Clothing', 'Footwear', 'Bags', 'Books', 'Home', 'Sports'];

  const fetchProducts = () => {
    axios.get('http://localhost:8080/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    if (!name || !price || !stock || !category) {
      setMessage('❌ Please fill all fields!');
      return;
    }
    const url = `http://localhost:8080/api/products/add?name=${name}&description=${description}&price=${price}&stock=${stock}&category=${category}&imageUrl=product.jpg`;
    axios.get(url)
      .then(() => {
        setMessage('✅ Product added successfully!');
        setName(''); setDescription('');
        setPrice(''); setStock(''); setCategory('');
        fetchProducts();
      })
      .catch(() => setMessage('❌ Failed to add product!'));
  };

  const handleDelete = (id) => {
    axios.get(`http://localhost:8080/api/products/delete/${id}`)
      .then(() => {
        setMessage('✅ Product deleted!');
        fetchProducts();
      })
      .catch(() => setMessage('❌ Failed to delete!'));
  };

  const inputStyle = {
    width: '100%', padding: '10px', marginBottom: '12px',
    borderRadius: '4px', border: '1px solid #ddd',
    fontSize: '14px', boxSizing: 'border-box', outline: 'none'
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '30px auto', padding: '0 20px' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#2874f0', color: 'white',
        padding: '20px 30px', borderRadius: '8px', marginBottom: '30px' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>⚙️ Admin Panel</h1>
        <p style={{ margin: '5px 0 0', opacity: 0.8 }}>Manage your ShopNest products</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>

        {/* Add Product Form */}
        <div style={{ backgroundColor: 'white', padding: '25px',
          borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          height: 'fit-content' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '20px',
            color: '#333', borderBottom: '2px solid #2874f0', paddingBottom: '10px' }}>
            ➕ Add New Product
          </h2>

          {message && (
            <div style={{ padding: '10px', marginBottom: '15px',
              backgroundColor: message.includes('✅') ? '#e8f5e9' : '#ffebee',
              borderRadius: '4px', fontSize: '14px' }}>
              {message}
            </div>
          )}

          <input placeholder="Product Name *" value={name}
            onChange={e => setName(e.target.value)} style={inputStyle} />
          <input placeholder="Description" value={description}
            onChange={e => setDescription(e.target.value)} style={inputStyle} />
          <input placeholder="Price (₹) *" type="number" value={price}
            onChange={e => setPrice(e.target.value)} style={inputStyle} />
          <input placeholder="Stock Quantity *" type="number" value={stock}
            onChange={e => setStock(e.target.value)} style={inputStyle} />

          <select value={category} onChange={e => setCategory(e.target.value)}
            style={{ ...inputStyle, color: category ? '#333' : '#999' }}>
            <option value="">Select Category *</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <button onClick={handleAddProduct} style={{
            width: '100%', padding: '12px',
            backgroundColor: '#2874f0', color: 'white',
            border: 'none', borderRadius: '4px',
            fontSize: '15px', fontWeight: '600', cursor: 'pointer'
          }}>
            ➕ Add Product
          </button>
        </div>

        {/* Products Table */}
        <div style={{ backgroundColor: 'white', padding: '25px',
          borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '20px',
            color: '#333', borderBottom: '2px solid #2874f0', paddingBottom: '10px' }}>
            📦 All Products ({products.length})
          </h2>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ padding: '12px', textAlign: 'left',
                  fontSize: '13px', color: '#666' }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left',
                  fontSize: '13px', color: '#666' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left',
                  fontSize: '13px', color: '#666' }}>Price</th>
                <th style={{ padding: '12px', textAlign: 'left',
                  fontSize: '13px', color: '#666' }}>Stock</th>
                <th style={{ padding: '12px', textAlign: 'left',
                  fontSize: '13px', color: '#666' }}>Category</th>
                <th style={{ padding: '12px', textAlign: 'left',
                  fontSize: '13px', color: '#666' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '12px', fontSize: '14px',
                    color: '#878787' }}>#{product.id}</td>
                  <td style={{ padding: '12px', fontSize: '14px',
                    fontWeight: '500' }}>{product.name}</td>
                  <td style={{ padding: '12px', fontSize: '14px',
                    color: '#2874f0', fontWeight: '600' }}>₹{product.price}</td>
                  <td style={{ padding: '12px', fontSize: '14px' }}>
                    <span style={{
                      backgroundColor: product.stock > 10 ? '#e8f5e9' : '#ffebee',
                      color: product.stock > 10 ? '#388e3c' : '#c62828',
                      padding: '3px 8px', borderRadius: '12px', fontSize: '12px'
                    }}>{product.stock}</span>
                  </td>
                  <td style={{ padding: '12px', fontSize: '14px' }}>
                    <span style={{ backgroundColor: '#e3f2fd', color: '#1565c0',
                      padding: '3px 8px', borderRadius: '12px',
                      fontSize: '12px' }}>{product.category}</span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <button onClick={() => handleDelete(product.id)} style={{
                      backgroundColor: '#ffebee', color: '#c62828',
                      border: '1px solid #ef9a9a', padding: '5px 12px',
                      borderRadius: '4px', cursor: 'pointer', fontSize: '13px'
                    }}>🗑️ Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#878787' }}>
              <div style={{ fontSize: '40px' }}>📦</div>
              <p>No products yet. Add your first product!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;