import React from "react";
import styles from "./Footer.css";
export default function Footer() {
  return (
    <footer className=" bottom-0  text-white bg-main py-5">
      <div className="container">
        <div className="row">
          <h3 className="text-start p-3">Get The FreshCart App </h3>
          <p className="text-start p-2">
            We Will Send You A Link ,Open it on Your Phone To Download The App
          </p>
          <div className="col-md-9 p-2">
            <input
              type="search"
              name="search"
              id="search"
              className="form-control d-grid  "
            />
          </div>
          <div className="col-md-3 p-2">
            <button className="btn btn-success d-grid">Share App Link</button>
          </div>
          <div className="row">
            <div className="col-md-4  d-flex">
              <p className="text-start p-2">Payment Partners</p>
              <img
                src={require("../Assets/images/download.png")}
                alt="amazon"
                className="img"
              />
              <img
                src={require("../Assets/images/emblem-Paypal.jpg")}
                alt="PayPal"
                className="img1"
              />
              <img
                src={require("../Assets/images/MasterCard_Logo.svg.png")}
                alt=""
                className="img2"
              />
            </div>
            <div className="col-md-5 d-flex justify-content-between align-items-center">
              <p className=" py-2">Get deliveries with FreshCart</p>
              <img
                src={require("../Assets/images/apple-app-store-logo.jpg")}
                className="img3 m-2"
                alt="PlayStore"
              />
              <img
                src={require("../Assets/images/google-play-badge-english-get-it-on-google-play7825.logowik.com.webp")}
                alt="Google Play"
                className="img4"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
