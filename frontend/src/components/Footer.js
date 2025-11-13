import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ 
                background: 'linear-gradient(45deg, #ffd89b, #19547b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '2.5rem'
              }}>
                ✨
              </span>
              Perfume Boutique
            </h3>
            <p style={{ 
              lineHeight: '1.7',
              marginBottom: '25px',
              fontSize: '16px',
              color: '#bdc3c7'
            }}>
              Discover your signature scent with our curated collection of luxury perfumes from the world's finest brands. Experience the art of fragrance like never before.
            </p>
            <div className="social-icons">
              <a 
                href="https://facebook.com" 
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'linear-gradient(135deg, #3b5998, #8b9dc3)'
                }}
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="https://instagram.com" 
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'linear-gradient(135deg, #e4405f, #f093fb)'
                }}
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="https://twitter.com" 
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'linear-gradient(135deg, #1da1f2, #0d8bd9)'
                }}
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href="https://pinterest.com" 
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'linear-gradient(135deg, #bd081c, #e60023)'
                }}
              >
                <i className="fab fa-pinterest"></i>
              </a>
              <a 
                href="https://youtube.com" 
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'linear-gradient(135deg, #ff0000, #cc0000)'
                }}
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>
              <i className="fas fa-link" style={{ marginRight: '10px', color: '#667eea' }}></i>
              Quick Links
            </h3>
            <ul>
              <li>
                <a href="/">
                  <i className="fas fa-home" style={{ marginRight: '8px' }}></i>
                  Home
                </a>
              </li>
              <li>
                <a href="#collections">
                  <i className="fas fa-shopping-bag" style={{ marginRight: '8px' }}></i>
                  Products
                </a>
              </li>
              <li>
                <a href="#about">
                  <i className="fas fa-info-circle" style={{ marginRight: '8px' }}></i>
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact">
                  <i className="fas fa-phone" style={{ marginRight: '8px' }}></i>
                  Contact
                </a>
              </li>
              <li>
                <a href="#blog">
                  <i className="fas fa-blog" style={{ marginRight: '8px' }}></i>
                  Blog
                </a>
              </li>
              <li>
                <a href="#reviews">
                  <i className="fas fa-star" style={{ marginRight: '8px' }}></i>
                  Reviews
                </a>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>
              <i className="fas fa-tags" style={{ marginRight: '10px', color: '#f093fb' }}></i>
              Categories
            </h3>
            <ul>
              <li>
                <a href="#mens">
                  <i className="fas fa-male" style={{ marginRight: '8px' }}></i>
                  Men's Fragrances
                </a>
              </li>
              <li>
                <a href="#womens">
                  <i className="fas fa-female" style={{ marginRight: '8px' }}></i>
                  Women's Fragrances
                </a>
              </li>
              <li>
                <a href="#unisex">
                  <i className="fas fa-users" style={{ marginRight: '8px' }}></i>
                  Unisex Perfumes
                </a>
              </li>
              <li>
                <a href="#luxury">
                  <i className="fas fa-crown" style={{ marginRight: '8px' }}></i>
                  Luxury Collection
                </a>
              </li>
              <li>
                <a href="#new">
                  <i className="fas fa-sparkles" style={{ marginRight: '8px' }}></i>
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#bestsellers">
                  <i className="fas fa-trophy" style={{ marginRight: '8px' }}></i>
                  Bestsellers
                </a>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>
              <i className="fas fa-headset" style={{ marginRight: '10px', color: '#4facfe' }}></i>
              Customer Service
            </h3>
            <ul>
              <li>
                <a href="#shipping">
                  <i className="fas fa-shipping-fast" style={{ marginRight: '8px' }}></i>
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#returns">
                  <i className="fas fa-undo-alt" style={{ marginRight: '8px' }}></i>
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#size-guide">
                  <i className="fas fa-ruler" style={{ marginRight: '8px' }}></i>
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#faq">
                  <i className="fas fa-question-circle" style={{ marginRight: '8px' }}></i>
                  FAQ
                </a>
              </li>
              <li>
                <a href="#track">
                  <i className="fas fa-search-location" style={{ marginRight: '8px' }}></i>
                  Track Your Order
                </a>
              </li>
              <li>
                <a href="#support">
                  <i className="fas fa-life-ring" style={{ marginRight: '8px' }}></i>
                  Support Center
                </a>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>
              <i className="fas fa-map-marker-alt" style={{ marginRight: '10px', color: '#28a745' }}></i>
              Contact Info
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <i className="fas fa-envelope" style={{ 
                  color: '#667eea', 
                  fontSize: '18px',
                  width: '20px'
                }}></i>
                <a 
                  href="mailto:info@perfumeboutique.com"
                  style={{ 
                    color: '#bdc3c7', 
                    textDecoration: 'none',
                    fontSize: '15px'
                  }}
                >
                  info@perfumeboutique.com
                </a>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <i className="fas fa-phone" style={{ 
                  color: '#f093fb', 
                  fontSize: '18px',
                  width: '20px'
                }}></i>
                <a 
                  href="tel:+15551234567"
                  style={{ 
                    color: '#bdc3c7', 
                    textDecoration: 'none',
                    fontSize: '15px'
                  }}
                >
                  +1 (555) 123-4567
                </a>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <i className="fas fa-map-marker-alt" style={{ 
                  color: '#4facfe', 
                  fontSize: '18px',
                  width: '20px',
                  marginTop: '2px'
                }}></i>
                <span style={{ 
                  color: '#bdc3c7',
                  fontSize: '15px',
                  lineHeight: '1.5'
                }}>
                  123 Fragrance Avenue<br />
                  Scent City, SC 12345<br />
                  United States
                </span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <i className="fas fa-clock" style={{ 
                  color: '#ffa502', 
                  fontSize: '18px',
                  width: '20px'
                }}></i>
                <span style={{ 
                  color: '#bdc3c7',
                  fontSize: '15px'
                }}>
                  Mon-Fri: 9AM-6PM EST<br />
                  Sat-Sun: 10AM-4PM EST
                </span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div style={{ 
              marginTop: '25px',
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              backdropFilter: 'blur(10px)'
            }}>
              <h4 style={{ 
                color: '#ecf0f1', 
                marginBottom: '15px',
                fontSize: '16px',
                fontWeight: '600'
              }}>
                <i className="fas fa-bell" style={{ marginRight: '8px' }}></i>
                Stay Updated
              </h4>
              <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                <input
                  type="email"
                  placeholder="Your email address"
                  style={{
                    padding: '12px 15px',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '25px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '14px',
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <button
                  onClick={() => alert('Newsletter signup - Coming Soon!')}
                  style={{
                    padding: '12px 20px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <i className="fas fa-paper-plane" style={{ marginRight: '8px' }}></i>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div style={{ 
          borderTop: '2px solid rgba(255, 255, 255, 0.1)', 
          paddingTop: '30px', 
          marginTop: '50px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ color: '#bdc3c7', fontSize: '15px' }}>
            <p>
              &copy; {currentYear} Perfume Boutique. All rights reserved. 
              <span style={{ margin: '0 10px' }}>|</span>
              <a href="#privacy" style={{ color: '#667eea', textDecoration: 'none' }}>
                Privacy Policy
              </a>
              <span style={{ margin: '0 10px' }}>|</span>
              <a href="#terms" style={{ color: '#667eea', textDecoration: 'none' }}>
                Terms of Service
              </a>
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ color: '#bdc3c7', fontSize: '14px' }}>
              Secure Payment:
            </span>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['fab fa-cc-visa', 'fab fa-cc-mastercard', 'fab fa-cc-paypal', 'fab fa-cc-apple-pay'].map((icon, index) => (
                <div
                  key={index}
                  style={{
                    width: '40px',
                    height: '25px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <i className={icon} style={{ color: '#bdc3c7', fontSize: '16px' }}></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;