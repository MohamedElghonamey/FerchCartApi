import React, { useContext, useEffect, useState } from "react";
import styles from "./Brands.css";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import { CartContext } from "../../Context/CartContext";
import Swal from "sweetalert2";
export default function Brands() {
  const { Brands } = useContext(CartContext);
  async function allBrands(id) {
    const { data } = await Brands(id);
    if (data._id !== "") {
      Swal.fire({
        title: `${data.data.name}`,
       
        showCloseButton: true,
        cancelButtonText: "close",
        showCancelButton: true,
        showConfirmButton: false,
        imageUrl: `${data.data.image}`,
        color: "#black",
      });
    }
    console.log(data);
  }

  async function getBrands() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  const { data, isLoading, isError, error } = useQuery("brands", getBrands);
  useEffect(() => {}, []);

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5 text-success">All-Brands</h2>
        <div className="row">
          {isLoading && !(<Loading />)}
          {isError && <div className="alert alert-danger">{error}</div>}
          {data &&
            data?.data.data.map((brand) => {
              return (
                <div
                  className="col-md-3 p-2 "
                  onClick={() => {
                    allBrands(brand._id);
                  }}
                >
                  <img
                    data-toggle="modal"
                  
                    src={brand.image}
                    className="w-100"
                    alt={brand.title}
                  />
                  <h5>{brand.name}</h5>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
