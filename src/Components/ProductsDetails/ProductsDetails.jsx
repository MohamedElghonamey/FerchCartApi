import React, { useContext } from "react";
import styles from "./ProductsDetails.css";
import { useQuery } from "react-query";
import Axios from "axios";
import Loading from "../Loading/Loading";
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
export default function ProductsDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  async function addProductToCart(id) {
    const res = await addToCart(id);
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

  async function getProductsDetails() {
    return await Axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    pauseOnDotsHover: true,
  };
  const { isError, error, isLoading, data } = useQuery(
    "productsDetails",
    getProductsDetails
  );

  return (
    <section>
      {isLoading &&   <Loading />}
      <div className="container">
        {isError && <div className="alert alert-danger">{error}</div>}
        <h2 className="text-center py-5">ProductsDetails</h2>
        {data?.data.data && (
          <div className="row align-items-center">
            <div className="col-md-3">
              <Slider {...settings}>
                {data.data.data.images.map((img) => (
                  <figure>
                    <img
                      className="img-fluid"
                      src={img}
                      alt={data.data.data.title}
                    />
                  </figure>
                ))}
              </Slider>
            </div>
            <div className="col-md-9">
              <h3> {data.data.data.title}</h3>
              <p className="text-muted"> {data.data.data.description}</p>
              <div className="d-flex  justify-content-between ">
                <div>
                  <h3 className="h6 text-black fw-light">
                    {data.data.data.category.name}
                  </h3>
                  <h3 className="h6 text-black fw-bold">
                    {data.data.data.price}
                    EGP
                  </h3>
                </div>
                <h4 className="h6 fw-light">
                  <i className="fa-solid fa-star text-warning small ">
                    {data.data.data.ratingsAverage}
                  </i>
                </h4>
                <i
                  onClick={(e) => {
                    addToCart(data.data.data._id);
                    e.target.classList.toggle("fa-regular");
                  }}
                  className={`check fa-solid fa-heart fs-5 `}
                ></i>
              </div>
              <button
                onClick={() => addProductToCart(id)}
                className="btn btn-success w-100"
              >
                Add To Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
