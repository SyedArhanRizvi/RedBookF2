import React, { useEffect, useState } from 'react';
import './Cart.css';
import axios from 'axios';
import CartCard from '../../Cards/CartCard';
import { useAppContext } from '../../../../Context/userAuthContext';

function Cart({ redBookUser }) {
  // const [cartItems, setCartItems] = useState([]);
  const {cartItems, setCartItems} = useAppContext();
  const [book, setBook] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const getAllCartBooks = async (bookID) => {
    try {
      const cartBook = await axios.get(`http://localhost:3500/api/books/readThisBook${bookID}`);
      // console.log("this is cart book ", cartBook);
      
      if (cartBook.status === 200) {
        setBook(cartBook.data.book);
      }
    } catch (error) {
      console.error("Error fetching individual book data:", error);
    }
  };

  const getAllCartProds = async () => {
    try {
      const cartProds = await axios.get(`http://localhost:3500/api/cart/getAllCartProducts${redBookUser._id}`);
      // console.log("I am in get all cart prod ", cartProds);
      
      if (cartProds.status === 200) {
        const items = cartProds.data.cartItems.items;
        setCartItems(items);
        setTotalPrice(cartProds.data.cartItems.totalPrice);
        items.map((item) => {
          // console.log("This is item ", item);
          
           return getAllCartBooks(item.book)
        });
      }
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  useEffect(() => {
    getAllCartProds();
  }, []);

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <h1 className="empty-cart-message">There is no item in your cart.</h1>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartCard
                key={item.book}
                book={book}
                onRemove={() => {}}
                onRead={() => {}}
              />
            ))}
          </div>
          <div className="checkout-section">
            <h2>Total Price: ${totalPrice}</h2>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;


/* 
  const [cartItems, setCartItems] = useState();
  const [book, setBook] = useState();

  const getAllCartBooks = async (bookID) => {
    // console.log("This is sepprate book id ", bookID);
    
    try {
      const cartBook = await axios.get(`http://localhost:3500/api/books/readThisBook${bookID}`);
      console.log(cartBook);
      setBook(cartBook.data.book);
     if(cartBook.status === 200) {
      console.log(book);
     }
      
    } catch (error) {
      console.log("There is some errors in your get all cart books container plz fix the bug first ", error);
    }
  }
  const getAllCartProds = async ()=>{
    try {
      const cartProds = await axios.get(`http://localhost:3500/api/cart/getAllCartProducts${redBookUser._id}`);
      setCartItems(cartProds.data.cartItems.items);
      if(cartProds.status === 200) {
        cartItems?.map((id)=>{
          return getAllCartBooks(id.book);
          
        })
      }
    } catch (error) {
      console.log("There are some errors in your get all cart prod functions plz fix the bug first ", error);
    }
  }
  useEffect(()=>{
    getAllCartProds();
  }, []);
*/ 