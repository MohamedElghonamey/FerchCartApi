import React from "react";
import styles from "./MainSlider.css";
import Slider from "react-slick";
export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <section className="{styles.MainSlider} py-3">
      <div className="container">
        <div className="row g-0">
          <div className="col-md-9">
            <Slider {...settings}>
              <figure>
                <img
                  src={require("../Assets/images/slider-image-1.jpeg")}
                  alt=""
                  style={{ width: "100%", height: "400px" }}
                />
              </figure>
              <figure>
                <img
                  src={require("../Assets/images/slider-image-2.jpeg")}
                  alt=""
                  style={{ width: "100%", height: "400px" }}
                />
              </figure>
              <figure>
                <img
                  src={require("../Assets/images/slider-image-3.jpeg")}
                  alt=""
                  style={{ width: "100%", height: "400px" }}
                />
              </figure>
            </Slider>
          </div>
          <div className="col-md-3">
            <figure className="mb-0">
              <img
                src={require("../Assets/images/grocery-banner.png")}
                alt=""
                style={{ width: "100%", height: "200px" }}
              />
            </figure>
            <figure>
              <img
                src={require("../Assets/images/grocery-banner-2.jpeg")}
                alt=""
                style={{ width: "100%", height: "200px" }}
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
