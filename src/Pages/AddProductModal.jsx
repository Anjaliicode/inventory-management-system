import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AddProductModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData = null 
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [vendor, setVendor] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [lowThreshold, setLowThreshold] = useState(0);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setCategory(initialData.category);
      setVendor(initialData.vendor);
      setQuantity(initialData.stock);
      setLowThreshold(initialData.lowStockThreshold);
      setCost(initialData.cost);
    } else {
   
      setName('');
      setCategory('');
      setVendor('');
      setQuantity(0);
      setLowThreshold(0);
      setCost(0);
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: initialData ? initialData.id : Date.now(),
      name,
      category,
      vendor,
      stock: quantity,
      lowStockThreshold: lowThreshold,
      cost
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <X />
        </button>
        <h1>{initialData ? 'Edit Product' : 'Add New Product'}</h1>
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
            <label htmlFor="low-threshold">Quantity Threshold</label>
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
            {initialData ? 'Update Product' : 'Save Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;