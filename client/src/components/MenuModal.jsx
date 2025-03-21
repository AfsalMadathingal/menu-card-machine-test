import React, { useState, useEffect } from 'react';
import Joi from 'joi';
import axios from 'axios';

const api = import.meta.env.VITE_ENV == "LOCAL" ?  import.meta.env.VITE_BASEAPI  : ''


const MenuModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }
  }, [isOpen]);

  const schema = Joi.object({
    name: Joi.string()
      .required()
      .min(2)
      .max(50)
      .messages({
        'string.empty': 'Menu name is required',
        'string.min': 'Menu name must be at least 2 characters',
        'string.max': 'Menu name cannot exceed 50 characters'
      }),
    description: Joi.string()
      .required()
      .min(10)
      .max(500)
      .messages({
        'string.empty': 'Description is required',
        'string.min': 'Description must be at least 10 characters',
        'string.max': 'Description cannot exceed 500 characters'
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
      [name]: value
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
      const response = await axios.post(`${api}/api/menus`, formData);
      if (response.data) {
        onSuccess(response.data);
        onClose();
        setFormData({ name: '', description: '' });
      }
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'Failed to create menu'
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
        <h2 className="text-2xl font-bold mb-6">Add New Menu</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Menu Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${
                errors.name ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="Enter menu name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
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
              placeholder="Enter menu description"
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
              {isSubmitting ? 'Creating...' : 'Create Menu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuModal; 