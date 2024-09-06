// src/components/BookList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Book {
  id: number;
  title: string;
  author: string;
  publicationDate: string;
  inStock: boolean;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/books`);
        setBooks(response.data);
      } catch (error) {
        console.error('Failed to fetch books', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="book-list-container">
      <h1 className="book-list-title">Books</h1>
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id} className="book-list-item">
            <Link href={`/books/${book.id}`} className="book-title">
              {book.title}
            </Link>
            <p className="book-details">
              by {book.author} - Published on {new Date(book.publicationDate).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
      <Link href="/create" className="add-new-book">
        Add New Book
      </Link>
    </div>
  );
};

export default BookList;
