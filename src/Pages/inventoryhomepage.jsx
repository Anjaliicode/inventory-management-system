import React, { useState, useEffect } from 'react';
import { Search, Trash2, SquarePen, X, ArrowUpDown } from 'lucide-react';
import AddProductModal from './AddProductModal';
import "../styles/inventory.css";

const InventoryHomepage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('inventoryData');
    return savedData ? JSON.parse(savedData) : [];
  });

 
  const categories = ['', ...new Set(data.map(item => item.category))];

 
  const processedData = data
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === '' || item.category === categoryFilter)
    )
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];

      if (valueA < valueB) 
        return sortConfig.direction === 'ascending' ? -1 : 1;
      if (valueA > valueB) 
        return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });

 
  useEffect(() => {
    localStorage.setItem('inventoryData', JSON.stringify(data));
  }, [data]);


  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };


  const handleAddProduct = (newProduct) => {
    if (editingProduct) {
      setData(data.map(item => 
        item.id === newProduct.id ? newProduct : item
      ));
    } else {
      setData([...data, newProduct]);
    }
    setEditingProduct(null);
  };


  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };


  const handleDeleteProduct = (productId) => {
    setData(data.filter(item => item.id !== productId));
  };

  return (
    <div className="inventory-homepage">
      <div className="header">
        <h1>Inventory Management System</h1>
        <button 
          className="add-button" 
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
        >
          Add New Product
        </button>
      </div>
      
      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={handleAddProduct}
        initialData={editingProduct}
      />

      <div className="search-filter-container">
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
        
        <div className="category-filter">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat ? ` ${cat}` : 'All Categories'}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Vendor</th>
            <th onClick={() => handleSort('stock')}>
              Quantity 
              <ArrowUpDown color='green' className="sort-icon" />
            </th>
            <th>Quantity Threshold</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {processedData.map((item) => (
            <tr key={item.id}>
              <td className="name-cell">{item.name}</td>
              <td>{item.category}</td>
              <td>{item.vendor}</td>
              <td className={`stock-cell ${item.stock < item.lowStockThreshold ? 'low-stock' : ''}`}>
                {item.stock}
              </td>
              <td>{item.lowStockThreshold}</td>
              <td className="cost-cell">${item.cost.toFixed(2)}</td>
              <td className="actions-cell">
                <SquarePen 
                  className="square-icon" 
                  color='green'
                  onClick={() => handleEditProduct(item)}
                />
                <Trash2 
                  className="delete-icon" 
                  color='green'
                  onClick={() => handleDeleteProduct(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryHomepage;