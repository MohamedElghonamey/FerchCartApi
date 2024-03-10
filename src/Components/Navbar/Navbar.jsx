import React, { useContext } from "react";
import styles from "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";
export default function Navbar() {
  const { userToken, setUserToken } = useContext(AuthContext);
  const { numOfCartItems  } = useContext(CartContext);
  function handleLogout() {
    setUserToken(null);
    localStorage.removeItem("token");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black  text-white  ">
        <div className="container">
          <Link className="navbar-brand fw-bold " to="/">
            <i class="fa-solid fa-cart-shopping"></i>
            FreshCart
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userToken && (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/products">
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/categories">
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/wishList">
                    wishList
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/brands">
                    Brands
                  </NavLink>
                </li>
                <li className="nav-item position-relative">
                  <NavLink className="nav-link" to="/cart">
                    Cart
                    <span class="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-success">
                      <span class="visually-hidden">unread messages</span>
                      {numOfCartItems}
                    </span>
                  </NavLink>
                </li>
              </ul>
            )}

            <ul className="navbar-nav me-auto mb-2 mb-lg-0 m-2  align-items-center">
              <div className="d-flex justify-content-center">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
                  <li className="text-dark ">
                    <a
                      className="mx-2 text-white"
                      href="https://www.facebook.com"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <i className="fab fa-facebook" target="_blank"></i>
                    </a>
                  </li>
                  <li className="text-white ">
                    <a
                      className="mx-2 text-white"
                      href="https://www.twitter.com"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li className="text-dark ">
                    <a
                      className="mx-2 text-white"
                      href="https://www.instagram.com"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li className="text-dark ">
                    <a
                      className="mx-2 text-white"
                      href="https://www.github.com"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <i className="fab fa-github"></i>
                    </a>
                  </li>
                </ul>
              </div>
              {userToken ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link " to="/allOrders">
                      All-Orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
