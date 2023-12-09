import './productcard.css'

import React from "react";
import ProductForm from '../ProductForm/ProductForm';

const ProductCard = ({ product, onDelete, onUpdate, showForm, productToUpdate, onClose }) => {
  
    return (
      <li className='product-card' key={product.id}>
        <img className='product-card-image' src={product.imageUrl} alt={product.name} />
        <div className='product-card-details'>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
          <p>Available: {product.quantity}</p>
        </div>
        <div className="product-card-buttons">
            <button className='product-card-del-btn' onClick={() => onDelete(product.id)}>Delete</button>
            <button className='product-card-upd-btn' onClick={() => onUpdate(product.id)}>Update</button>
        </div>
        {showForm && product === productToUpdate && (
                    <ProductForm product={productToUpdate} onClose={onClose} />
                )}
      </li>
    );
  };
  
  export default ProductCard;
  