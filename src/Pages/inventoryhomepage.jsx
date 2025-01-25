import React, { useState } from 'react';
import { Search, Trash2, SquarePen, X } from 'lucide-react';
import '../styles/inventory.css';

const AddProductModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [vendor, setVendor] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [lowThreshold, setLowThreshold] = useState(0);
  const [cost, setCost] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
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
        <h1>Add New Product</h1>
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
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
};

const InventoryHomepage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([
    {
      name: 'Duraflame Fire Starter',
      sku: '123-456-789',
      vendor: 'Duraflame',
      stock: 100,
      lowStockThreshold: 10,
      cost: 5.00
    },
    // ... other initial data
  ]);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = (newProduct) => {
    setData([...data, newProduct]);
  };

  return (
    <div className="inventory-homepage">
      <div className="header">
        <h1>Inventory Management System</h1>
        <button 
          className="add-button" 
          onClick={() => setIsModalOpen(true)}
        >
          Add New Product
        </button>
      </div>
      
      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddProduct}
      />

      <div className="search-container">
        <div className="search-input-wrapper">
          <Search className="search-icon" />
          <input
            type="search"
            placeholder="Search by name"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Vendor</th>
            <th>Quantity</th>
            <th>Quantity threshold</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td className="name-cell">{item.name}</td>
              <td>{item.sku}</td>
              <td>{item.vendor}</td>
              <td className={`stock-cell ${item.stock < item.lowStockThreshold ? 'low-stock' : ''}`}>
                {item.stock}
              </td>
              <td>{item.lowStockThreshold}</td>
              <td className="cost-cell">${item.cost.toFixed(2)}</td>
              <td className="actions-cell">
                <SquarePen className="square-icon" />
                <Trash2 className="delete-icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryHomepage;