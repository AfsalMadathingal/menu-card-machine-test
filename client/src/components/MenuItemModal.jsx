import React, { useState, useEffect } from 'react';
import Joi from 'joi';
import axios from 'axios';


const api = import.meta.env.VITE_ENV == "LOCAL" ?  import.meta.env.VITE_BASEAPI  : ''


const MenuItemModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    menuId: ''
  });

  const [menus, setMenus] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      fetchMenus();
    } else {
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }
  }, [isOpen]);

  const fetchMenus = async () => {
    try {
      const response = await axios.get(`${api}/api/menus`);
      setMenus(response.data);
    } catch (error) {
      console.error('Failed to fetch menus:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Joi validation schema
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .min(2)
      .max(50)
      .messages({
        'string.empty': 'Item name is required',
        'string.min': 'Item name must be at least 2 characters',
        'string.max': 'Item name cannot exceed 50 characters'
      }),
    description: Joi.string()
      .required()
      .min(10)
      .max(500)
      .messages({
        'string.empty': 'Description is required',
        'string.min': 'Description must be at least 10 characters',
        'string.max': 'Description cannot exceed 500 characters'
      }),
    price: Joi.number()
      .required()
      .min(0)
      .messages({
        'number.base': 'Price must be a number',
        'number.empty': 'Price is required',
        'number.min': 'Price cannot be negative'
      }),
    menuId: Joi.string()
      .required()
      .messages({
        'string.empty': 'Please select a menu',
        'any.required': 'Please select a menu'
      })
  });

  const validateForm = () => {
    const { error } = schema.validate(formData, { abortEarly: false });
    if (!error) return null;

    const validationErrors = {};
    error.details.forEach((detail) => {
      validationErrors[detail.path[0]] = detail.message;
    });
    return validationErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || value : value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const validationErrors = validateForm();
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${api}/api/menu-items`, formData);
      if (response.data) {
        onSuccess(response.data);
        onClose();
        setFormData({
          name: '',
          description: '',
          price: '',
          menuId: ''
        });
      }
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'Failed to create menu item'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen && !isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-in-out ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>

      <div 
        className={`absolute inset-0 backdrop-blur-sm bg-black/30 transition-all duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      

      <div className={`relative bg-white rounded-lg p-8 w-full max-w-md transform transition-all duration-300 ${
        isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
      }`}>
        <h2 className="text-2xl font-bold mb-6">Add New Menu Item</h2>
        
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading menus...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Menu
              </label>
              <select
                name="menuId"
                value={formData.menuId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${
                  errors.menuId ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
              >
                <option value="">Select a menu</option>
                {menus.map((menu) => (
                  <option key={menu._id} value={menu._id}>
                    {menu.name}
                  </option>
                ))}
              </select>
              {errors.menuId && (
                <p className="text-red-500 text-xs mt-1">{errors.menuId}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Item Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${
                  errors.name ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Enter item name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${
                  errors.price ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Enter price"
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${
                  errors.description ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                rows="4"
                placeholder="Enter item description"
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description}</p>
              )}
            </div>

            {errors.submit && (
              <div className="mb-4">
                <p className="text-red-500 text-sm">{errors.submit}</p>
              </div>
            )}

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 bg-blue-500 text-white rounded-lg transition-all duration-200 ${
                  isSubmitting 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-blue-600 hover:shadow-md'
                }`}
              >
                {isSubmitting ? 'Creating...' : 'Create Item'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MenuItemModal; 