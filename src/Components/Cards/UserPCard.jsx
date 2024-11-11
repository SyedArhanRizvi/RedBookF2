import React from 'react';
import './UserPCard.css';

function UserPCard({ book, onEdit, onDelete }) {
    // console.log(book);
    
    return (
        <div className="userPCard">
            <img src={book.bookCoverImg} alt={book.title} className="bookCover" />
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Name:</strong> {book.bookName}</p>
            <p><strong>Price:</strong> {book.price}</p>
            <div className="cardActions">
                <button className="editBtn" onClick={() => onEdit(book._id)}>Edit</button>
                <button className="deleteBtn" onClick={() => onDelete(book._id)}>Delete</button>
            </div>
        </div>
    );
}

export default UserPCard;