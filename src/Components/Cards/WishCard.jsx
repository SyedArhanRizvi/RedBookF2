import React from 'react';
import './WishCard.css';

function WishCard({ book }) {
  return (
    <div className="wish-card-alt">
      <div className="card-content">
        <img src={book.bookCoverImg} alt={`${book.bookTitle} cover`} className="book-cover-alt" />
        <div className="book-info">
          <h3 className="book-title-alt">{book.bookTitle}</h3>
          <p className="book-author-alt">by {book.author}</p>
          <p className="book-description-alt">₹: {book.price}</p>
        </div>
      </div>
      <div className="card-buttons">
        <button className="btn-alt read-btn-alt">Read Book</button>
        <button className="btn-alt remove-btn-alt">Remove from Wishlist</button>
      </div>
    </div>
  );
}

export default WishCard;
