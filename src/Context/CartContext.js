import { createContext, useState } from "react";
import  axios  from "axios";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export  const CartContext =  createContext() ;


export default function CartProvider({children}) {
const endpoint=`https://ecommerce.routemisr.com/api/v1/cart`;
   const {userToken}= useContext(AuthContext);
   const headers={
    token:userToken, 
}
  const [numOfCartItems,setNumOfCartItems] =useState(0);
  const [cartId,setCartId] =useState(null);


     function Brands(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`,
    {
        productId:id
    },{
headers
    }
    )
 }
    
    
    
    
    async function addToCart(productId) {
        try {
        const {data} =   await axios.post(endpoint, {
                productId,


            },{
                headers,
            });
            console.log(data ,"data");
        setNumOfCartItems(data.numOfCartItems);
            return data;
        }
        catch (error) {
            console.log(error)
        }
    }
    async function getCart() {
     try {
        const {data}=   await axios.get(endpoint,{headers});
        setNumOfCartItems(data.numOfCartItems);
        console.log(data.data._id);
        setCartId(data.data._id);
       
      return data;
     } catch (error) {
        console.log(error);
     }
    }
    
    async function deleteFromCart(id) {
        try {
          const {data}=  await axios.delete(`${endpoint}/${id}`,
          {headers});
          setNumOfCartItems(0);
          return data; 
        }
        catch (error) {
            
        }
    }
    async function clearCart() {
        try {
            const {data}=  await axios.delete(`${endpoint}`,
            {headers});
            setNumOfCartItems(data.numOfCartItems);
            return data; 
        }
        catch (error) {
            
        }
    }

    async function updateQuantity(id,count) {
       try {
        const {data} =await axios.put(
    `${endpoint}/${id}`,
       {count},
       {headers});
       setNumOfCartItems(data.numOfCartItems);
       return data;
       } catch (error) {
        console.log(error);
        
       }

        
    }



function addList(id){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    {
        productId:id
        },
        {headers}
    )
    }
    function getWishList(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    {
    headers
    }
    )
    }


     function deleteWishList(id,count){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
    {
headers
    }
    )
 }









   return <CartContext.Provider value={{numOfCartItems,addToCart,getCart,deleteFromCart,clearCart,updateQuantity,cartId,setNumOfCartItems,addList,getWishList,deleteWishList,Brands}}>
    {children}
    </CartContext.Provider>
    
}