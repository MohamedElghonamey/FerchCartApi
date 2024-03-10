import React, { useEffect, useState } from "react";
import styles from "./Cart.css";
import { CartContext } from "../../Context/CartContext";
import { useContext } from "react";
import { toast  } from "react-toastify";
import  axios  from "axios";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Cart() {
  const { getCart ,numOfCartItems, deleteFromCart, clearCart,updateQuantity } = useContext(CartContext);
 const [cardDetails, setCardDetails] = useState(null);
 async function getCartDetails() {
  const data=  await getCart();
  setCardDetails(data);
  // console.log(data);
  }
  async function removeCart(id){
   const data= await deleteFromCart(id);
   if(data.status=="success"){
    setCardDetails(data);
  toast.success ("removed from cart",{theme:"dark"});
   }
  else{
    setCardDetails(null);
  toast.error("error removing from cart",{theme:"dark"}
  );
  }
  }
  async function clearCartDetails(){
    const data= await clearCart();
    if(data.message=="success"){
      setCardDetails(null);
      toast.success ("cart removed",{theme:"dark"});
     

    }
    else{
      toast.error("error removing from cart",{theme:"dark"});
    }
  }
  
  async function updateCart(id,Count){
   const data= await updateQuantity(id,Count);
   if(data.status=="success"){
    setCardDetails(data);
  toast.success ("updated from cart",{theme:"dark"});
   }
  else{
  toast.error("error updating from cart",{theme:"dark"});
  }
  }

  useEffect(() => {
    getCartDetails();
  },[]);
  console.log(cardDetails);
  return (
  <section className="py-5 my-5">
 <div className="container">
  <h2 className="">Shopping Cart</h2>
  {
    cardDetails &&
    
    <section  className="p-5" style={{backgroundColor:"#f2f2f2"}}>
      <button onClick={clearCartDetails} className="btn btn-outline-danger btn-sm mb-5 d-block ms-auto">Clear Cart</button>
<div className="d-flex justify-content-between mb-3">
  <h3 className="h6">Total price <span className="text-success">{cardDetails.data.totalCartPrice}</span></h3>
  <h3 className="h6">Total items <span className="text-success">{numOfCartItems}</span></h3>
  </div>
  {
    cardDetails.data.products.map((product)=>(
      <div className="row border-bottom py-3 my-3">
    <div className="col-md-1">
      <figure>
        <img src={product.product.imageCover} className="img-fluid" alt={product.product.title} />
      </figure>
    </div>
    <div className="col-md-9">
      <h3 className="h6">{product.product.title}</h3>
      <h4 className="h6 text-success">{product.price}</h4>
      <button className="btn btn-outline-danger btn-sm my-2" onClick={()=>removeCart(product.product.id)}><i className="fa fa-trash me-2 "></i> Remove</button>
    </div>
    <div className="col-md-2">
      <button onClick={()=>updateCart(product.product.id ,product.count+1)} className="btn btn-outline-success ">+</button>
      <span className="mx-2">{product.count}</span>
      <button onClick={()=>updateCart(product.product.id ,product.count-1)} className="btn btn-outline-danger">-</button>
    </div>
  </div>

    ))
  }

  <Link to="/checkout" className="btn btn-success w-100">Checkout</Link>
 
</section>
  }

 
 </div>
  </section>
);}
