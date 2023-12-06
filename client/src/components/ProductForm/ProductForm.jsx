import './productform.css'

import React, { useState } from 'react'
import axios from 'axios';

const ProductForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const id = Date.now()
          const response = await axios.post(`${process.env.REACT_APP_API_URI}/products`, {
            id,
            name,
            imageUrl,
            price,
            category,
          });
            console.log(response.data);
            setName('');
            setImageUrl('');
            setPrice('');
            setCategory('');
      } catch(error) {
            console.error("Error Creating Product: ", error)
      }
    };
    return (
        <div className='ProductForm'>
            <form className='Form' onSubmit={handleSubmit}>
                <label>
                    <p>Name: </p>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    <p>Image URL: </p>
                    <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </label>
            <   label>
                    <p>Price: </p>
                    <input placeholder='$' type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </label>
                <label>
                    <p>Category: </p>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                </label>
                <button type="submit">Add Product</button>
            </form>
        </div>
    )
}

export default ProductForm