
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../CartContext';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '80px' }}>
        <div style={{ fontSize: '40px' }}>⏳</div>
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '30px auto', padding: '0 20px' }}>

      {/* Breadcrumb */}
      <div style={{ marginBottom: '20px', fontSize: '14px', color: '#878787' }}>
        <span onClick={() => navigate('/')}
          style={{ cursor: 'pointer', color: '#2874f0' }}>Home</span>
        <span> › </span>
        <span style={{ cursor: 'pointer', color: '#2874f0' }}
          onClick={() => navigate('/')}>{product.category}</span>
        <span> › </span>
        <span>{product.name}</span>
      </div>

      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr',
        gap: '30px', backgroundColor: 'white', padding: '30px',
        borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>

        {/* Left — Image */}
        <div>
          <div style={{ backgroundColor: '#f5f5f5', borderRadius: '8px',
            height: '350px',display: 'flex', alignItems: 'center',
justifyContent: 'center', overflow: 'hidden', marginBottom: '15px'
}}>
  <img src={product.imageUrl} alt={product.name}
    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
    onError={e => { e.target.onerror = null; e.target.src='https://via.placeholder.com/400x350?text=No+Image' }}
  />
</div>
          {/* Thumbnail row */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ width: '60px', height: '60px',
                backgroundColor: '#f5f5f5', borderRadius: '4px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '25px', border: '2px solid #2874f0', cursor: 'pointer' }}>
                🛍️
              </div>
            ))}
          </div>
        </div>

        {/* Right — Info */}
        <div>
          {/* Category badge */}
          <span style={{ backgroundColor: '#e3f2fd', color: '#1565c0',
            padding: '4px 10px', borderRadius: '12px', fontSize: '12px',
            fontWeight: '500' }}>{product.category}</span>

          <h1 style={{ fontSize: '26px', fontWeight: '600',
            marginTop: '12px', marginBottom: '8px', color: '#212121' }}>
            {product.name}
          </h1>

          <p style={{ color: '#878787', fontSize: '14px', marginBottom: '15px' }}>
            {product.description}
          </p>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center',
            gap: '10px', marginBottom: '15px' }}>
            <span style={{ backgroundColor: '#388e3c', color: 'white',
              padding: '3px 8px', borderRadius: '4px', fontSize: '13px' }}>
              ⭐ 4.3
            </span>
            <span style={{ color: '#878787', fontSize: '13px' }}>
              (1,247 ratings)
            </span>
          </div>

          {/* Price */}
          <div style={{ borderTop: '1px solid #f0f0f0',
            borderBottom: '1px solid #f0f0f0', padding: '15px 0',
            marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '30px', fontWeight: '700' }}>
                ₹{product.price}
              </span>
              <span style={{ fontSize: '16px', color: '#878787',
                textDecoration: 'line-through' }}>
                ₹{Math.round(product.price * 1.2)}
              </span>
              <span style={{ fontSize: '16px', color: '#388e3c', fontWeight: '600' }}>
                20% off
              </span>
            </div>
            <p style={{ color: '#388e3c', fontSize: '13px', marginTop: '5px' }}>
              Inclusive of all taxes
            </p>
          </div>

          {/* Stock */}
          <div style={{ marginBottom: '20px' }}>
            <span style={{
              backgroundColor: product.stock > 10 ? '#e8f5e9' : '#ffebee',
              color: product.stock > 10 ? '#2e7d32' : '#c62828',
              padding: '5px 12px', borderRadius: '4px', fontSize: '13px',
              fontWeight: '500'
            }}>
              {product.stock > 10 ? `✅ In Stock (${product.stock} available)`
                : product.stock > 0 ? `⚠️ Only ${product.stock} left!`
                : '❌ Out of Stock'}
            </span>
          </div>

          {/* Quantity Selector */}
          <div style={{ display: 'flex', alignItems: 'center',
            gap: '15px', marginBottom: '25px' }}>
            <span style={{ fontWeight: '500', color: '#333' }}>Quantity:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{ width: '35px', height: '35px', borderRadius: '50%',
                  border: '1px solid #ddd', backgroundColor: 'white',
                  fontSize: '20px', cursor: 'pointer' }}>-</button>
              <span style={{ fontSize: '18px', fontWeight: '600',
                minWidth: '30px', textAlign: 'center' }}>{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                style={{ width: '35px', height: '35px', borderRadius: '50%',
                  border: '1px solid #ddd', backgroundColor: 'white',
                  fontSize: '20px', cursor: 'pointer' }}>+</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
            <button onClick={handleAddToCart} style={{
              flex: 1, padding: '14px',
              backgroundColor: added ? '#388e3c' : '#ff9f00',
              color: 'white', border: 'none', borderRadius: '4px',
              fontSize: '16px', fontWeight: '600', cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}>
              {added ? '✅ Added to Cart!' : '🛒 Add to Cart'}
            </button>
            <button onClick={() => {
              handleAddToCart();
              navigate('/orders');
            }} style={{
              flex: 1, padding: '14px', backgroundColor: '#fb641b',
              color: 'white', border: 'none', borderRadius: '4px',
              fontSize: '16px', fontWeight: '600', cursor: 'pointer'
            }}>⚡ Buy Now</button>
          </div>

          {/* Features */}
          <div style={{ backgroundColor: '#f9f9f9', padding: '15px',
            borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '12px', color: '#333' }}>
              🎁 Offers & Benefits
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                '🚚 Free delivery on orders above ₹499',
                '↩️ 10 days easy return policy',
                '🔒 Secure payment guaranteed',
                '⭐ Top rated by customers'
              ].map((offer, i) => (
                <p key={i} style={{ fontSize: '13px', color: '#555' }}>{offer}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button onClick={() => navigate('/')} style={{
        marginTop: '20px', padding: '10px 25px',
        backgroundColor: 'white', color: '#2874f0',
        border: '1px solid #2874f0', borderRadius: '4px',
        fontSize: '14px', cursor: 'pointer'
      }}>← Back to Products</button>

    </div>
  );
}

export default ProductDetail;