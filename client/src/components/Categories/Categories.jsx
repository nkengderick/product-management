
import './categories.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/products`)
      .then((response) => {
        const productsByCategory = response.data.products.reduce(
          (acc, product) => {
            const category = product.category;
            if (!acc[category]) {
                acc[category] = { count: 0, totalPrice: 0, totalQuantity: 0 };
            }
            acc[category].count += 1;
            acc[category].totalQuantity += product.quantity || 1
            acc[category].totalPrice += product.price * product.quantity;
            return acc;
          },
          {}
        );

        const categoriesWithCount = Object.entries(productsByCategory).map(
          ([category, {count, totalPrice, totalQuantity}]) => ({
            category,
            count,
            totalPrice,
            totalQuantity,
          })
        );

        setCategories(categoriesWithCount.sort((a, b) => a.category.localeCompare(b.category)));
      })
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div className="Categories">
      <h2>Categories</h2>
      <ul className="category-list">
        {categories.map((category) => (
          <Link to={`/product/${category.category}`} key={category.category} className='category-card'>
            <h2 className="category">{category.category}</h2>
              <p className="count"> {category.count} Products Avalaible </p>
              <p className="quantity">Total Stock: {category.totalQuantity}</p>
              <p className="price">Total Price: ${category.totalPrice.toFixed(2)}</p>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
