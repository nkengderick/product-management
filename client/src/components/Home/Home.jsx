import './home.css'

import React, { useState, useEffect } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import axios from 'axios'
import {Link} from 'react-router-dom'

import ProductCard from '../ProductCard/ProductCard'

const Home = () => {
    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false)
    const [productToUpdate, setProductToUpdate] = useState(null)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/products`)
          .then((response) => {setProducts(response.data.products)})
          .catch((error) => {console.error('Error fetching products:', error)});
      }, []);
      
    const filteredProducts = searchTerm !== ''
        ? products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase()))
        : []

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
        <div className='Home'>
            <SearchBar setProducts={setProducts} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <p className={searchTerm==='' ? 'nodisplay' : 'display'}>Search results for {searchTerm}</p>
            <main className='product-cards'>
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onDelete={handleDeleteProduct} onUpdate={() => handleUpdateProduct(product)} productToUpdate={productToUpdate} showForm={showForm} onClose={() => closeForm()} />          
                    ))}
            </main>
           {/* Hero Section */}
      <div className='hero-section card-container'>
        <div className="hero-section card">
          <h1>Welcome to My Product Manager</h1>
          <p>Your personalized tool to manage and track your products efficiently.</p>
        </div>
      </div>

      {/* Call-to-action */}
      <div className="cta-section card-container">
        <div className="cta-section card">
          <p>Ready to get started?</p>
          <Link to="/products" className="cta-button card-button">Manage Products</Link>
        </div>
      </div>  

      {/* Featured Products or Services */}
      <div className="featured-items card-container">
        {/* Product Management Made Easy */}
        <div className="featured-item card">
          <h3>Product Management Made Easy</h3>
          <p>Effortlessly add, update, and organize your products with our user-friendly interface.</p>
          <Link to="/products" className="cta-button card-button">Get Started</Link>
        </div>

        {/* Track Inventory */}
        <div className="featured-item card">
          <h3>Track Inventory</h3>
          <p>Keep a real-time check on your inventory levels and receive alerts when it's time to restock.</p>
          <Link to="/inventories" className="cta-button card-button">Explore Features</Link>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="featured-categories card-container">
        {/* Category Organization */}
        <div className="featured-category card">
          <h3>Category Organization</h3>
          <p>Organize your products into categories for better management and quick access.</p>
          <Link to="/categories" className="cta-button card-button">Explore Categories</Link>
        </div>

        {/* Reports and Insights */}
        <div className="featured-category card">
          <h3>Reports and Insights</h3>
          <p>Generate reports and gain valuable insights into your product performance and trends.</p>
          <Link to="/report" className="cta-button card-button">View Reports</Link>
        </div>
      </div>

      {/* Personal Insights */}
      <div className="insight-section card-container">
        {/* Stay Organized */}
        <div className="insight card">
          <h2>Stay Organized</h2>
          <p>Efficiently organize and manage your products to save time and reduce stress.</p>
        </div>

        {/* Track Everything */}
        <div className="insight card">
          <h2>Track Everything</h2>
          <p>Track product details, sales, and inventory levels in one central place.</p>
        </div>
      </div>
        </div>
    )
}

export default Home

