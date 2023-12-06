import './productlist.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');

  useEffect(() => {
    axios.get(`${apiUrl}/products`)
      .then((response) => setProducts(response.data.products))
      .catch(error => console.error('Error fetching products:', error));
  }, [apiUrl]);

  const categories = ['All', ...new Set(products.map(product => product.category))];
  const priceRanges = [
    'All',
    '1-100',
    '101-200',
    '201-300',
    '301-400',
    '401-500',
    '501-600',
    '601-700',
    '701-800',
    '801-900',
    '901-1000'
  ];

  const filteredProducts = products
    .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
    .filter(product => {
      if (selectedPriceRange === 'All') {
        return true;
      }
      const [min, max] = selectedPriceRange.split('-').map(Number);
      return product.price >= min && product.price <= max;
    });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceRangeChange = (priceRange) => {
    setSelectedPriceRange(priceRange);
  };

  return (
    <div className='ProductList'>
      <h2>Product List</h2>

      <label className='input-label'>Category:</label>
      <select className='menu' value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
        {categories.map(category => (
          <option className='options' key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <label className='input-label'>Price Range:</label>
      <select className='menu' value={selectedPriceRange} onChange={(e) => handlePriceRangeChange(e.target.value)}>
        {priceRanges.map(range => (
          <option className='options' key={range} value={range}>
            {range}
          </option>
        ))}
      </select>

      <ul className='product-cards'>
        {filteredProducts.map(product => (
          <li className='product-card' key={product.id}>
            <img className='product-card-image' src={product.imageUrl} alt={product.name} />
            <div className='product-card-details'>
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
