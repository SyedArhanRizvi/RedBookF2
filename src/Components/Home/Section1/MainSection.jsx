import React, { useEffect, useState } from "react";
import "./MainSection.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "../../Cards/Card";
function MainSection() {
  const [rangePrice, setRangePrice] = useState(500);
  const [allBooks, setAllBooks] = useState();
  const [sortEffect, setSortEffect] = useState(false);
  const [author, setAuthor] = useState("all");
  const [bookType, setBookType] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortType, setSortType] = useState("");
  const [filterByCategory, setFilterByCategory] = useState("");
  const [filterBySearch, setFilterBySearch] = useState("");
  const [key, setKey] = useState("");
  const getAllBooks = async () => {
    try {
      const getBooks = await axios.get(
        "http://localhost:3500/api/books/getAllBooks"
      );
      setAllBooks(getBooks.data.allBooks);
      // console.log("This is all get books from book data base ", getBooks);
    } catch (error) {
      console.log(
        "There is some errors in your get all book function plz fix the bug first ",
        error
      );
    }
  };

  // Sort by price or category ::
  const sortByCatOrPr = async (e) => {
    // e.preventDefault();
    setSortEffect(true);
    console.log(sortBy, sortType);
    try {
      const getBooks = await axios.get(
        `http://localhost:3500/api/books/getAllBooks`,
        {
          params: {
            sortBy: sortBy,
            sort: sortType,
          },
        }
      );
      setAllBooks(getBooks.data.allBooks);
      // console.log(allBooks);
    } catch (error) {
      console.log(
        "There is some errors in your handle change controller plz fix the bug first ",
        error
      );
    }
  };
  useEffect(() => {
    if (sortBy && sortType) {
      sortByCatOrPr();
    }
  }, [sortEffect]);
  // ----------------------------------------- //

  const filterHandler = (e) => {
    setFilterByCategory(e.target.value);
  };

  useEffect(() => {
    if (filterByCategory === "All") {
      getAllBooks()
    } else if (filterByCategory) {
      const filterHandlerFunc = async () => {
      
        try {
          const getBooks = await axios.get(
            `http://localhost:3500/api/books/getAllBooks`,
            {
              params: {
                categories: filterByCategory,
              },
            }
          );
          setAllBooks(getBooks.data.allBooks);
          console.log(allBooks);
        } catch (error) {
          console.log(
            "There is some errors in your filter handler function plz fix the bug first ",
            error
          );
        }
      };
      filterHandlerFunc();
    }
  }, [filterByCategory]);

  // Range Change Function ::
  const rangeChangerFunction = async () => {
    console.log(rangePrice);
    try {

    } catch (error) {
      console.log("There is some errors in your range chan");
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      rangeChangerFunction();
    }, 1000);
    return () => clearTimeout(timer);
  }, [rangePrice]);

  // Handle the keydown event
  
  useEffect(() => {
    const handleKeydown = (e) => {
      setKey(e.key); // Update the key state
    };


    // Cleanup event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);
  useEffect(() => {
    if (key == "Enter" && filterBySearch) {
      const inputHandler = () => {
        console.log(filterBySearch);
        try {
        } catch (error) {
          console.log(
            "There is some errors in your input handler function plz fix the bug first ",
            error
          );
        }
      };
      inputHandler();
    }
  }, [key]);

  const checkedBook = () => {
    console.log(bookType);
    try {
      // Add your logic here
    } catch (error) {
      console.log("There is some error in your checked book function", error);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  useEffect(() => {
    checkedBook();
  }, [bookType]);

  const filterByAuthor = (event) => {
    setAuthor(event.target.value);
    console.log("Selected Author:", event.target.value);
    // Add your filtering logic here based on the selected author
  };
  return (
    <section className="mainSection">
      <div className="filter">
        <div className="logo">
          <h1>
            <Link to={"/"}>REDBOOK</Link>
          </h1>
        </div>

        <div class="sort-filter">
          {/* <form
            onSubmit={sortByCatOrPr}
            action="/your-api-endpoint"
            method="GET"
          > */}
          <label for="sortBy">Sort By:</label>
          <select
            name="sortBy"
            id="sortBy"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="price">Price</option>
            <option value="categories">Category</option>
          </select>

          <label for="sort">Order:</label>
          <select
            name="sort"
            id="sort"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

          <button onClick={sortByCatOrPr}>Sort</button>
          {/* </form> */}
        </div>

        <div className="filterByCategory">
          <p>Categories</p>
          <select name="category" onChange={(e) => filterHandler(e)}>
            {/* <select name="genre" id="genre"> */}
            <option value="All">All</option>
            <option value="Comedy">Comedy</option>
            <option value="History">History</option>
            <option value="Adventure">Adventure</option>
            <option value="Romance">Romance</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Mystery">Mystery</option>
            <option value="Thriller">Thriller</option>
            <option value="Horror">Horror</option>
            <option value="Biography">Biography</option>
            <option value="Self-Help">Self-Help</option>
            <option value="Educational">Educational</option>
            {/* </select> */}
          </select>
        </div>

        <div className="price-filter">
          <label htmlFor="priceRange">Filter by Price:</label>
          <input
            type="range"
            id="priceRange"
            min="0"
            max="2000"
            value={rangePrice}
            step="50"
            className="rangeInput"
            onInput={(e) => setRangePrice(e.target.value)}
          />
          <div className="range-output">Price: $0 - ${rangePrice}</div>
        </div>

        <div className="filterByName">
          <input
            type="text"
            placeholder="Search book or author"
            onChange={(e) => setFilterBySearch(e.target.value)}
          />
        </div>
        <div className="book-filter">
          <label>Filter by Book Type:</label>
          <br />
          <input
            type="radio"
            name="bookType"
            value="all"
            onClick={() => setBookType("All Books")}
            checked={bookType === "All Books"}
          />{" "}
          All Books
          <br />
          <input
            type="radio"
            name="bookType"
            value="free"
            onClick={() => setBookType("Free Books")}
            checked={bookType === "Free Books"}
          />{" "}
          Free Books
          <br />
          <input
            type="radio"
            name="bookType"
            value="paid"
            onClick={() => setBookType("Paid Books")}
            checked={bookType === "Paid Books"}
          />{" "}
          Paid Books
        </div>

        <div className="author-filter">
          <label htmlFor="authorSelect">Filter by Author:</label>
          <select id="authorSelect" value={author} onChange={filterByAuthor}>
            <option value="all">All Authors</option>
            <option value="author1">Author 1</option>
            <option value="author2">Author 2</option>
            <option value="author3">Author 3</option>
          </select>
        </div>
      </div>
      <div className="prods">
        {!allBooks ? (
          <h1>Sorry there is no books available here..</h1>
        ) : (
          allBooks.map((book) => {
            return <Card book={book}></Card>;
          })
        )}
      </div>
    </section>
  );
}

export default MainSection;
