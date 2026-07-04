import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('default');
  const { addToCart } = useCart();
  const [added, setAdded] = useState({});
  const navigate = useNavigate();

  const categories = ['All', 'Electronics', 'Clothing', 'Footwear', 'Bags', 'Books', 'Home', 'Sports'];

  useEffect(() => {
    axios.get('http://localhost:8080/api/products')
      .then(response => {
        setProducts(response.data);
        setFiltered(response.data);
      })
      .catch(error => console.log('Error:', error));
  }, []);

  useEffect(() => {
    let result = [...products];

    // Search filter
    if (search) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }

    // Sort
    if (sort === 'low') result.sort((a, b) => a.price - b.price);
    if (sort === 'high') result.sort((a, b) => b.price - a.price);
    if (sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name));

    setFiltered(result);
  }, [search, category, sort, products]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAdded(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAdded(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <div>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #2874f0 0%, #0056d2 100%)',
        color: 'white', padding: '50px 20px',
        textAlign: 'center', marginBottom: '20px'
      }}>
        <h1 style={{ fontSize: '38px', fontWeight: '700', marginBottom: '15px' }}>
          Welcome to ShopNest 🛒
        </h1>
        <p style={{ fontSize: '16px', opacity: 0.9, marginBottom: '25px' }}>
          Discover amazing products at unbeatable prices
        </p>

        {/* Search Bar in Hero */}
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex' }}>
          <input
            placeholder="Search for products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, padding: '14px 20px', fontSize: '15px',
              border: 'none', borderRadius: '4px 0 0 4px', outline: 'none'
            }}
          />
          <button style={{
            backgroundColor: '#ffe500', border: 'none',
            padding: '0 20px', borderRadius: '0 4px 4px 0',
            fontSize: '20px', cursor: 'pointer'
          }}>🔍</button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 40px' }}>

        {/* Filter Bar */}
        <div style={{
          backgroundColor: 'white', padding: '15px 20px',
          borderRadius: '8px', marginBottom: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          display: 'flex', gap: '15px', alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontWeight: '600', color: '#333' }}>Filter:</span>

          {/* Category Buttons */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{
                padding: '6px 14px', borderRadius: '20px',
                border: '1px solid #ddd', cursor: 'pointer',
                backgroundColor: category === cat ? '#2874f0' : 'white',
                color: category === cat ? 'white' : '#333',
                fontSize: '13px', fontWeight: '500',
                transition: 'all 0.2s'
              }}>{cat}</button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div style={{ marginLeft: 'auto' }}>
            <select value={sort} onChange={e => setSort(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '4px',
                border: '1px solid #ddd', fontSize: '14px',
                cursor: 'pointer', outline: 'none' }}>
              <option value="default">Sort By</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <p style={{ color: '#878787', fontSize: '14px', marginBottom: '15px' }}>
          Showing {filtered.length} of {products.length} products
          {search && ` for "${search}"`}
          {category !== 'All' && ` in ${category}`}
        </p>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px'
        }}>
          {filtered.map(product => (
            <div key={product.id} style={{
              backgroundColor: 'white', borderRadius: '4px', padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            }}>

              {/* Product Image */}
              <div onClick={() => navigate(`/product/${product.id}`)}
                style={{
                  backgroundColor: '#f5f5f5', borderRadius: '4px',
                  height: '180px',display: 'flex', alignItems: 'center',
justifyContent: 'center', marginBottom: '15px', overflow: 'hidden'
}}>
  <img src={product.imageUrl} alt={product.name}
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    onError={e => { e.target.onerror = null; e.target.src='https://via.placeholder.com/200x180?text=No+Image' }}
  />
</div>

              <h3 style={{ fontSize: '15px', fontWeight: '500',
                marginBottom: '6px', color: '#212121' }}>{product.name}</h3>
              <p style={{ fontSize: '12px', color: '#878787',
                marginBottom: '8px' }}>{product.description}</p>

              <div style={{ marginBottom: '6px' }}>
                <span style={{ fontSize: '18px', fontWeight: '700' }}>
                  ₹{product.price}
                </span>
                <span style={{ fontSize: '12px', color: '#878787',
                  marginLeft: '8px', textDecoration: 'line-through' }}>
                  ₹{Math.round(product.price * 1.2)}
                </span>
                <span style={{ fontSize: '12px', color: '#388e3c',
                  marginLeft: '8px', fontWeight: '500' }}>20% off</span>
              </div>

              <p style={{ fontSize: '12px', color: '#878787', marginBottom: '15px' }}>
                📦 {product.stock} in stock •
                <span style={{ color: '#2874f0' }}> {product.category}</span>
              </p>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => handleAddToCart(product)} style={{
                  flex: 1, padding: '10px',
                  backgroundColor: added[product.id] ? '#388e3c' : '#ff9f00',
                  color: 'white', border: 'none', borderRadius: '2px',
                  fontWeight: '600', fontSize: '13px',
                  transition: 'background-color 0.3s', cursor: 'pointer'
                }}>
                  {added[product.id] ? '✅ Added!' : '🛒 Add to Cart'}
                </button>
                <button onClick={() => navigate(`/product/${product.id}`)}
                  style={{
                    flex: 1, padding: '10px', backgroundColor: '#fb641b',
                    color: 'white', border: 'none', borderRadius: '2px',
                    fontWeight: '600', fontSize: '13px', cursor: 'pointer'
                  }}>⚡ Buy Now</button>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#878787' }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>🔍</div>
            <h3>No products found!</h3>
            <p>Try a different search or category</p>
            <button onClick={() => { setSearch(''); setCategory('All'); }}
              style={{ marginTop: '15px', padding: '10px 25px',
                backgroundColor: '#2874f0', color: 'white',
                border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;