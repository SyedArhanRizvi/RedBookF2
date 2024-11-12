import React, { useEffect, useState } from "react";
import "./ReadBook.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
// import { loginAccountController } from "../../../../../BackEnd/Controllers/user.Controller";

function ReadBook() {
  const { bookID } = useParams();
  const [bookObj, setBookObj] = useState();
  const [bookPages, setBookPages] = useState([]);
  const [freeOrNot, setFreeOrNot] = useState(false);
  const [enterInBook, setEnterInBook] = useState(false);
  const [publisherObj, setPublisherObj] = useState();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  const bookPagesHandler = () => {
    setEnterInBook(true);
  };

  const getPublisherDetails = async (publisherId) => {
    try {
      const publisherDetails = await axios.get(`http://localhost:3500/api/user/showUserDetails/${publisherId}`);
      setPublisherObj(publisherDetails.data.user);
      console.log("This is publisher obj ", publisherObj.fullName);
    } catch (error) {
      console.log("Error fetching publisher details: ", error);
    }
  };

  const readWholeBook = async () => {
    try {
      const wholeBook = await axios.get(`http://localhost:3500/api/books/readThisBook${bookID}`);
      const bookData = wholeBook.data.book;
      setBookObj(bookData);
      setBookPages(bookData.pages);
      
      if (bookData.publisher) {
        getPublisherDetails(bookData.publisher);
      }

      setFreeOrNot(bookData.isFree || false);
    } catch (error) {
      console.log("Error reading the book: ", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:3500/api/books/${bookID}/reviews`);
      setReviews(response.data.reviews);
    } catch (error) {
      console.log("Error fetching reviews: ", error);
    }
  };

  const submitReview = async () => {
    try {
      if (newReview) {
        const response = await axios.post(`http://localhost:3500/api/books/${bookID}/reviews`, { review: newReview });
        setReviews([...reviews, response.data.review]);
        setNewReview("");
      }
    } catch (error) {
      console.log("Error submitting review: ", error);
    }
  };

  useEffect(() => {
    readWholeBook();
  }, []);

  const cartProductsHandler = async (bookID)=>{
    console.log("This is cart book id ", bookID);
    
    try {
      const cartProd = await axios.post(`http://localhost:3500/api/cart/addBookIntoCart${bookID}`, {}, {withCredentials:true});
    } catch (error) {
      console.log("There is some errors in your cart product handler plz fix the bug first ", error);
    }
  }

  return (
    <section className="readSingleBook">
      <div className="imgSection">
        <img src={bookObj && bookObj.bookCoverImg} alt={bookObj && bookObj.bookName} />
      </div>

      <div className="detailsSection">
        <div className="details">
          <h1>{bookObj?.bookName}</h1>
          <h3>{bookObj?.bookTitle}</h3>
          <h3>Author: {bookObj?.author}</h3>
          <p>{bookObj?.description}</p>
          <p>Total Pages: {bookObj?.pages.length}</p>
          <p className="publisherDetails">
            <b>Published By: {publisherObj && publisherObj.fullName || "Unknown Publisher"}</b>
          </p>
          <p>
            <i>
              Published Date:{" "}
              {bookObj &&
                new Date(bookObj.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
            </i>
          </p>
        </div>

        <div className="orderRelated">
          <div className="bookPrice">
            <h2>Book Price: {bookObj?.price}</h2>
          </div>
          <div className="btns">
            {!freeOrNot && <button>Buy</button>}
            <button onClick={()=>cartProductsHandler(bookObj?._id)}>Cart</button>
            <button onClick={bookPagesHandler}>Enter in Book</button>
          </div>
        </div>
        <div className="reviewsSection">
          <h3>Reviews & Feedback</h3>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here..."
            className="reviewInput"
          />
          <button onClick={submitReview} className="submitReviewButton">Submit Review</button>
          <button className="backToHom"><Link to="/mainSection">Back</Link></button>
          
        </div>
        {/* <div className="reviewsList"> */}
            {/* {reviews.map((review, index) => (
              <div className="reviewItem" key={index}>
                <p>{review}</p>
              </div>
            ))} */}
          {/* </div> */}
      </div>
      
      <div className="orderRelated">
          <div className="btns">
            <button onClick={bookPagesHandler}>Enter in Book</button>
          </div>
          
        </div>
        {/* Reviews Section */}
        
      {/* </div> */}
      {enterInBook && (
        <div className="bookPages">
          <button className="closeButton" onClick={() => setEnterInBook(false)}>
            Close
          </button>
          {bookPages.map((page) => (
            <div className="page" key={page._id}>
              <h2>Page {page.pageNumber}</h2>
              <p>{page.content}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ReadBook;