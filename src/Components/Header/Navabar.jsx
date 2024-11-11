import React, {useEffect, useState} from 'react'
import "./Navabar.css";
import axios from "axios"
import {Link} from "react-router-dom"
import { useAppContext } from '../../../Context/userAuthContext';
import { useNavigate } from 'react-router-dom';

function Navabar() {
  const navigate = useNavigate();
  const {setUserAuth, userAuth} = useAppContext();
  const [loggedInUser, setLoggedInUser] = useState();
  
  
  useEffect(() => {
    const callAuthChecker = async () => {
      try {
        const userChecker = await axios.post("http://localhost:3500/api/user/userAuthChecker", {}, { withCredentials: true });
        await setLoggedInUser(userChecker.data.user);
        if(loggedInUser) {
          localStorage.setItem("REDBOOK_User", JSON.stringify(loggedInUser));
        }
        // console.log(userChecker.data.user);
        if (userChecker.status === 200) {
          setUserAuth(true);
        }
      } catch (error) {
        if (error.response && (error.response.status === 400 || error.response.status === 500)) {
          setUserAuth(false);
        }
        console.log("There is some error in your callAuthChecker function, please fix the bug first", error);
      }
    };

    callAuthChecker();
  }, [userAuth]);

  const userAccountHandler = ()=>{
    console.log(userAuth); 
    if(!userAuth) {
      navigate("/logIn")
    } else {
      navigate('/adminPage')
    }
  }
    
    
  return (
    <header>
      <nav>
        <div>
            <Link to="/"><h1>REDBOOK</h1></Link>
            <Link to="/mainSection"><h1>MENU</h1></Link>
        </div>
        <div>
            <h1 onClick={userAccountHandler}>ACCOUNT</h1>
        </div>
      </nav>
    </header>
  )
}

export default Navabar
