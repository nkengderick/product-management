import './reports.css'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Report = () => {
    const [inventory, setInventory] = useState([]);
    const lowStockThreshHold = 1
    const date = new Date();
    
    const dateFormat = date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    useEffect(() => {
        
        axios.get(`${process.env.REACT_APP_API_URL}/products`)
          .then((response) => {
            setInventory(response.data.products);
          })
          .catch((error) => {
            console.error('Error fetching inventory:', error);
          });
      }, []);

      const inventoryByCategory = inventory.reduce((acc, item) => {
        acc[item.category] = [...(acc[item.category] || []), item];
        return acc;
      }, {});
    
      const categoryTotals = Object.entries(inventoryByCategory).map(([category, products]) => {
        const totalQuantity = products.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = products.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return {
          category,
          totalQuantity,
          totalPrice,
        };
      });

      const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
      const totalValue = inventory.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const lowStockItems = inventory.filter(item => item.quantity <= lowStockThreshHold);
      const avgUnitPrice = totalItems > 0 ? totalValue / totalItems : 0;

    return (
      <div className="inventory-report">
        <h2>Summary Report</h2>
        <p>Generated on: {dateFormat}</p>
        <p>Total number of items: {totalItems}</p>
        <p>Total value: {totalValue}</p>
        <h3>Low stock items ({lowStockThreshHold} or below):</h3>
        <ul>
          {lowStockItems.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
        <h3>Category-specific totals:</h3>
        {categoryTotals.map(total => (
          <div key={total.category}>
            <h4>{total.category}</h4>
            <p>Total quantity: {total.totalQuantity}</p>
            <p>Total value: ${totalValue}</p>
          </div>
        ))}
        <p>Average unit price: ${avgUnitPrice.toFixed(2)}</p>
      <button onClick={window.print}>Print Summary</button>
      </div>
    );
  };
  
  export default Report;
  