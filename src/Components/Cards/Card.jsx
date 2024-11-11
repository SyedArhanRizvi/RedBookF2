import React from 'react';
import "./Card.css";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useAppContext } from '../../../Context/userAuthContext';

function Card({book}) {
    const bookID = book._id;
    // const {setWishlistBooks, wishlistBook} = useAppContext();
    const WishlistController = async ()=>{
      // setWController(true);
      try {
        const wishlistBook = await axios.post(`http://localhost:3500/api/books/addBookIntoWishList${bookID}`, {}, {withCredentials:true});
        console.log(wishlistBook);
      } catch (error) {
        console.log("There is some errors in your wishlist controller plz fix the bug first ", error); 
      }
    }
  return (
    <div className='card'>
      <div className="img"><img src={book.bookCoverImg} alt="" /></div>
      <div className="read">
        <h2>{book.bookName}</h2>
        <p><b>{book.bookTitle}</b></p>
      </div>
      <div className="btns">
        <button className='red'><Link to={`/readWholeBook/${bookID}`}>Read</Link></button>
        <button className='green' onClick={WishlistController}>WishList</button>
      </div>
    </div>
  )
}

export default Card;