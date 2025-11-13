import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState({ user: '', rating: 5, comment: '' });
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [imageZoomed, setImageZoomed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
      setSelectedImage(response.data.image);
      setSelectedSize(response.data.sizes[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/reviews/${id}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.user.trim() || !newReview.comment.trim()) {
      alert('Please fill in all fields');
      return;
    }
    
    try {
      const response = await axios.post('/api/reviews', {
        ...newReview,
        productId: id
      });
      setReviews([response.data, ...reviews]);
      setNewReview({ user: '', rating: 5, comment: '' });
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review. Please try again.');
    }
  };

  const handleAddToCart = async () => {
    if (!product.inStock) {
      alert('This product is currently out of stock');
      return;
    }
    
    try {
      await axios.post('/api/cart', {
        productId: id,
        size: selectedSize.size,
        quantity
      });
      alert(`Added ${quantity} x ${product.name} (${selectedSize.size}) to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding to cart. Please try again.');
    }
  };

  const handleWishlist = async () => {
    try {
      if (isWishlisted) {
        await axios.delete(`/api/wishlist/${id}`);
        alert('Removed from wishlist');
      } else {
        await axios.post('/api/wishlist', { productId: id });
        alert('Added to wishlist!');
      }
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error('Wishlist error:', error);
    }
  };

  const shareOnSocial = (platform) => {
    const url = window.location.href;
    const text = `Check out this amazing perfume: ${product.name} - ${product.description}`;
    
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=perfume,fragrance,luxury`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  const renderStars = (rating) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return product?.rating || 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #8B4513',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }} />
        <p style={{ fontSize: '1.2rem', color: '#666' }}>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h2 style={{ fontSize: '2rem', color: '#e74c3c', marginBottom: '1rem' }}>
          Product Not Found
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
          The product you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #8B4513, #A0522D)',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      paddingTop: '100px',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      minHeight: '100vh'
    }}>
      <div className="container" style={{ padding: '2rem 0' }}>
        {/* Breadcrumb */}
        <nav style={{ 
          marginBottom: '2rem',
          fontSize: '14px',
          color: '#666'
        }}>
          <span 
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer', color: '#8B4513' }}
          >
            Home
          </span>
          <span style={{ margin: '0 10px' }}>›</span>
          <span 
            onClick={() => navigate('/#collections')}
            style={{ cursor: 'pointer', color: '#8B4513' }}
          >
            Collections
          </span>
          <span style={{ margin: '0 10px' }}>›</span>
          <span>{product.name}</span>
        </nav>

        {/* Product Main Section */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
          gap: '4rem', 
          marginBottom: '4rem',
          background: 'white',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
        }}>
          {/* Image Gallery */}
          <div>
            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <img 
                src={selectedImage} 
                alt={product.name}
                onClick={() => setImageZoomed(!imageZoomed)}
                style={{ 
                  width: '100%', 
                  height: '500px', 
                  objectFit: 'cover', 
                  borderRadius: '15px', 
                  cursor: 'zoom-in',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                  transition: 'transform 0.3s ease',
                  transform: imageZoomed ? 'scale(1.1)' : 'scale(1)'
                }}
              />
              
              {/* Image Badges */}
              <div style={{ 
                position: 'absolute', 
                top: '20px', 
                left: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                {product.discount > 0 && (
                  <span style={{
                    background: 'linear-gradient(135deg, #ff4757, #ff3742)',
                    color: 'white',
                    padding: '8px 15px',
                    borderRadius: '25px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 15px rgba(255, 71, 87, 0.4)'
                  }}>
                    🔥 {product.discount}% OFF
                  </span>
                )}
                {product.bestseller && (
                  <span style={{
                    background: 'linear-gradient(135deg, #ffa502, #ff6348)',
                    color: 'white',
                    padding: '8px 15px',
                    borderRadius: '25px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    🏆 BESTSELLER
                  </span>
                )}
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div style={{ 
              display: 'flex', 
              gap: '10px', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              {product.images.map((img, index) => (
                <img 
                  key={index}
                  src={img} 
                  alt={`${product.name} ${index + 1}`}
                  onClick={() => setSelectedImage(img)}
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    objectFit: 'cover', 
                    borderRadius: '10px',
                    cursor: 'pointer',
                    border: selectedImage === img ? '3px solid #8B4513' : '2px solid #ddd',
                    transition: 'all 0.3s ease',
                    opacity: selectedImage === img ? 1 : 0.7
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = 1}
                  onMouseLeave={(e) => e.target.style.opacity = selectedImage === img ? 1 : 0.7}
                />
              ))}
            </div>
          </div>
          
          {/* Product Information */}
          <div>
            {/* Brand Badge */}
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ 
                background: 'linear-gradient(135deg, #8B4513, #A0522D)',
                color: 'white', 
                padding: '6px 15px', 
                borderRadius: '25px', 
                fontSize: '14px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {product.brand}
              </span>
            </div>

            {/* Product Title */}
            <h1 style={{ 
              fontSize: 'clamp(2rem, 4vw, 3.5rem)', 
              marginBottom: '1rem', 
              color: '#2c3e50',
              fontWeight: '800',
              lineHeight: '1.2'
            }}>
              {product.name}
            </h1>

            {/* Rating and Reviews */}
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '2rem',
              padding: '15px',
              background: '#f8f9fa',
              borderRadius: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ 
                  color: '#ffa502', 
                  fontSize: '1.5rem',
                  letterSpacing: '2px'
                }}>
                  {renderStars(calculateAverageRating())}
                </span>
                <span style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold',
                  color: '#2c3e50'
                }}>
                  {calculateAverageRating()}
                </span>
              </div>
              <span style={{ 
                fontSize: '1rem', 
                color: '#666'
              }}>
                ({reviews.length + (product.reviewCount || 0)} reviews)
              </span>
            </div>

            {/* Description */}
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#555', 
              marginBottom: '2rem',
              lineHeight: '1.7'
            }}>
              {product.description}
            </p>
            
            {/* Price Section */}
            <div style={{ 
              marginBottom: '2rem',
              padding: '20px',
              background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
              borderRadius: '15px',
              border: '2px solid #8B4513'
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '10px'
              }}>
                <span style={{
                  fontSize: '2.8rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #8B4513, #A0522D)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  ${selectedSize.price || product.price}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span style={{
                      fontSize: '2rem',
                      color: '#999',
                      textDecoration: 'line-through'
                    }}>
                      ${product.originalPrice}
                    </span>
                    <span style={{
                      background: 'linear-gradient(135deg, #ff4757, #ff3742)',
                      color: 'white',
                      padding: '8px 15px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      SAVE ${product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Price includes taxes. Free shipping on orders over $75.
              </p>
            </div>

            {/* Product Tags */}
            <div style={{ 
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              marginBottom: '2rem'
            }}>
              {product.tags.map(tag => (
                <span 
                  key={tag} 
                  style={{
                    background: 'linear-gradient(135deg, #e9ecef, #dee2e6)',
                    color: '#495057',
                    padding: '8px 15px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Size Selection */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '10px', 
                fontWeight: 'bold',
                fontSize: '1.2rem',
                color: '#2c3e50'
              }}>
                Choose Size:
              </label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {product.sizes.map(size => (
                  <button
                    key={size.size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: '12px 20px',
                      border: selectedSize.size === size.size ? '3px solid #8B4513' : '2px solid #ddd',
                      borderRadius: '10px',
                      background: selectedSize.size === size.size ? '#8B4513' : 'white',
                      color: selectedSize.size === size.size ? 'white' : '#333',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {size.size} - ${size.price}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '10px', 
                fontWeight: 'bold',
                fontSize: '1.2rem',
                color: '#2c3e50'
              }}>
                Quantity:
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '2px solid #8B4513',
                    borderRadius: '50%',
                    background: 'white',
                    color: '#8B4513',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}
                >
                  -
                </button>
                <span style={{
                  padding: '10px 20px',
                  border: '2px solid #ddd',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  minWidth: '60px',
                  textAlign: 'center'
                }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '2px solid #8B4513',
                    borderRadius: '50%',
                    background: '#8B4513',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                style={{ 
                  flex: 1,
                  minWidth: '200px',
                  padding: '18px 30px',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  background: product.inStock 
                    ? 'linear-gradient(135deg, #8B4513, #A0522D)' 
                    : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: product.inStock ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                  boxShadow: product.inStock ? '0 8px 25px rgba(139, 69, 19, 0.4)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (product.inStock) {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 12px 35px rgba(139, 69, 19, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (product.inStock) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(139, 69, 19, 0.4)';
                  }
                }}
              >
                {product.inStock ? '🛒 Add to Cart' : '❌ Out of Stock'}
              </button>
              
              <button 
                onClick={handleWishlist}
                style={{ 
                  padding: '18px 25px',
                  fontSize: '1.2rem',
                  background: isWishlisted ? '#ff4757' : 'transparent',
                  color: isWishlisted ? 'white' : '#8B4513',
                  border: '3px solid ' + (isWishlisted ? '#ff4757' : '#8B4513'),
                  borderRadius: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {isWishlisted ? '❤️ Wishlisted' : '🤍 Add to Wishlist'}
              </button>
            </div>

            {/* Stock Status */}
            <div style={{ 
              padding: '15px',
              background: product.inStock ? '#d4edda' : '#f8d7da',
              color: product.inStock ? '#155724' : '#721c24',
              borderRadius: '10px',
              marginBottom: '2rem',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span>{product.inStock ? '✅' : '❌'}</span>
              {product.inStock 
                ? 'In Stock - Ready to ship within 24 hours' 
                : 'Currently out of stock - Notify when available'}
            </div>

            {/* Social Share */}
            <div>
              <h3 style={{ 
                marginBottom: '15px', 
                fontSize: '1.3rem',
                color: '#2c3e50'
              }}>
                Share this perfume:
              </h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {[
                  { name: 'Facebook', icon: '📘', color: '#3b5998', platform: 'facebook' },
                  { name: 'Twitter', icon: '🐦', color: '#1da1f2', platform: 'twitter' },
                  { name: 'WhatsApp', icon: '💬', color: '#25d366', platform: 'whatsapp' },
                  { name: 'Pinterest', icon: '📌', color: '#bd081c', platform: 'pinterest' },
                  { name: 'LinkedIn', icon: '💼', color: '#0077b5', platform: 'linkedin' }
                ].map(social => (
                  <button 
                    key={social.platform}
                    onClick={() => shareOnSocial(social.platform)} 
                    style={{ 
                      padding: '12px 20px', 
                      backgroundColor: social.color, 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '25px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = `0 8px 20px ${social.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <span>{social.icon}</span>
                    <span>{social.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div style={{ 
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
          marginBottom: '4rem',
          overflow: 'hidden'
        }}>
          {/* Tab Navigation */}
          <div style={{ 
            display: 'flex',
            borderBottom: '2px solid #f1f2f6',
            background: '#f8f9fa'
          }}>
            {[
              { id: 'description', label: '📝 Description', icon: '📝' },
              { id: 'notes', label: '🌸 Fragrance Notes', icon: '🌸' },
              { id: 'reviews', label: '⭐ Reviews', icon: '⭐' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '20px',
                  border: 'none',
                  background: activeTab === tab.id ? 'white' : 'transparent',
                  color: activeTab === tab.id ? '#8B4513' : '#666',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab.id ? '3px solid #8B4513' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ padding: '3rem' }}>
            {activeTab === 'description' && (
              <div>
                <h3 style={{ 
                  fontSize: '1.8rem', 
                  marginBottom: '20px', 
                  color: '#8B4513' 
                }}>
                  About This Fragrance
                </h3>
                <p style={{ 
                  fontSize: '16px', 
                  lineHeight: '1.8', 
                  color: '#555',
                  marginBottom: '20px'
                }}>
                  {product.longDescription}
                </p>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '20px',
                  marginTop: '30px'
                }}>
                  <div style={{ 
                    padding: '20px',
                    background: '#f8f9fa',
                    borderRadius: '10px'
                  }}>
                    <h4 style={{ color: '#8B4513', marginBottom: '10px' }}>Category</h4>
                    <p style={{ color: '#666' }}>{product.category}</p>
                  </div>
                  <div style={{ 
                    padding: '20px',
                    background: '#f8f9fa',
                    borderRadius: '10px'
                  }}>
                    <h4 style={{ color: '#8B4513', marginBottom: '10px' }}>Gender</h4>
                    <p style={{ color: '#666' }}>{product.gender}</p>
                  </div>
                  <div style={{ 
                    padding: '20px',
                    background: '#f8f9fa',
                    borderRadius: '10px'
                  }}>
                    <h4 style={{ color: '#8B4513', marginBottom: '10px' }}>Brand</h4>
                    <p style={{ color: '#666' }}>{product.brand}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div>
                <h3 style={{ 
                  fontSize: '1.8rem', 
                  marginBottom: '30px', 
                  color: '#8B4513',
                  textAlign: 'center'
                }}>
                  Fragrance Pyramid
                </h3>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '30px'
                }}>
                  {[
                    { category: 'Top Notes', notes: product.notes.top, color: '#ff6b6b', icon: '🌟' },
                    { category: 'Middle Notes', notes: product.notes.middle, color: '#4ecdc4', icon: '🌸' },
                    { category: 'Base Notes', notes: product.notes.base, color: '#45b7d1', icon: '🌿' }
                  ].map(noteGroup => (
                    <div 
                      key={noteGroup.category}
                      style={{
                        padding: '25px',
                        background: `linear-gradient(135deg, ${noteGroup.color}15, ${noteGroup.color}05)`,
                        borderRadius: '15px',
                        border: `2px solid ${noteGroup.color}30`,
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '10px' }}>
                        {noteGroup.icon}
                      </div>
                      <h4 style={{ 
                        color: noteGroup.color,
                        marginBottom: '15px',
                        fontSize: '1.2rem',
                        fontWeight: '700'
                      }}>
                        {noteGroup.category}
                      </h4>
                      <div style={{ 
                        fontSize: '14px',
                        color: '#555',
                        lineHeight: '1.6'
                      }}>
                        {noteGroup.notes.join(' • ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '30px'
                }}>
                  <h3 style={{ 
                    fontSize: '1.8rem', 
                    color: '#8B4513'
                  }}>
                    Customer Reviews ({reviews.length})
                  </h3>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span style={{ 
                      fontSize: '1.5rem',
                      color: '#ffa502'
                    }}>
                      {renderStars(calculateAverageRating())}
                    </span>
                    <span style={{ 
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      color: '#2c3e50'
                    }}>
                      {calculateAverageRating()} / 5
                    </span>
                  </div>
                </div>
                
                {/* Review Form */}
                <form 
                  onSubmit={handleReviewSubmit} 
                  style={{ 
                    marginBottom: '3rem', 
                    padding: '2.5rem', 
                    background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                    borderRadius: '15px',
                    border: '2px solid #8B4513'
                  }}
                >
                  <h4 style={{ 
                    marginBottom: '20px', 
                    color: '#2c3e50',
                    fontSize: '1.3rem'
                  }}>
                    Write Your Review
                  </h4>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
                    gap: '15px', 
                    marginBottom: '15px' 
                  }}>
                    <input 
                      type="text" 
                      placeholder="Your name"
                      value={newReview.user}
                      onChange={(e) => setNewReview({...newReview, user: e.target.value})}
                      required
                      style={{ 
                        padding: '15px', 
                        borderRadius: '10px', 
                        border: '2px solid #ddd',
                        fontSize: '16px',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#8B4513'}
                      onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                    <select 
                      value={newReview.rating}
                      onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                      style={{ 
                        padding: '15px', 
                        borderRadius: '10px', 
                        border: '2px solid #ddd',
                        fontSize: '16px'
                      }}
                    >
                      {[5,4,3,2,1].map(num => (
                        <option key={num} value={num}>
                          {num} Star{num !== 1 ? 's' : ''} - {renderStars(num)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <textarea 
                    placeholder="Share your experience with this fragrance... What do you love about it?"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    required
                    rows="4"
                    style={{ 
                      width: '100%', 
                      padding: '15px', 
                      borderRadius: '10px', 
                      border: '2px solid #ddd',
                      fontSize: '16px',
                      marginBottom: '20px',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#8B4513'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                  />
                  <button 
                    type="submit" 
                    style={{
                      padding: '15px 30px',
                      background: 'linear-gradient(135deg, #8B4513, #A0522D)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '25px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Submit Review ⭐
                  </button>
                </form>

                {/* Reviews List */}
                <div style={{ display: 'grid', gap: '20px' }}>
                  {reviews.length === 0 ? (
                    <div style={{
                      textAlign: 'center',
                      padding: '3rem',
                      color: '#666'
                    }}>
                      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💭</div>
                      <p>No reviews yet. Be the first to share your experience!</p>
                    </div>
                  ) : (
                    reviews.map(review => (
                      <div 
                        key={review._id} 
                        style={{ 
                          padding: '25px', 
                          background: 'white', 
                          borderRadius: '15px', 
                          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                          border: '1px solid #f1f2f6'
                        }}
                      >
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'flex-start',
                          marginBottom: '15px' 
                        }}>
                          <div>
                            <strong style={{ 
                              fontSize: '1.1rem', 
                              color: '#2c3e50',
                              marginBottom: '5px',
                              display: 'block'
                            }}>
                              {review.user}
                            </strong>
                            <div style={{ 
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px'
                            }}>
                              <span style={{ 
                                fontSize: '1.2rem', 
                                color: '#ffa502'
                              }}>
                                {renderStars(review.rating)}
                              </span>
                              <span style={{ 
                                color: '#666', 
                                fontSize: '14px'
                              }}>
                                {new Date(review.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p style={{ 
                          fontSize: '16px', 
                          lineHeight: '1.6', 
                          color: '#555'
                        }}>
                          {review.comment}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;