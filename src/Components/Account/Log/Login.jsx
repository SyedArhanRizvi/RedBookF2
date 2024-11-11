import React, { useEffect, useState } from 'react'
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  const loginHandler = async (e)=>{
    e.preventDefault();
    try {
      const loggedInUser = await axios.post("http://localhost:3500/api/user/loginAccount", {email,password}, { withCredentials: true });
      localStorage.setItem("REDBOOK_User", JSON.stringify(loggedInUser.data.user));
      console.log(loggedInUser.data.user);
      
      if(loggedInUser.status === 200) {
        navigate("/adminPage");
      }
    } catch (error) {
      console.log("There is some errors in your login handler plz fix the bug first ", error); 
    }
    
  }

  return (
    <section className='logInPage'>
      <div className='greet'>
        <h1>Login to your account</h1>
        <p><span>Welcome to Redbook!</span> Log in to explore a world of books, save your favorites, and dive into a personalized reading experience.</p>
      </div>
      <div className='formParent'>
        <div className="form">
          <form onSubmit={loginHandler}>
            <input type="text" name='email' placeholder='Enter your email here..' onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" name='password' placeholder='Enter your password here..' onChange={(e)=>setPassword(e.target.value)}/>
            <input type="submit" value={"Login"} className='btn'/>
          </form>
        </div>
        <p className='or'>or</p>
        <div className="additionalForm">
            <p className='g'>Continue With <span>Google</span></p>
            <p className='f'>Continue With <span>Facebook</span></p>
            <p className='a'>Continue With <span>Apple Id</span></p>
        </div>
      </div>
      <div className="others">
        <p>Forgotten Password</p>
        <p><Link to={"/createNewAc"}>Create New Account</Link></p>
      </div>
    </section>
  )
}

export default Login
