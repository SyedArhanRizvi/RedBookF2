import React, { useState } from 'react';
import "./CreateNewAc.css";
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

function CreateNewAc() {
    const navigate = useNavigate();
    {/* fullName,username,email,phone,password */}
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState();
    const [password,  setPassword] = useState('');

    const newAccountHandler = async (e)=>{
        e.preventDefault();
        try {
          const createdUser =  await axios.post("http://localhost:3500/api/user/createUserAccount", {fullName,username,email,phone,password}, { withCredentials: true });
          localStorage.setItem("REDBOOK_User", JSON.stringify(createdUser.data.createdUser));
          console.log(createdUser.data.createdUser);
          setFullName('');
          setUsername('');
          setEmail('');
          setPassword('');
          setPhone('');

          if(createdUser.status === 201) {
            navigate("/adminPage")
          }
        } catch (error) {
           console.log("There is some errors in your new account handler plz fix the bug first ", error);  
        }
    }
  return (
    <section className='createNewAc'>
      <div className="form">
        <div className="text">
            <p>START FOR FREE</p>
            <h1>Create new account.</h1>
            <p>Already A Member ? <Link to={"/logIn"}>Login</Link></p>
        </div>
        <form onSubmit={newAccountHandler}>
            <input type="text" name='fullName' value={fullName} placeholder='Enter your full name here..' onChange={(e)=>setFullName(e.target.value)} />
            <input type="text" name='username' value={username} placeholder='Enter your username here..' onChange={(e)=>setUsername(e.target.value)} />
            <input type="text" name='email' value={email} placeholder='Enter your email here..' onChange={(e)=>setEmail(e.target.value)} />
            <input type="number" name='phone' value={phone} placeholder='Enter your phone no. here ..' onChange={(e)=>setPhone(e.target.value)} />
            <input type="password" name='password' value={password} placeholder='Create your password here..' onChange={(e)=>setPassword(e.target.value)} />
            <input type="submit" value={"Create Account"} className='btn'/>
        </form>
      </div>
      <div className="empty">
        <h1>REDBOOK</h1>
      </div>
    </section>
  )
}

export default CreateNewAc
