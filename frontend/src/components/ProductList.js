import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import SearchFilter from './SearchFilter';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await axios.get(`/api/products?${queryParams}`);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const LoadingSpinner = () => (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem',
      minHeight: '400px'
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
      <p style={{
        fontSize: '1.2rem',
        color: '#666',
        fontWeight: '500'
      }}>
        Loading our exquisite perfume collection...
      </p>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  const EmptyState = () => (
    <div style={{
      textAlign: 'center',
      padding: '4rem 2rem',
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      margin: '2rem 0'
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
      <h3 style={{ 
        fontSize: '1.5rem', 
        color: '#2c3e50',
        marginBottom: '1rem'
      }}>
        No perfumes found
      </h3>
      <p style={{ 
        fontSize: '1.1rem', 
        color: '#666',
        marginBottom: '2rem'
      }}>
        We couldn't find any perfumes matching your criteria. Try adjusting your filters or search terms.
      </p>
      <button
        onClick={() => setFilters({})}
        style={{
          padding: '12px 24px',
          background: 'linear-gradient(135deg, #8B4513, #A0522D)',
          color: 'white',
          border: 'none',
          borderRadius: '25px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        Clear All Filters
      </button>
    </div>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div id="collections" style={{ 
      padding: '6rem 0 4rem',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      minHeight: '100vh'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #8B4513, #A0522D, #CD853F)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
            textShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            Our Exquisite Collection
          </h2>
          <p style={{
            fontSize: '1.3rem',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Discover the perfect fragrance that tells your unique story. From timeless classics to modern masterpieces.
          </p>
        </div>
        
        {/* Search and Filter */}
        <SearchFilter onFilterChange={handleFilterChange} />
        
        {/* Results Header */}
        {products.length > 0 && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '3rem',
            padding: '20px',
            background: 'white',
            borderRadius: '15px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span style={{
                fontSize: '1.1rem',
                color: '#2c3e50',
                fontWeight: '600'
              }}>
                {products.length} perfume{products.length !== 1 ? 's' : ''} found
              </span>
              
              {/* View Mode Toggle */}
              <div style={{ display: 'flex', gap: '5px' }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '8px 12px',
                    background: viewMode === 'grid' ? '#8B4513' : 'transparent',
                    color: viewMode === 'grid' ? 'white' : '#8B4513',
                    border: '2px solid #8B4513',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  ⊞ Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '8px 12px',
                    background: viewMode === 'list' ? '#8B4513' : 'transparent',
                    color: viewMode === 'list' ? 'white' : '#8B4513',
                    border: '2px solid #8B4513',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  ☰ List
                </button>
              </div>
            </div>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '10px 15px',
                border: '2px solid #e1e8ed',
                borderRadius: '10px',
                fontSize: '14px',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="default">Sort by Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        )}
        
        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: viewMode === 'grid' 
              ? 'repeat(auto-fill, minmax(350px, 1fr))' 
              : '1fr',
            gap: viewMode === 'grid' ? '30px' : '20px',
            marginBottom: '4rem'
          }}>
            {products.map((product, index) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                index={index}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {products.length > 0 && products.length >= 12 && (
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button
              style={{
                padding: '15px 40px',
                background: 'linear-gradient(135deg, #8B4513, #A0522D)',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(139, 69, 19, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 35px rgba(139, 69, 19, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(139, 69, 19, 0.3)';
              }}
            >
              Load More Perfumes ✨
            </button>
          </div>
        )}

        {/* Collection Stats */}
        {products.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '4rem',
            padding: '3rem 0'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'white',
              borderRadius: '15px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🌟</div>
              <h3 style={{ color: '#8B4513', marginBottom: '5px' }}>Premium Quality</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>Authentic fragrances from top brands</p>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'white',
              borderRadius: '15px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🚚</div>
              <h3 style={{ color: '#8B4513', marginBottom: '5px' }}>Free Shipping</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>On orders over $75 worldwide</p>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'white',
              borderRadius: '15px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>💝</div>
              <h3 style={{ color: '#8B4513', marginBottom: '5px' }}>Gift Wrapping</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>Beautiful packaging for special occasions</p>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'white',
              borderRadius: '15px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🔄</div>
              <h3 style={{ color: '#8B4513', marginBottom: '5px' }}>Easy Returns</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>30-day hassle-free return policy</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;