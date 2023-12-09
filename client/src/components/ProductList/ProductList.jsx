import './productlist.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ProductCard from '../ProductCard/ProductCard';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const ProductList = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [products, setProducts] = useState([]);
  const { category } = useParams()
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [showForm, setShowForm] = useState(false)
  const [productToUpdate, setProductToUpdate] = useState(null)

  useEffect(() => {
    if (category) setSelectedCategory(category);
  }, [category]);

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

  const handleDeleteProduct = async (id) => {
    if(window.confirm('Do you really want to delete this product?')) {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/product/id${id}`)
        const { message } = response.data
        alert(message)
        setProducts(products.filter(product => product.id !== id))
    }else{
        alert('Deletion Canceled')
    }
}

const handleUpdateProduct = async (product) => {
    setProductToUpdate(product);
    setShowForm(true);
  };
  

const closeForm = async () => {
    setProductToUpdate(null)
    setShowForm(false)
}



  return (
    <div className='ProductList'>
      <h2>Product List</h2>
      <div className='dropdown'>
        <label className='input-label'>Category:</label>
        <select className='menu' value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
          {categories.sort((a, b) => {
            if (a < b) return -1
            if (a > b) return 1
            return 0
          }).map(category => (
            <option className='options' key={category} value={category}>
              <p className="option">{category}</p>
            </option>
          ))}
        </select>

        <label className='input-label'>Price Range:</label>
        <select className='menu' value={selectedPriceRange} onChange={(e) => handlePriceRangeChange(e.target.value)}>
          {priceRanges.map(range => (
            <option className='options' key={range} value={range}>
              <p className='option'>{range}</p>
            </option>
          ))}
        </select>
      </div>

      <ul className='product-cards'>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onDelete={handleDeleteProduct} onUpdate={() => handleUpdateProduct(product)} productToUpdate={productToUpdate} showForm={showForm} onClose={() => closeForm()} />          
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
