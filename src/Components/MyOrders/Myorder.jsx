import React, { useContext, useEffect, useState } from "react";
import styles from "./MyOrders.css";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import * as yup from "yup";
import { jwtDecode } from "jwt-decode";
export default function OrderPayment() {
  const userId = jwtDecode(localStorage.getItem("userToken")).id;
  // const { id } = useContext(AuthContext);
  const [orders, setOrders] = useState();
  async function getMyOrders() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      console.log(data);
      if (data?.length) {
        setOrders(data);
        console.log(orders);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(function () {
    getMyOrders();
  }, []);

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center text-success">My Orders</h2>
        {orders? (
          orders.map((order) => (
            <div className="row">
              {order.cartItems.map((item) => (
                <div className="col-md-2 py-2 ">
                  <div>
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-100 mb-2"
                    />
                  </div>
                  <div className="col-md-9 d-flex justify-content-between align-items-center">
                    <h3 className="h6 text-success fw-light mb-2">
                      {item.product.category.name}
                    </h3>
                  </div>
                  <div className="d-flex  justify-content-between mb-2">
                    <h4 className="h6 text-black fw-light">{item.price} EGP</h4>
                    <h4 className="h6 fw-light">
                      <i className="fa-solid fa-star text-warning small ">
                        {item.product.ratingsAverage}
                      </i>
                    </h4>
                  </div>
                </div>
              ))}

              <div className="row">
                <div className="col-md-12  d-flex justify-content-center">
                  <h5 className="text-success m-2">
                    <span className="text-black fw-bold "> your city :</span>
                    {order.shippingAddress.city}
                  </h5>
                  <h5 className="text-success m-2">
                    <span className="text-black fw-bold">your address :</span>
                    {order.shippingAddress.details}
                  </h5>

                  <h5 className="text-success m-2">
                    <span className="text-black fw-bold">your phone :</span>
                    {order.shippingAddress.phone}
                  </h5>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2 className="alert alert-danger">No Orders Found</h2>
        )}
      </div>
    </section>
  );
}
