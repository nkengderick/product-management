import './home.css'

import React, { useState, useEffect } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import axios from 'axios'

const Home = () => {
    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/products`)
          .then((response) => {setProducts(response.data.products)})
          .catch((error) => {console.error('Error fetching products:', error)});
      }, []);
      
      const filteredProducts = searchTerm !== ''
        ? products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase()))
        : []

    return (
        <div className='Home'>
            <SearchBar setProducts={setProducts} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <p className={searchTerm==='' ? 'nodisplay' : 'display'}>Search results for {searchTerm}</p>
            <main className='product-cards'>
                {filteredProducts.map((product) => (
                    <li className='product-card' key={product.id}>
                        <img src={product.imageUrl} alt={product.name} />
                        <div>
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <p>Category: {product.category}</p>
                        </div>
                    </li>                    
                ))}
            </main>
        </div>
    )
}

export default Home