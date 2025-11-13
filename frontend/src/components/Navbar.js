import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(5);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navStyle = {
    background: isScrolled 
      ? 'rgba(255, 255, 255, 0.95)' 
      : 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    padding: isScrolled ? '1rem 0' : '1.5rem 0',
    boxShadow: isScrolled 
      ? '0 8px 32px rgba(0,0,0,0.1)' 
      : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderTop: 'none'
  };

  const linkStyle = {
    color: isScrolled ? '#2c3e50' : 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    padding: '10px 18px',
    borderRadius: '25px',
    transition: 'all 0.3s ease',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'transparent'
  };

  const activeLinkStyle = {
    ...linkStyle,
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
  };

  return (
    <nav style={navStyle}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <Link to="/" style={{
          fontSize: isScrolled ? '1.8rem' : '2.2rem',
          fontWeight: '800',
          color: isScrolled ? '#2c3e50' : 'white',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          transition: 'all 0.3s ease',
          fontFamily: "'Dancing Script', cursive"
        }}>
          <span style={{ 
            background: 'linear-gradient(45deg, #ffd89b, #19547b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.5))',
            fontSize: '2.5rem'
          }}>
            ✨
          </span>
          Perfume Boutique
        </Link>
        
        {/* Desktop Navigation */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{ 
            display: window.innerWidth > 768 ? 'flex' : 'none',
            gap: '0.5rem',
            alignItems: 'center'
          }}>
            <Link 
              to="/" 
              style={linkStyle}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              onMouseEnter={(e) => {
                if (!isScrolled) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                } else {
                  e.target.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                  e.target.style.color = 'white';
                }
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = isScrolled ? '#2c3e50' : 'white';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <i className="fas fa-home"></i> Home
            </Link>
            
            <button 
              onClick={() => scrollToSection('collections')}
              style={linkStyle}
              onMouseEnter={(e) => {
                if (!isScrolled) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                } else {
                  e.target.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                  e.target.style.color = 'white';
                }
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = isScrolled ? '#2c3e50' : 'white';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <i className="fas fa-shopping-bag"></i> Collections
            </button>
            
            <button 
              onClick={() => scrollToSection('about')}
              style={linkStyle}
              onMouseEnter={(e) => {
                if (!isScrolled) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                } else {
                  e.target.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                  e.target.style.color = 'white';
                }
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = isScrolled ? '#2c3e50' : 'white';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <i className="fas fa-info-circle"></i> About
            </button>
            
            <button 
              onClick={() => scrollToSection('contact')}
              style={linkStyle}
              onMouseEnter={(e) => {
                if (!isScrolled) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                } else {
                  e.target.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                  e.target.style.color = 'white';
                }
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = isScrolled ? '#2c3e50' : 'white';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <i className="fas fa-phone"></i> Contact
            </button>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button 
              onClick={() => alert('Cart functionality - Coming Soon!')}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: isScrolled ? '#2c3e50' : 'white',
                padding: '12px 18px',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #4facfe, #00f2fe)';
                e.target.style.color = 'white';
                e.target.style.transform = 'translateY(-3px) scale(1.05)';
                e.target.style.boxShadow = '0 8px 25px rgba(79, 172, 254, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                e.target.style.color = isScrolled ? '#2c3e50' : 'white';
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <i className="fas fa-shopping-cart"></i>
              <span>Cart</span>
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '700',
                  animation: 'pulse 2s infinite'
                }}>
                  {cartCount}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => alert('Wishlist functionality - Coming Soon!')}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: isScrolled ? '#2c3e50' : 'white',
                padding: '12px 18px',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #f093fb, #f5576c)';
                e.target.style.color = 'white';
                e.target.style.transform = 'translateY(-3px) scale(1.05)';
                e.target.style.boxShadow = '0 8px 25px rgba(240, 147, 251, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                e.target.style.color = isScrolled ? '#2c3e50' : 'white';
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <i className="fas fa-heart"></i>
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '700',
                  animation: 'bounce 2s infinite'
                }}>
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: isScrolled ? '#2c3e50' : 'white',
                padding: '12px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.2rem',
                display: window.innerWidth > 768 ? 'none' : 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                width: '50px',
                height: '50px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                e.target.style.color = 'white';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                e.target.style.color = isScrolled ? '#2c3e50' : 'white';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            padding: '30px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderTop: 'none',
            display: window.innerWidth > 768 ? 'none' : 'block',
            animation: 'slideInLeft 0.3s ease-out'
          }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '20px' 
            }}>
              <Link 
                to="/" 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
                style={{
                  ...linkStyle,
                  color: '#2c3e50',
                  padding: '15px 20px',
                  borderRadius: '15px',
                  background: 'rgba(102, 126, 234, 0.1)',
                  fontSize: '1.1rem'
                }}
              >
                <i className="fas fa-home"></i> Home
              </Link>
              
              <button 
                onClick={() => scrollToSection('collections')}
                style={{
                  ...linkStyle,
                  color: '#2c3e50',
                  padding: '15px 20px',
                  borderRadius: '15px',
                  background: 'rgba(102, 126, 234, 0.1)',
                  fontSize: '1.1rem',
                  border: 'none',
                  width: '100%',
                  justifyContent: 'flex-start'
                }}
              >
                <i className="fas fa-shopping-bag"></i> Collections
              </button>
              
              <button 
                onClick={() => scrollToSection('about')}
                style={{
                  ...linkStyle,
                  color: '#2c3e50',
                  padding: '15px 20px',
                  borderRadius: '15px',
                  background: 'rgba(102, 126, 234, 0.1)',
                  fontSize: '1.1rem',
                  border: 'none',
                  width: '100%',
                  justifyContent: 'flex-start'
                }}
              >
                <i className="fas fa-info-circle"></i> About
              </button>
              
              <button 
                onClick={() => scrollToSection('contact')}
                style={{
                  ...linkStyle,
                  color: '#2c3e50',
                  padding: '15px 20px',
                  borderRadius: '15px',
                  background: 'rgba(102, 126, 234, 0.1)',
                  fontSize: '1.1rem',
                  border: 'none',
                  width: '100%',
                  justifyContent: 'flex-start'
                }}
              >
                <i className="fas fa-phone"></i> Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;