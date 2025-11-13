import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const FeaturedSection = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
    fetchBestsellers();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get('/api/products/featured');
      setFeaturedProducts(response.data);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    }
  };

  const fetchBestsellers = async () => {
    try {
      const response = await axios.get('/api/products/bestsellers');
      setBestsellers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bestsellers:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        padding: '6rem 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div id="about" style={{ 
      padding: '6rem 0', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1), transparent)',
        borderRadius: '50%',
        animation: 'float 15s ease-in-out infinite'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(240, 147, 251, 0.1), transparent)',
        borderRadius: '50%',
        animation: 'float 20s ease-in-out infinite reverse'
      }} />

      <div className="container">
        {/* Featured Products */}
        <section style={{ marginBottom: '8rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '800',
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem',
              position: 'relative'
            }}>
              <i className="fas fa-star" style={{ 
                color: '#ffd700', 
                marginRight: '15px',
                filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))'
              }}></i>
              Featured Collection
            </h2>
            <p style={{
              fontSize: '1.3rem',
              color: '#6c757d',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
              fontWeight: '400'
            }}>
              Handpicked fragrances that represent the pinnacle of perfumery artistry
            </p>
          </div>
          
          <div className="carousel-container">
            <div className="carousel" style={{
              display: 'flex',
              overflowX: 'auto',
              gap: '30px',
              padding: '20px 0 40px',
              scrollSnapType: 'x mandatory'
            }}>
              {featuredProducts.map((product, index) => (
                <div 
                  key={product._id} 
                  style={{ 
                    minWidth: '350px',
                    scrollSnapAlign: 'start',
                    animation: `slideInLeft 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <ProductCard product={product} index={index} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bestsellers */}
        <section style={{ marginBottom: '8rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '800',
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #f093fb, #f5576c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem'
            }}>
              <i className="fas fa-trophy" style={{ 
                color: '#ffa502', 
                marginRight: '15px',
                filter: 'drop-shadow(0 0 10px rgba(255, 165, 2, 0.5))'
              }}></i>
              Customer Favorites
            </h2>
            <p style={{
              fontSize: '1.3rem',
              color: '#6c757d',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
              fontWeight: '400'
            }}>
              The most loved fragrances chosen by our discerning customers
            </p>
          </div>
          
          <div className="carousel-container">
            <div className="carousel" style={{
              display: 'flex',
              overflowX: 'auto',
              gap: '30px',
              padding: '20px 0 40px',
              scrollSnapType: 'x mandatory'
            }}>
              {bestsellers.map((product, index) => (
                <div 
                  key={product._id} 
                  style={{ 
                    minWidth: '350px',
                    scrollSnapAlign: 'start',
                    animation: `slideInRight 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <ProductCard product={product} index={index} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '800',
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem'
            }}>
              Why Choose Perfume Boutique
            </h2>
            <p style={{
              fontSize: '1.3rem',
              color: '#6c757d',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6',
              fontWeight: '400'
            }}>
              Experience luxury shopping with unmatched service and quality
            </p>
          </div>
          
          <div className="features-grid">
            {[
              {
                icon: 'fas fa-shipping-fast',
                title: 'Free Express Shipping',
                description: 'Complimentary express delivery on orders over $75. Fast, secure, and trackable worldwide shipping.',
                color: '#4facfe'
              },
              {
                icon: 'fas fa-gift',
                title: 'Luxury Gift Wrapping',
                description: 'Elegant gift presentation with premium wrapping and personalized notes for special occasions.',
                color: '#f093fb'
              },
              {
                icon: 'fas fa-undo-alt',
                title: 'Easy Returns',
                description: '30-day hassle-free return policy. Not completely satisfied? Return it with no questions asked.',
                color: '#667eea'
              },
              {
                icon: 'fas fa-shield-alt',
                title: 'Authenticity Guarantee',
                description: '100% authentic products sourced directly from authorized distributors and brand partners.',
                color: '#28a745'
              },
              {
                icon: 'fas fa-user-tie',
                title: 'Personal Consultation',
                description: 'Expert fragrance consultants available to help you find your perfect signature scent.',
                color: '#ffa502'
              },
              {
                icon: 'fas fa-award',
                title: 'Premium Quality',
                description: 'Curated selection of the finest fragrances from prestigious luxury brands worldwide.',
                color: '#e74c3c'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="feature-card"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '25px',
                  color: feature.color,
                  filter: `drop-shadow(0 0 20px ${feature.color}40)`
                }}>
                  <i className={feature.icon}></i>
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  marginBottom: '15px',
                  color: '#2c3e50',
                  fontFamily: "'Playfair Display', serif"
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#6c757d',
                  lineHeight: '1.6',
                  fontSize: '15px',
                  fontWeight: '400'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section style={{
          marginTop: '8rem',
          padding: '4rem 3rem',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '25px',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: "'Playfair Display', serif"
          }}>
            Stay in the Scent
          </h3>
          <p style={{
            fontSize: '1.2rem',
            color: '#6c757d',
            marginBottom: '2rem',
            maxWidth: '500px',
            margin: '0 auto 2rem'
          }}>
            Subscribe to our newsletter for exclusive offers, new arrivals, and fragrance tips
          </p>
          <div style={{
            display: 'flex',
            gap: '15px',
            maxWidth: '400px',
            margin: '0 auto',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <input
              type="email"
              placeholder="Enter your email address"
              style={{
                flex: 1,
                minWidth: '250px',
                padding: '15px 20px',
                border: '2px solid rgba(102, 126, 234, 0.2)',
                borderRadius: '25px',
                fontSize: '16px',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button
              className="btn btn-primary"
              style={{
                padding: '15px 30px',
                fontSize: '16px',
                fontWeight: '600',
                whiteSpace: 'nowrap'
              }}
              onClick={() => alert('Newsletter signup - Coming Soon!')}
            >
              <i className="fas fa-paper-plane" style={{ marginRight: '8px' }}></i>
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FeaturedSection;