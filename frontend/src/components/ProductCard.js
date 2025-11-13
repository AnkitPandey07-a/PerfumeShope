import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductCard = ({ product, index = 0 }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleWishlist = async (e) => {
    e.stopPropagation();
    try {
      if (isWishlisted) {
        await axios.delete(`/api/wishlist/${product._id}`);
      } else {
        await axios.post('/api/wishlist', { productId: product._id });
      }
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error('Wishlist error:', error);
    }
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    // Quick view functionality can be added here
    console.log('Quick view for:', product.name);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('☆');
    }
    while (stars.length < 5) {
      stars.push('☆');
    }
    return stars.join('');
  };

  const cardStyle = {
    cursor: 'pointer',
    padding: '0',
    position: 'relative',
    maxWidth: '380px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: isHovered 
      ? '0 25px 50px rgba(0,0,0,0.25)' 
      : '0 10px 30px rgba(0,0,0,0.1)',
    transform: isHovered ? 'translateY(-15px) scale(1.02)' : 'translateY(0) scale(1)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: calc(200px + 100%) 0; }
        }
        
        .shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200px 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>
      
      <div 
        style={cardStyle}
        onClick={() => navigate(`/product/${product._id}`)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Wishlist Button */}
        <button 
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlist}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: isWishlisted ? 'rgba(255, 71, 87, 0.9)' : 'rgba(255,255,255,0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            cursor: 'pointer',
            fontSize: '20px',
            color: isWishlisted ? 'white' : '#999',
            transition: 'all 0.3s ease',
            zIndex: 10,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
        >
          {isWishlisted ? '❤️' : '🤍'}
        </button>

        {/* Quick View Button */}
        <button 
          onClick={handleQuickView}
          style={{
            position: 'absolute',
            top: '70px',
            right: '15px',
            background: 'rgba(139, 69, 19, 0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            cursor: 'pointer',
            fontSize: '16px',
            color: 'white',
            transition: 'all 0.3s ease',
            zIndex: 10,
            backdropFilter: 'blur(10px)',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateX(0) scale(1)' : 'translateX(20px) scale(0.8)'
          }}
        >
          👁️
        </button>

        {/* Product Image */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {!imageLoaded && (
            <div 
              className="shimmer"
              style={{
                width: '100%',
                height: '320px',
                borderRadius: '20px 20px 0 0'
              }}
            />
          )}
          <img 
            src={product.image} 
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            style={{
              width: '100%',
              height: '320px',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              display: imageLoaded ? 'block' : 'none'
            }}
          />
          
          {/* Badges */}
          <div style={{ 
            position: 'absolute', 
            top: '15px', 
            left: '15px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {product.discount > 0 && (
              <span style={{
                background: 'linear-gradient(135deg, #ff4757, #ff3742)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(255, 71, 87, 0.4)',
                animation: 'pulse 2s infinite'
              }}>
                -{product.discount}% OFF
              </span>
            )}
            {product.bestseller && (
              <span style={{
                background: 'linear-gradient(135deg, #ffa502, #ff6348)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(255, 165, 2, 0.4)'
              }}>
                🏆 BESTSELLER
              </span>
            )}
            {product.featured && (
              <span style={{
                background: 'linear-gradient(135deg, #3742fa, #2f3542)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(55, 66, 250, 0.4)'
              }}>
                ⭐ FEATURED
              </span>
            )}
            {!product.inStock && (
              <span style={{
                background: 'linear-gradient(135deg, #747d8c, #57606f)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                OUT OF STOCK
              </span>
            )}
          </div>

          {/* Overlay on Hover */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(139, 69, 19, 0.8), rgba(160, 82, 45, 0.8))',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              textAlign: 'center',
              transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
              transition: 'transform 0.3s ease'
            }}>
              Click to View Details
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div style={{ padding: '25px' }}>
          {/* Brand */}
          <div style={{ 
            marginBottom: '10px', 
            fontSize: '14px', 
            color: '#8B4513', 
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            {product.brand}
          </div>
          
          {/* Product Name */}
          <h3 style={{ 
            marginBottom: '12px', 
            fontSize: '1.4rem',
            fontWeight: '700',
            color: '#2c3e50',
            lineHeight: '1.3',
            minHeight: '2.6rem'
          }}>
            {product.name}
          </h3>
          
          {/* Description */}
          <p style={{ 
            color: '#666', 
            marginBottom: '15px',
            fontSize: '14px',
            lineHeight: '1.5',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '2.1rem'
          }}>
            {product.description}
          </p>

          {/* Rating */}
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '15px'
          }}>
            <span style={{ 
              color: '#ffa502', 
              fontSize: '16px',
              letterSpacing: '2px'
            }}>
              {renderStars(product.rating)}
            </span>
            <span style={{ 
              fontSize: '14px', 
              color: '#666',
              fontWeight: '500'
            }}>
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Tags */}
          <div style={{ 
            display: 'flex',
            gap: '6px',
            flexWrap: 'wrap',
            marginBottom: '20px'
          }}>
            {product.tags.slice(0, 2).map(tag => (
              <span 
                key={tag} 
                style={{
                  background: 'linear-gradient(135deg, #f1f2f6, #ddd)',
                  color: '#2c3e50',
                  padding: '4px 10px',
                  borderRadius: '15px',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Price */}
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '15px'
          }}>
            <span style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              color: '#8B4513',
              background: 'linear-gradient(135deg, #8B4513, #A0522D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span style={{
                  fontSize: '1.3rem',
                  color: '#999',
                  textDecoration: 'line-through'
                }}>
                  ${product.originalPrice}
                </span>
                <span style={{
                  background: 'linear-gradient(135deg, #ff4757, #ff3742)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  SAVE ${product.originalPrice - product.price}
                </span>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div style={{ 
            fontSize: '13px',
            fontWeight: '600',
            color: product.inStock ? '#27ae60' : '#e74c3c',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <span>{product.inStock ? '✅' : '❌'}</span>
            {product.inStock ? 'In Stock - Ready to Ship' : 'Currently Out of Stock'}
          </div>

          {/* Add to Cart Button (appears on hover) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Add to cart functionality
              console.log('Added to cart:', product.name);
            }}
            style={{
              width: '100%',
              padding: '12px',
              marginTop: '15px',
              background: 'linear-gradient(135deg, #8B4513, #A0522D)',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
              boxShadow: '0 4px 15px rgba(139, 69, 19, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #A0522D, #CD853F)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #8B4513, #A0522D)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;