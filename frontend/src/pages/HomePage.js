import React from 'react';
import Banner from '../components/Banner';
import FeaturedSection from '../components/FeaturedSection';
import ProductList from '../components/ProductList';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <Banner />
      <FeaturedSection />
      <ProductList />
      <Footer />
    </div>
  );
};

export default HomePage;