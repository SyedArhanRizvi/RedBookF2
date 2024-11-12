import React, { useEffect, useState } from "react";
import "./Navabar.css";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useAppContext } from "../../../Context/userAuthContext";
import { useNavigate } from "react-router-dom";

function Navabar() {
  const navigate = useNavigate();
  const [setUserAuth, userAuth] = useState();
  const [loggedInUser, setLoggedInUser] = useState();
  const [searchQuery, setSearchQuery] = useState(""); // New state for search input
  const [searchResults, setSearchResults] = useState([]); // New state for search results
  const [showPopup, setShowPopup] = useState(false); // State to show/hide popup
  useEffect(() => {
    const callAuthChecker = async () => {
      try {
        const userChecker = await axios.post(
          "http://localhost:3500/api/user/userAuthChecker",
          {},
          { withCredentials: true }
        );
        await setLoggedInUser(userChecker.data.user);
        if (loggedInUser) {
          localStorage.setItem("REDBOOK_User", JSON.stringify(loggedInUser));
        }
        if (userChecker.status === 200) {
          setUserAuth(true);
        }
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 400 || error.response.status === 500)
        ) {
          setUserAuth(false);
        }
        console.log(
          "There is some error in your callAuthChecker function, please fix the bug first",
          error
        );
      }
    };

    callAuthChecker();
  }, [userAuth]);

  const userAccountHandler = () => {
    if (!userAuth) {
      navigate("/logIn");
    } else {
      navigate("/adminPage");
    }
  };

  // const handleSearchChange = async (e) => {
  //   setSearchQuery(e.target.value);
  //   if (e.target.value.trim() !== "") {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3500/api/books/searchAuthorOrBook?searchAuthorOrBook=${e.target.value}`
  //       );
  //       // console.log(response.data.data);
  //       if (response.status === 200) {
  //         setSearchResults(response.data.data); // Assume the results come in `response.data.results`
  //         setShowPopup(true);
  //         console.log(searchResults);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching search results:", error);
  //     }
  //   } else {
  //     setShowPopup(false); // Hide popup if search query is empty
  //     setSearchResults([]);
  //   }
  // };

  return (
    <header>
      <nav>
        <div>
          <Link to="/">
            <h1>REDBOOK</h1>
          </Link>

          <Link to="/mainSection">
            <h1>MENU</h1>
          </Link>
        </div>

        <div className="sd">
          
          <h1 onClick={userAccountHandler}>ACCOUNT</h1>
        </div>
      </nav>
    </header>
  );
}

export default Navabar;
