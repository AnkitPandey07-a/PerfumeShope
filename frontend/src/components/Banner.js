import React, { useState, useEffect } from 'react';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=1200',
      title: 'Discover Your Signature Scent',
      subtitle: 'Explore our exclusive collection of luxury perfumes from world-renowned brands',
      cta: 'Shop Collection',
      overlay: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8))'
    },
    {
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200',
      title: 'Timeless Elegance',
      subtitle: 'Classic fragrances that define sophistication and grace',
      cta: 'Explore Classics',
      overlay: 'linear-gradient(135deg, rgba(240, 147, 251, 0.8), rgba(245, 87, 108, 0.8))'
    },
    {
      image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=1200',
      title: 'New Arrivals',
      subtitle: 'Fresh scents and innovative fragrances from master perfumers',
      cta: 'View New Collection',
      overlay: 'linear-gradient(135deg, rgba(79, 172, 254, 0.8), rgba(0, 242, 254, 0.8))'
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('collections');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div style={{
      position: 'relative',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center'
    }}>
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `${slide.overlay}, url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
            zIndex: index === currentSlide ? 1 : 0
          }}
        />
      ))}

      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)
        `,
        zIndex: 2,
        animation: 'float 20s ease-in-out infinite'
      }} />

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            background: `radial-gradient(circle, rgba(255,255,255,${Math.random() * 0.3 + 0.1}), transparent)`,
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite ${Math.random() * 5}s`,
            zIndex: 2
          }}
        />
      ))}

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        maxWidth: '900px',
        padding: '0 20px',
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <h1 style={{
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          marginBottom: '2rem',
          fontWeight: '900',
          fontFamily: "'Playfair Display', serif",
          textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
          background: 'linear-gradient(45deg, #ffd89b, #19547b, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'glow 3s ease-in-out infinite alternate',
          lineHeight: '1.1'
        }}>
          {currentSlideData.title}
        </h1>

        <p style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          marginBottom: '3rem',
          opacity: 0.95,
          fontWeight: '400',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          lineHeight: '1.6',
          maxWidth: '700px',
          margin: '0 auto 3rem',
          fontFamily: "'Inter', sans-serif"
        }}>
          {currentSlideData.subtitle}
        </p>

        <div style={{ 
          display: 'flex', 
          gap: '25px', 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          marginBottom: '4rem'
        }}>
          <button 
            onClick={scrollToProducts}
            className="btn btn-primary"
            style={{
              padding: '20px 40px',
              fontSize: '1.3rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px) scale(1.05)';
              e.target.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.6)';
              e.target.style.background = 'linear-gradient(135deg, #764ba2, #667eea)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
              e.target.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            }}
          >
            <i className="fas fa-shopping-bag"></i>
            <span>{currentSlideData.cta}</span>
          </button>

          <button 
            onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
            className="btn btn-glass"
            style={{
              padding: '20px 40px',
              fontSize: '1.3rem',
              fontWeight: '700',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'translateY(-5px) scale(1.05)';
              e.target.style.boxShadow = '0 15px 35px rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <i className="fas fa-info-circle"></i>
            <span>Learn More</span>
          </button>
        </div>

        {/* Slide Indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '2rem'
        }}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                border: '2px solid white',
                background: index === currentSlide ? 'white' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: index === currentSlide ? 'scale(1.3)' : 'scale(1)',
                boxShadow: index === currentSlide ? '0 0 20px rgba(255, 255, 255, 0.5)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (index !== currentSlide) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.5)';
                  e.target.style.transform = 'scale(1.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (index !== currentSlide) {
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'scale(1)';
                }
              }}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          animation: 'bounce 2s infinite'
        }}>
          <span style={{ 
            fontSize: '14px', 
            opacity: 0.8,
            fontWeight: '500'
          }}>
            Scroll to explore
          </span>
          <i className="fas fa-chevron-down" style={{ 
            fontSize: '20px',
            opacity: 0.8
          }}></i>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)}
        style={{
          position: 'absolute',
          left: '30px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          color: 'white',
          fontSize: '20px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          zIndex: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.3)';
          e.target.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.2)';
          e.target.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        <i className="fas fa-chevron-left"></i>
      </button>

      <button
        onClick={() => goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)}
        style={{
          position: 'absolute',
          right: '30px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          color: 'white',
          fontSize: '20px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          zIndex: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.3)';
          e.target.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.2)';
          e.target.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Banner;