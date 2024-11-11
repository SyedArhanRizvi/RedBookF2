import React, { useEffect } from 'react';
import "./Cart.css"
import axios from 'axios';

function Cart() {

  // const getAllCartProds = async ()=>{
  //   try {
  //     const cartProds = await axios.get()
  //   } catch (error) {
  //     console.log("There is some issus in your get all cart prod container plz fix the bug first ", error);
  //   }
  // }
  // useEffect(()=>{
  //   getAllCartProds();
  // }, []);
  return (
    <div className='cartContainer'>
      <h1>Hello this is cart container</h1>
    </div>
  )
}
export default Cart;