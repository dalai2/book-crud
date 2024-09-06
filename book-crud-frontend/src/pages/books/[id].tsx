import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  publicationDate: string;
  inStock: boolean;
}

const BookDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Get the book ID from the route
  const [book, setBook] = useState<Book | null>(null); // Set the type here
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [errors, setErrors] = useState({
    title: '',
    author: '',
    publicationDate: '',
  }); // Track validation errors

  useEffect(() => {
    if (id) {
      // Fetch the book details using the ID
      axios.get(`http://localhost:3000/api/books/${id}`)
        .then(response => setBook(response.data))
        .catch(error => console.error('Error fetching book details:', error));
    }
  }, [id]);

  const validateForm = () => {
    const newErrors = {
      title: '',
      author: '',
      publicationDate: '',
    };

    if (!book?.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!book?.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (!book?.publicationDate) {
      newErrors.publicationDate = 'Publication Date is required';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (book) {
      setBook({ ...book, [name]: value });
    }
  };

  const handleCheckboxChange = () => {
    if (book) {
      setBook({ ...book, inStock: !book.inStock });
    }
  };

  const handleSave = async () => {
    if (book && validateForm()) {
      try {
        await axios.put(`http://localhost:3000/api/books/${id}`, book);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating book:', error);
      }
    }
  };

  if (!book) return <div className="p-4 text-gray-700">Loading...</div>;

  return (
    <div className="book-details-container">
      <h1 className="book-details-heading">{isEditing ? 'Edit Book' : 'Book Details'}</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="book-details-form">
        <div className="form-group">
          <label className="form-label">Title: </label>
          {isEditing ? (
            <>
              <input
                type="text"
                name="title"
                value={book.title}
                onChange={handleInputChange}
                className={`form-input ${errors.title ? 'border-red-500' : ''}`}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </>
          ) : (
            <p className="form-text">{book.title}</p>
          )}
        </div>
        <div className="form-group">
          <label className="form-label">Author: </label>
          {isEditing ? (
            <>
              <input
                type="text"
                name="author"
                value={book.author}
                onChange={handleInputChange}
                className={`form-input ${errors.author ? 'border-red-500' : ''}`}
              />
              {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
            </>
          ) : (
            <p className="form-text">{book.author}</p>
          )}
        </div>
        <div className="form-group">
          <label className="form-label">Publication Date: </label>
          {isEditing ? (
            <>
              <input
                type="date"
                name="publicationDate"
                value={new Date(book.publicationDate).toISOString().split('T')[0]}
                onChange={handleInputChange}
                className={`form-input ${errors.publicationDate ? 'border-red-500' : ''}`}
              />
              {errors.publicationDate && <p className="text-red-500 text-sm">{errors.publicationDate}</p>}
            </>
          ) : (
            <p className="form-text">{new Date(book.publicationDate).toLocaleDateString()}</p>
          )}
        </div>
        <div className="form-group">
          <label className="form-label">In Stock: </label>
          {isEditing ? (
            <input
              type="checkbox"
              name="inStock"
              checked={book.inStock}
              onChange={handleCheckboxChange}
              className="form-checkbox"
            />
          ) : (
            <p className="form-text">{book.inStock ? 'In Stock' : 'Out of Stock'}</p>
          )}
        </div>
        {isEditing ? (
          <div className="form-actions">
            <button type="submit" className="save-button">Save</button>
            <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <button type="button" className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
        )}
      </form>
    </div>
  );
};

export default BookDetail;
