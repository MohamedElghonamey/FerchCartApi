import React, { useEffect } from "react";
import styles from "./CategoriesSlider.css";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import Slider from "react-slick";

export default function CategoriesSlider() {
 
  async function getCategories() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { isError, error, isLoading, data } = useQuery(
    "CategoriesSlider",
    getCategories
  );
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 5,
    arrows: false,
  };
  
  return (
    <section className={styles.CategoriesSlider}>
      <div className="container py-2 ">
      
       {
        isLoading && <Loading/>
       }
       {
        isError && <div className="alert alert-danger">{error}</div>
       }
       {
        data?.data.data && (
          <div className="row ">
            <Slider {...settings}>
           {
            data?.data.data.map((categories) => (
              <div className="col-md-2">
              <img src={categories.image} className="img-fluid" alt={categories.name}
              style={{ width: "100%", height: "200px" }} />
              <h3 className="h6">{categories.name}</h3>
            </div>
            ))}
           
           </Slider>
          </div>
        )
       }
      </div>
    </section>
  );
}
