import React, { useState } from 'react';
import '../styles/productform.css';

const AddProductForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [vendor, setVendor] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [lowThreshold, setLowThreshold] = useState(0);
  const [cost, setCost] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="add-product-form">
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            <option value="bathroom">Bathroom</option>
            <option value="household">Household</option>
            <option value="kitchen">Kitchen</option>
            <option value="cleaning">Cleaning</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="vendor">Vendor</label>
          <input
            type="text"
            id="vendor"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min="0"
            step="1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="low-threshold">Low Threshold</label>
          <input
            type="number"
            id="low-threshold"
            value={lowThreshold}
            onChange={(e) => setLowThreshold(parseInt(e.target.value))}
            min="0"
            step="1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cost">Cost</label>
          <input
            type="number"
            id="cost"
            value={cost}
            onChange={(e) => setCost(parseFloat(e.target.value))}
            min="0"
            step="0.01"
            required
          />
        </div>
        <button type="submit" className="save-button">
          Save Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;