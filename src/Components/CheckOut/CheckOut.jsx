import React, { useState } from "react";
import styles from "./CheckOut.css";
import { CartContext } from "../../Context/CartContext";
import { useContext } from "react";
import { toast  } from "react-toastify";
import  axios  from "axios";
import { Navigate } from "react-router-dom";
import {useFormik} from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
   const { cartId,setNumOfCartItems } = useContext(CartContext);
   const [onLineShipping,setOnLineShipping]=useState(false);
 const navigate = useNavigate();
   const headers={
    token:localStorage.getItem("token"), 
}
    const initialValues={
        phone:'',
        city:'',
        details:''

    }
   const formik = useFormik({
       initialValues,
       validationSchema: yup.object({
           phone: yup.string().required(),
           city: yup.string().required(),
           details: yup.string().required()
       }),

       onSubmit: (values) =>  handlePayment(values)

          
       },

       
   );
  async function handlePayment(values){
       console.log(values , cartId);  

       const  endpoint = onLineShipping
       ?`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`
       :`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;
     try {
      const {data}=  await axios.post(endpoint,
            {"shippingAddress"  : values},
            {headers})
      console.log(data);
     
    if(data.status === "success"){
        if(onLineShipping){
          window.location.href=data.session.url;
        }
        else{
            console.log(data);
        toast.success("Payment Success" ,{theme:"dark"});
        setNumOfCartItems(0);
        setTimeout(()=>{
            navigate("/allorders");
        },5000);
        }
     
    }else{
        toast.error("Payment Fail" ,{theme:"dark"});
    }

     } catch (error) {
        console.log(error);
           
     }
   }
    
    return <>
    <section>
        <div className="container py-5">
            <h2 className="text-center fw-light ">CheckOut</h2>
          <form onSubmit={formik.handleSubmit}>

          <div className="form-group mt-3">
                <label htmlFor="phone">Phone</label>
                <input type="tel" className="form-control" id="phone" value={formik.values.phone}  onChange={formik.handleChange}/>
           </div>
           <div className="form-group mt-3">
                <label htmlFor="city">City</label>
                <input type="text" className="form-control" id="city"  value={formik.values.city} onChange={formik.handleChange}/>
           </div>
           <div className="form-group mt-3">
                <label htmlFor="details">Details</label>
                <textarea className="form-control" id="details" rows="3" col='30'  value={formik.values.details} onChange={formik.handleChange} >

                    </textarea>
           </div>
           <div className="d-flex align-items-center">
            <input type="checkbox" name="checkbox" id="checkbox" className="form-check-input m-2" onChange={()=>setOnLineShipping(!onLineShipping)}/>Online payement 
            {
               onLineShipping?<button type="submit"  className="btn btn-outline-success m-3">OnLine Payment</button>
               : <button type="submit" className="btn btn-outline-success m-3">Cash Payment</button>
            }
         
           </div>
          </form>
        </div>
    </section>
    </>
}