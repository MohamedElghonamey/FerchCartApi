import React, { useContext, useEffect, useState } from "react";
import styles from "./FeaturedProducts.css";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";

export default function FeaturedProducts() {
  const { addToCart } = useContext(CartContext);
  async function addProductToCart(id) {
    const res = await addToCart(id);
    console.log(res, "res");
    if (res.status === "success") {
      toast.success(res.message, {
        theme: "dark",
      });
    } else {
      toast.error(res.message, {
        theme: "dark",
      });
    }
  }

  async function getProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const { isError, error, isLoading, data } = useQuery("products", getProducts);
  return (
    <>
      <section className={styles.FeaturedProduct}>
        {isLoading && <Loading />}
        {isError && <div className="alert alert-danger">{error}</div>}
        {data?.data.data && (
          <div className="container g-1 ">
            <h2 className="text-center py-2">Featured Products</h2>
            <div className="row">
              {data.data.data.map((product) => (
                <div className="col-md-2 border-2">
                  <div className="product mb-3 p-2">
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
                      </div>
                    </Link>
                    <i
                      onClick={(e) => {
                        addToCart(data.data.data._id);
                        e.target.classList.toggle("fa-regular");
                      }}
                      className={`check fa-solid fa-heart fs-5 `}
                    ></i>
                    <button
                      onClick={() => addProductToCart(product.id)}
                      className="btn btn-success  w-100 "
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
