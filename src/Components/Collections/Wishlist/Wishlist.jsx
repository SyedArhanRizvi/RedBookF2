import React, { useEffect, useState } from "react";
import "./Wishlist.css";
import WishCard from "../../Cards/WishCard";
import axios from "axios";
import { useAppContext } from "../../../../Context/userAuthContext";

function Wishlist({ redBookUser }) {
  const {wishlistBook, setWishlistBooks} = useAppContext();
  const [wishBook, setWishBook] = useState([]);

  const getItemViaID = async (id) => {
    try {
      const wishItem = await axios.get(
        `http://localhost:3500/api/books/readThisBook${id}`
      );
      if (wishItem.status === 200) {
        setWishBook((prev) => [...prev, wishItem.data.book]);
      }
    } catch (error) {
      console.log("Error in getItemViaID:", error);
    }
  };

  const getUserWishlistItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3500/api/user/showUserDetails/${redBookUser._id}`
      );
      if (response.status === 200) {
        setWishlistBooks(response.data.user.wishlist || []);
      }
    } catch (error) {
      console.log("Error fetching wishlist items:", error);
    }
  };

  useEffect(() => {
    getUserWishlistItems();
  }, []);

  useEffect(() => {
    wishlistBook.forEach((bookID) => {
      getItemViaID(bookID);
    });
  }, []);

  return (
    <div className="wishlistSection">
           {" "}
      {wishBook.length === 0 ? (
        <h1>There is no book available in your wishlist.</h1>
      ) : (
        wishBook.map((item) => {
         return <WishCard book={item}></WishCard>
        })
      )}
         {" "}
    </div>
  );
}

export default Wishlist;
