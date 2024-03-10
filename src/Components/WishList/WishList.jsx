import React from "react";
import { CartContext } from "../../Context/CartContext";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import style from "./Wishlist.css";
export default function Wishlist() {
  let { addToCart, getWishList, deleteWishList } = useContext(CartContext);
  const [data, setData] = useState([]);

  async function removeProduct(id) {
    const data = await deleteWishList(id);
    setData(data.data.data);
  }
  async function addProductToCart(id) {
    const { data } = await addToCart(id);
    if (data.status === "success") {
       toast.success("its has been added", {
         icon: <i className="fa-solid fa-cart-plus"></i>,
         
       });
      removeProduct(id);
    }
  }
  useEffect(() => {
    (async () => {
      const data = await getWishList();
      setData(data.data.data);
    })();
  }, []);
  return (
    <div className="container ">
      <div className="row ">
        <div className={`col-md-12 bg-main-light py-5  `}>
          <div className="d-flex justify-content-between my-3">
            <h2 className=" fw-bold fs-1 text-main"> My Wish List</h2>
          </div>
          {data.map((product, i) => {
            return (
              <div className="row border-bottom py-5">
                <div className="col-md-2">
                  <img src={product.imageCover} alt="title" className="w-100" />
                </div>
                <div className="col-md-10 d-flex align-items-center mt-5 justify-content-between">
                  <div>
                    <h5 className="fw-bold">{product.title}</h5>
                    <p className="fw-bold text-main m-3">
                      {product.price} <span className="text-muted">EGP</span>
                    </p>
                    <button
                      onClick={() => {
                        removeProduct(product._id);
                      }}
                      className="btn  text-danger"
                    >
                      <i className="fa-regular fa-trash-can text-danger"></i>
                      Remove
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        addProductToCart(product._id);
                      }}
                      className="btn btn-success text-light w-100"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
