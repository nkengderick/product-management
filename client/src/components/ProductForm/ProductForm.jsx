import './productform.css'

import React, { useEffect, useState } from 'react'
import axios from 'axios';

const ProductForm = ({ product, onClose }) => {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
  
    useEffect(() => {
        if (product) {
            setName(product.name)
            setCategory(product.category)
            setImageUrl(product.imageUrl)
            setPrice(product.price)
            setQuantity(product.quantity)
        }
    }, [product])

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if(product){
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/product/id${product.id}`, {
                name, 
                imageUrl, 
                price, 
                category,
                quantity
            })
            const { message } = response.data
            alert(message)
            onClose()
        }else {
            const id = Date.now()
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/products`, {
                id,
                name,
                imageUrl,
                price,
                category,
                quantity,
              });
                console.log(response.data);
                setName('');
                setImageUrl('');
                setPrice('');
                setCategory('');
                setQuantity('');
        }
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
            <   label>
                    <p>Quantity: </p>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </label>
                <button type="submit">Add Product</button>
            </form>
        </div>
    )
}

export default ProductForm