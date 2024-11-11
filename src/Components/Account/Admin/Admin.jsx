import React, { useEffect, useState } from "react";
import "./Admin.css";
import axios from "axios";
import { useNavigate } from "react-router";
import Cart from "../../Collections/Cart/Cart";
import UserPost from "../../Collections/Posts/UserPost";
import Wishlist from "../../Collections/Wishlist/Wishlist";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../../Context/userAuthContext";
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';

function Admin() {
  // const [acFunc, setAcFunc] = useState(false);
  const { rbUserPosts, setRBUserPosts } = useAppContext();
  
  const navigate = useNavigate();
  const [adminAuth, setAdminAuth] = useState(false);

  const [redBookUser, setRedBookUser] = useState(
    JSON.parse(localStorage.getItem("REDBOOK_User")) || ""
  );
  const [forAdmin, setForAdmin] = useState(redBookUser && redBookUser.admin);
  // POP UP STATES ::
  const [logoutPopUp, setLogOutPopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [editAcPopUp, setEditAcPopUp] = useState(false);
  const [adminLoginPopUp, setAdminPopUp] = useState(false);
  const [removedAcPopUp, setRemovedAcPopUp] = useState(false);
  // const [postDeletePopUp, setPostDeletePopUp] = useState(false);
  const [chatbot, setChatBot] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleMinimize = () => setIsMinimized(!isMinimized);
  const handleOpen = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (input.trim()) {
        // Add user message to the chat
        setMessages([...messages, { sender: 'user', text: input }]);
        
        // Clear input field
        setInput('');

        const aiChatbotHandler = async () => {
            const options = {
                method: 'POST',
                url: 'https://gemini-pro-ai.p.rapidapi.com/',
                headers: {
                    'x-rapidapi-key': 'fbbf913b1dmsh38f4eb90dd4b319p1e3a2ajsn049ef0ecad4e',
                    'x-rapidapi-host': 'gemini-pro-ai.p.rapidapi.com',
                    'Content-Type': 'application/json'
                },
                data: {
                    contents: [
                        {
                            role: 'user',
                            parts: [{ text: input }]
                        }
                    ]
                }
            };

            try {
                const response = await axios.request(options);
                console.log(response.data.candidates[0].content.parts[0].text);
                //data.candidates[0].content.parts[0].text
                // Update chat with bot's response
                setMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'bot', text: response.data.candidates[0].content.parts[0].text || 'AI response unavailable' }
                ]);
            } catch (error) {
                console.log("There was an error with the AI handler:", error);
                
                // Add error message to the chat
                setMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'bot', text: 'Error: Unable to fetch response.' }
                ]);
            }
        };

        // Call the AI chatbot handler function to get the bot's response
        aiChatbotHandler();
    }
};

  // ---------------------- //
  useEffect(() => {
    if (redBookUser.admin === true) {
      const getUserPostedBooks = async () => {
        try {
          const userPostedBooks = await axios.get(
            `http://localhost:3500/api/books/getUserPostedBook${redBookUser._id}`
          );
          setRBUserPosts(userPostedBooks.data.userPostedBooks);
        } catch (error) {
          console.log(
            "There is some errors in your get user posted book handle plz fix the bug first ",
            error
          );
        }
      };
      getUserPostedBooks();
    }
  }, [redBookUser]);

  
  // FOR BASIC DETAILS STATES ::
  const [authorType, setAuthorType] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(redBookUser && redBookUser.fullName);
  const [username, setUsername] = useState(redBookUser && redBookUser.username);
  const [email, setEmail] = useState(redBookUser && redBookUser.email);
  const [phone, setPhone] = useState(redBookUser && redBookUser.phone);
  const [userProfileImg, setUserProfileImg] = useState();
  const [imageSrc, setImageSrc] = useState(
    redBookUser && redBookUser.userProfileImg
  );
  const [description, setDescription] = useState(
    redBookUser && redBookUser.userDescription
  );

  // PopUp for Wishlist and Cart and User Posts Container ::
  const [userPostsC, setUserPostsC] = useState(true);
  const [userWishListC, setUserWishListC] = useState(false);
  const [userCartC, setUserCartC] = useState(false);

  // All Functions
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setUserProfileImg(event.target.files[0]);
    console.log(userProfileImg);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const deleteAccount = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const deletedUser = await axios.post(
        "http://localhost:3500/api/user/deleteUserAccount",
        { email, password },
        { withCredentials: true }
      );
      console.log(deletedUser);
      if (deletedUser.status === 201) {
        localStorage.removeItem("REDBOOK_User");
        navigate("/");
      }
    } catch (error) {
      console.log(
        "There is some errors in your logout handler plz fix the bug ",
        error
      );
    }
  };
  const editAccountHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("fullName", fullName);
    data.append("username", username);
    data.append("description", description);
    data.append("userProfileImg", userProfileImg);
    data.append("phone", phone);
    data.append("email", email);
    try {
      const updatedUser = await axios.put(
        `http://localhost:3500/api/user/updateAccount/${
          redBookUser && redBookUser._id
        }`,
        data,
        { withCredentials: true }
      );
      if (updatedUser.status === 201) {
        localStorage.setItem(
          "REDBOOK_User",
          JSON.stringify(updatedUser.data.updatedUser)
        );
        setEditAcPopUp(false);
      }
    } catch (error) {
      console.log(
        "There is some errors in your edit form handler plz fix the bug first ",
        error
      );
    }
  };
  const adminAccountController = async (e) => {
    e.preventDefault();
    try {
      const createdAdmin = await axios.put(
        "http://localhost:3500/api/user/createAdminAccount",
        { email, password, authorType }
      );
      if (createdAdmin.status === 201) {
        localStorage.setItem(
          "REDBOOK_User",
          JSON.stringify(createdAdmin.data.user)
        );
        setForAdmin(true);
        setAdminPopUp(false);
      }
    } catch (error) {
      console.log(
        "There is some errors in your admin account controller function plz fix the bug first ",
        error
      );
    }
  };
  const removeAdminAccountHandler = async () => {
    try {
      const removedAdmin = await axios.put(
        `http://localhost:3500/api/user/removeAdminAccount${redBookUser._id}`,
        {},
        { withCredentials: true }
      );
      if (removedAdmin.status === 201) {
        localStorage.setItem(
          "REDBOOK_User",
          JSON.stringify(removedAdmin.data.removedAdmin)
        );
        setRemovedAcPopUp(false);
      }
    } catch (error) {
      console.log(
        "There is some errors in your remove admin account handler plz fix the bug first ",
        error
      );
    }
  };
  const logoutHandler = async (e) => {
    try {
      const deletedUser = await axios.post(
        `http://localhost:3500/api/user/loggedOutAccount/${redBookUser._id}`,
        {},
        { withCredentials: true }
      );
      if (deletedUser.status === 200) {
        localStorage.removeItem("REDBOOK_User");
        navigate("/");
      }
    } catch (error) {
      console.log(
        "There is some errors in your logout handler plz fix the bug first ",
        error
      );
    }
  };

  return (
    <section className="userPage">
      {/* POP FOR DELETE THE ACCOUNT */}
      {deletePopUp && (
        <div className="logoutPopUp">
          <form onSubmit={deleteAccount}>
            <input
              type="text"
              name="email"
              value={email}
              placeholder="Enter your email here.."
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              name="password"
              value={password}
              placeholder="Enter your password here.."
              onChange={(e) => setPassword(e.target.value)}
            />

            <input type="submit" value={"Delete Account"} className="btn" />
            <p
              className="goBack"
              onClick={() => setDeletePopUp((prev) => !prev)}
            >
              <b>X</b>
            </p>
          </form>
        </div>
      )}

      {/* POP UP FOR LOG OUT ACCOUNT */}
      {logoutPopUp && (
        <div className="logout2PpUp">
          <div>
            <h1 style={{ color: "red", borderBottomStyle: "groove" }}>
              Warning
            </h1>
            <p>
              "Are you sure you want to log out? Logging out will end your
              current session, and any unsaved changes may be lost. To continue
              using all features and keep your data secure, make sure to save
              your work before logging out. You’ll need to log in again to
              access your account and resume your activity."
            </p>
            <button className="btn" onClick={logoutHandler}>
              Logout
            </button>
            <button onClick={() => setLogOutPopUp(false)}>Cancel</button>
          </div>
        </div>
      )}
      {editAcPopUp && (
        <div className="editAcPopUp">
          <form onSubmit={editAccountHandler} encType="multipart/form-data">
            <div className="img">
              <div>
                {imageSrc ? (
                  <img src={imageSrc} alt="Selected" />
                ) : (
                  <p>No image</p>
                )}
              </div>
              <label htmlFor="imgTag">Upload Image:</label>
              <input type="file" id="imgTag" onChange={handleImageChange} />
            </div>
            <input
              type="text"
              name="fullName"
              placeholder="Update your new name here.."
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="text"
              name="username"
              placeholder="Update your new username here.."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              name="description"
              placeholder="Update your description here.."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              name="phone"
              placeholder="Update your new phone here.."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              name="email"
              placeholder="Update your new email here.."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input type="submit" className="submit" value={"Submit"} />
            {/* <button className="submit">Submit</button> */}
            <button
              className="cancel"
              onClick={() => setEditAcPopUp((prev) => !prev)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* POP UP FOR ADMIN ACCOUNT CREATION */}
      {adminLoginPopUp && (
        <div className="adminAcPopUp">
          <form onSubmit={adminAccountController}>
            <input
              type="text"
              name="email"
              placeholder="Enter your email here.."
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              name="password"
              placeholder="Enter your password here.."
              onChange={(e) => setPassword(e.target.value)}
            />
            <select
              name="writerCategory"
              id="writerCategory"
              onChange={(e) => setAuthorType(e.target.value)}
            >
              <option value="" disabled selected>
                Select writer category
              </option>
              <option value="poet">Poet</option>
              <option value="novelist">Novelist</option>
              <option value="essayist">Essayist</option>
              <option value="journalist">Journalist</option>
              <option value="playwright">Playwright</option>
              <option value="screenwriter">Screenwriter</option>
              <option value="biographer">Biographer</option>
              <option value="critic">Critic</option>
              <option value="travel-writer">Travel Writer</option>
              <option value="technical-writer">Technical Writer</option>
              <option value="children-writer">Children’s Writer</option>
              <option value="science-writer">Science Writer</option>
              <option value="other-writer">Other Writer</option>
            </select>
            <input
              className="btn"
              type="submit"
              value={"Create Admin Account"}
            />
            <button
              className="cancel"
              onClick={() => setAdminPopUp((prev) => !prev)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {removedAcPopUp && (
        <div className="removedAcPopUp">
          <div>
            <h1 style={{ color: "red", borderBottomStyle: "groove" }}>
              Warning
            </h1>
            <p>
              "Are you sure you want to remove your admin account? You will not
              access your lots of REDBOOK features like would't add your books
              in our platform and you would't access your current book data To
              continue using all features and keep your data secure, make sure
              to save your work before remove your account. You’ll need to log
              in again to access your account and resume your activity."
            </p>
            <button onClick={removeAdminAccountHandler}>Remove</button>
            <button className="cancel" onClick={() => setRemovedAcPopUp(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* PopUp for Chat Boat */}

      {
        chatbot && <Draggable>
        <motion.div
            className={`chatbotContainer ${isMinimized ? 'minimized' : 'expanded'}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            {isMinimized ? (
                <div className="circleMode" onClick={handleMinimize}>
                    <p>💬</p>
                </div>
            ) : (
                <div className="popupContent">
                    <h2>Chatbot</h2>
                    <p>How can I help you today?</p>
                    <div className="chatWindow">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                <p>{msg.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="inputContainer">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button onClick={handleSend} className="sendButton">Send</button>
                    </div>
                    <div className="buttonContainer">
                        <button onClick={handleMinimize} className="removeButton">Remove</button>
                        <button onClick={handleOpen} className="openButton">Open Chat</button>
                    </div>
                </div>
            )}
        </motion.div>
    </Draggable>
      }
      

      {/* --------------------- */}
      <div className="sidePage">
        <div className="s1">
          {forAdmin && (
            <>
              <p className="mainPara">Admin</p>
              <p className="normalPara">
                <Link to="/addNewBook">Add New Book</Link>
              </p>
              <p className="normalPara">Create Coupon</p>
            </>
          )}

          <p className="mainPara">Account</p>
          <>
            <p
              className="normalPara"
              onClick={() => setEditAcPopUp((prev) => !prev)}
            >
              Edit Account
            </p>{" "}
            <p className="normalPara">Share Account</p>
          </>
          <p className="normalPara" onClick={()=>setChatBot((prev)=>!prev)}>ChatBot</p>
          <p className="normalPara">Explore</p>
          <p className="mainPara">Settings</p>
          <p className="normalPara">Change Theme</p>
          <p className="normalPara">Two Factor Privacy</p>
          <p className="normalPara">Change Password</p>
        </div>
        <div className="s2">
          {forAdmin ? (
            <p className="p" onClick={() => setRemovedAcPopUp(true)}>
              Remove Admin Account
            </p>
          ) : (
            <p className="p" onClick={() => setAdminPopUp((prev) => !prev)}>
              Want to became an admin ?
            </p>
          )}

          <p className="btn" onClick={() => setDeletePopUp(true)}>
            Delete Account
          </p>
        </div>
      </div>
      <div className="maindiv">
        <div className="nav">
          <div className="user">
            <div className="img">
              <img src={redBookUser && redBookUser.userProfileImg} alt="" />
            </div>
            <div className="details">
              <h3>{redBookUser && redBookUser.fullName}</h3>
              <p>@{redBookUser && redBookUser.username}</p>
              <p>
                <span>{redBookUser && redBookUser.userDescription}.</span>
              </p>
              <p>
                <span className="authorType">
                  {redBookUser.admin && redBookUser.authorType.toUpperCase()}
                </span>
              </p>
            </div>
          </div>
          <div className="notifications">
            <p>Notification</p>
            <p
              className="logout"
              onClick={() => setLogOutPopUp((prev) => !prev)}
            >
              Logout
            </p>
          </div>
        </div>

        <div className="body">
          <div className="persnol">
            <div>
              <h2>Followers {redBookUser && redBookUser.followers.length}</h2>
            </div>
            <div>
              <h2>Following {redBookUser && redBookUser.following.length}</h2>
            </div>
            {redBookUser.admin && (
              <div
                style={{ borderBottomStyle: userPostsC && "groove" }}
                onClick={() => {
                  setUserPostsC(true);
                  setUserWishListC(false);
                  setUserCartC(false);
                }}
              >
                <h2>Posted Books : {rbUserPosts.length}</h2>
              </div>
            )}
            <div
              style={{ borderBottomStyle: userCartC && "groove" }}
              onClick={() => {
                setUserCartC(true);
                setUserWishListC(false);
                setUserPostsC(false);
              }}
            >
              <h2>Cart Items {redBookUser && redBookUser.cart.length}</h2>
            </div>
            <div
              style={{ borderBottomStyle: userWishListC && "groove" }}
              onClick={() => {
                setUserWishListC(true);
                setUserCartC(false);
                setUserPostsC(false);
              }}
            >
              <h2>Wishlist</h2>
            </div>
          </div>
          <div className="postContainer">
            {userCartC && <Cart />}
            {userPostsC && <UserPost></UserPost>}
            {userWishListC && <Wishlist redBookUser={redBookUser}></Wishlist>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Admin;
