import React, { useState } from 'react';

const SearchFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    gender: '',
    minPrice: '',
    maxPrice: '',
    sort: ''
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="search-filter-bar">
      <div className="filter-group">
        <div className="filter-item">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search perfumes..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>
        
        <div className="filter-item">
          <label>Category</label>
          <select value={filters.category} onChange={(e) => handleFilterChange('category', e.target.value)}>
            <option value="">All Categories</option>
            <option value="Floral">Floral</option>
            <option value="Fresh">Fresh</option>
            <option value="Oriental">Oriental</option>
            <option value="Gourmand">Gourmand</option>
            <option value="Fruity">Fruity</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Gender</label>
          <select value={filters.gender} onChange={(e) => handleFilterChange('gender', e.target.value)}>
            <option value="">All</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Min Price</label>
          <input
            type="number"
            placeholder="$0"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
          />
        </div>

        <div className="filter-item">
          <label>Max Price</label>
          <input
            type="number"
            placeholder="$500"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
          />
        </div>

        <div className="filter-item">
          <label>Sort By</label>
          <select value={filters.sort} onChange={(e) => handleFilterChange('sort', e.target.value)}>
            <option value="">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;