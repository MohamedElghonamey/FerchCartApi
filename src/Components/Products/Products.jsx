import React, { useEffect, useContext, useState } from "react";
import styles from "./Products.css";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";

export default function Products() {
  const { addToCart } = useContext(CartContext);

  async function addProductToCart(id) {
    const data = await addToCart(id);
   
    if (data.status == "success") {
      toast.success(data.message, {
        theme: "dark",
      });
    } else {
      toast.error(data.message, {
        theme: "dark",
      });
    }
  }

  async function getProducts(id) {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  const { isError, error, isLoading, data } = useQuery("products", getProducts);
  return (
    <>
      <section className={styles.FeaturedProduct}>
        {isLoading && <Loading />}
        {isError && <div className="alert alert-danger">{error}</div>}
        {data?.data.data && (
          <div className="container ">
            <h2 className="text-center py-2 text-success">All-Products</h2>
            <div className="row">
              {data.data.data.map((product) => (
                <div key={product.id} className="col-md-3 border-2">
                  <div className="product  p-2 mt-2">
                    <Link
                      to={`/products-details/${product.id}`}
                      className="text-decoration-none"
                    >
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="img-fluid mb-2"
                      />
                      <h3 className="h6 text-success fw-light mb-2">
                        {product.category.name}
                      </h3>
                      <h3 className="h6 text-success fw-light text-truncate mb-2">
                        {product.title}
                      </h3>
                      <div className="d-flex  justify-content-between mb-2">
                        <h4 className="h6 text-black fw-light">
                          {product.price} EGP
                        </h4>
                        <h4 className="h6 fw-light">
                          <i className="fa-solid fa-star text-warning small ">
                            {product.ratingsAverage}
                          </i>
                        </h4>
                        <i
                          onClick={() => product.id}
                          className="fa-solid fa-heart ms-2"
                        ></i>
                      </div>
                    </Link>
                    <button
                      onClick={() => addProductToCart(product.id)}
                      className="btn btn-success w-100  "
                    >
                      Add To Card
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
