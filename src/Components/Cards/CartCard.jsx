import React from 'react';
import './CartCard.css';

function CartCard({ book, onRemove, onRead }) {
    // console.log("This is cart card book ", book);
    
  return (
    <div className="cart-card">
      <img src={book?.bookCoverImg} alt={book?.name} className="cart-card__image" />
      <div className="cart-card__details">
        <h3 className="cart-card__name">{book?.name}</h3>
        <p className="cart-card__price">Price: ${book?.price}</p>
        <div className="cart-card__actions">
          <button onClick={() => onRead(book)} className="btn read-btn">Read</button>
          <button onClick={() => onRemove(book._id)} className="btn remove-btn">Remove</button>
          <button className="btn buy-btn">Buy</button>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
