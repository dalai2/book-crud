import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface BookFormProps {
  book?: {
    id?: number;
    title: string;
    author: string;
    publicationDate: string;
    inStock: boolean;
  };
  onSuccess: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ book, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publicationDate: '',
    inStock: false,
  });

  const [errors, setErrors] = useState({
    title: '',
    author: '',
    publicationDate: '',
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        publicationDate: book.publicationDate,
        inStock: book.inStock,
      });
    }
  }, [book]);

  const validateForm = () => {
    const newErrors = {
      title: '',
      author: '',
      publicationDate: '',
    };

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (!formData.publicationDate) {
      newErrors.publicationDate = 'Publication Date is required';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (book?.id) {
          await axios.put(`/api/books/${book.id}`, formData);
        } else {
          await axios.post('/api/books', formData);
        }
        onSuccess();
      } catch (error) {
        console.error('Failed to save book', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h2 className="form-title">{book ? 'Edit Book' : 'Create New Book'}</h2>
      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`form-input ${errors.title ? 'input-error' : ''}`}
        />
        {errors.title && <p className="error-text">{errors.title}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">Author</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className={`form-input ${errors.author ? 'input-error' : ''}`}
        />
        {errors.author && <p className="error-text">{errors.author}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">Publication Date</label>
        <input
          type="date"
          name="publicationDate"
          value={formData.publicationDate}
          onChange={handleChange}
          className={`form-input ${errors.publicationDate ? 'input-error' : ''}`}
        />
        {errors.publicationDate && <p className="error-text">{errors.publicationDate}</p>}
      </div>
      <div className="form-group checkbox-group">
        <label className="form-label">In Stock</label>
        <input
          type="checkbox"
          name="inStock"
          checked={formData.inStock}
          onChange={handleChange}
          className="form-checkbox"
        />
      </div>
      <button type="submit" className="save-button">
        {book ? 'Update' : 'Create'} Book
      </button>
    </form>
  );
};

export default BookForm;
