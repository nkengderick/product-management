
import './inventory.css';

// Import necessary modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

// Component for the Inventory Tracking section
const InventoryTracking = () => {
  const [inventory, setInventory] = useState([]);
  const lowStockThreshHold = 1

  // Fetch inventory data from the server
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/products`)
      .then((response) => {
        setInventory(response.data.products);
      })
      .catch((error) => {
        console.error('Error fetching inventory:', error);
      });
  }, []);

  // Group inventory by category
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

  
  const handleIncrement = async (productId) => {
        const updatedInventory = inventory.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
  
        
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/product/id${productId}`, {
            quantity: updatedInventory.find((item) => item.id === productId)?.quantity,
        });
        const {message} = response.data
        alert(`Incremented:  ${message}`)
        setInventory(updatedInventory);
  };

  const handleDecrement = async (productId) => {
    const updatedInventory = inventory.map((item) =>
        item.id === productId && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
      );

        const response = await axios.put(`${process.env.REACT_APP_API_URL}/product/id${productId}`, {
          quantity: updatedInventory.find((item) => item.id === productId)?.quantity,
        });
        const {message} = response.data
        alert(`Decremented: ${message}`)
        setInventory(updatedInventory);

  };

  const handleDelete = async (productId) => {
    if(window.confirm('Do you really want to delete this product?')) {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/product/id${productId}`)
        const { message } = response.data
        alert(message)
        setInventory(inventory.filter((item) => item.id !== productId))
    }else{
        alert('Deletion Canceled')
    }
  };

  useEffect(() => {
    inventory.forEach((item) => {
        if(item.quantity <= lowStockThreshHold ) {
            alert(`Low Stock alert for ${item.name}. Current Stock: ${item.quantity}`)
        }
    })
  }, [inventory, lowStockThreshHold])


  return (
    <div className="inventory-tracking">
      <h2>Inventory Tracking</h2>
      {Object.entries(inventoryByCategory).map(([category, products]) => (
        <div key={category} className="category-section">
          <h3 className='category-title'>{category}</h3>
          <table className='product-table'>
            <thead>
              <tr>
                <th className='heading'>Product</th>
                <th className='heading'>Unit Price($)</th>
                <th className='heading'>Current Stock</th>
                <th className='heading'>Total Price ($)</th>
                <th className='heading'>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr className={item.quantity <= lowStockThreshHold ? 'low-stock' : 'product-row'} key={item.id}>
                  <td className="product-name">{item.name}</td>
                  <td className="unit-price">{item.price}</td>
                  <td className="stock-quantity">
                    <p>{item.quantity}</p>
                    <div className='quantity-actions'>
                        <button onClick={() => handleIncrement(item.id)}>+</button>
                        <button onClick={() => handleDecrement(item.id)}>-</button>
                    </div>
                  </td>
                  <td className='product-total'>{item.quantity * item.price}</td>
                  <td>
                    <button className='delete-button' onClick={() => handleDelete(item.id)}>Drop</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2" className="total-label">Total</td>
                <td className="category-total-quantity">{categoryTotals.find((total) => total.category === category)?.totalQuantity || 0}</td>
                <td className="category-total-price">${categoryTotals.find((total) => total.category === category)?.totalPrice.toFixed(2) || 0}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      ))}
    <Link to='/report'>View Summary</Link>
    </div>
  );
};

export default InventoryTracking;
