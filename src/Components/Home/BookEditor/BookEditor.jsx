import React, { useState, useEffect } from 'react';
import "./BookEditor.css";
import { useNavigate } from 'react-router';
import axios from 'axios';

function BookEditor() {
  const [bookDetails, setBookDetails] = useState();
  const navigate = useNavigate();

  console.log("Hello we are in the book editors page");

  // Retrieve the book data from localStorage when the component mounts
  useEffect(() => {
    const storedBookData = JSON.parse(localStorage.getItem('AUTHOR_BOOK'));
    if (storedBookData) {
      setBookDetails(storedBookData);
    }
  }, []);

  // Update the book details in the state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Update page content
  const handlePageChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPages = [...bookDetails.pages];
    updatedPages[index][name] = value;
    setBookDetails((prevDetails) => ({
      ...prevDetails,
      pages: updatedPages,
    }));
  };

  // Save changes to localStorage
  const handleSave = async () => {
    try {
      const updatedBook = await axios.put(`http://localhost:3500/api/books/updateBookInfo${bookDetails._id}`, bookDetails, {withCredentials:true});
      alert('Changes saved successfully!');
      localStorage.removeItem("AUTHOR_BOOK");
      navigate("/adminPage");
    } catch (error) {
      console.log("There is some errors in your handle save change function so plz fix the bug first ", error);
    }
    
  };
  const backToAdminSection = ()=>{
    localStorage.removeItem("AUTHOR_BOOK");
    navigate("/adminPage");
  }

  return (
    <section className="bookEditorContainer">
      <div className="bookEditorHeader">
        <h2>Edit Book: {bookDetails && bookDetails.bookName}</h2>
        <button className="backButton" onClick={backToAdminSection}>
          Back
        </button>
      </div>

      <div className="formContainer">
        <div className="formSection">
          <label htmlFor="bookName">Book Name</label>
          <input
            type="text"
            id="bookName"
            name="bookName"
            value={bookDetails && bookDetails.bookName}
            onChange={handleInputChange}
            className="inputField"
          />
        </div>

        <div className="formSection">
          <label htmlFor="bookTitle">Book Title</label>
          <input
            type="text"
            id="bookTitle"
            name="bookTitle"
            value={bookDetails && bookDetails.bookTitle}
            onChange={handleInputChange}
            className="inputField"
          />
        </div>

        <div className="formSection">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={bookDetails && bookDetails.author}
            onChange={handleInputChange}
            className="inputField"
          />
        </div>

        <div className="formSection">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={bookDetails && bookDetails.price}
            onChange={handleInputChange}
            className="inputField"
          />
        </div>

        <div className="formSection">
          <label htmlFor="categories">Categories</label>
          <input
            type="text"
            id="categories"
            name="categories"
            value={bookDetails && bookDetails.categories.join(', ')}
            onChange={handleInputChange}
            className="inputField"
          />
        </div>

        <div className="formSection">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={bookDetails && bookDetails.description}
            onChange={handleInputChange}
            className="textareaField"
          />
        </div>

        {/* Pages Editor */}
        <div className="pagesSection">
          <h3>Pages</h3>
          {bookDetails && bookDetails.pages.map((page, index) => (
            <div key={index} className="pageEditor">
              <h4>Page {page.pageNumber}</h4>
              <label htmlFor={`content-${index}`}>Content</label>
              <textarea
                id={`content-${index}`}
                name="content"
                value={page.content}
                onChange={(e) => handlePageChange(e, index)}
                className="textareaField"
              />
            </div>
          ))}
        </div>

        <div className="saveButtonContainer">
          <button onClick={handleSave} className="saveButton">
            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
}

export default BookEditor;
