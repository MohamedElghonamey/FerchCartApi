import React, { useContext, useState } from "react";
import styles from "./Login.css";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import {Link} from 'react-router-dom';
export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUserToken } = useContext(AuthContext);
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object({
    email: yup.string().email().required("email is required"),

    password: yup.string().required("password is required"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: (values) => handleLogin(values),
  });

  async function handleLogin(values) {
    setIsLoading(true);
    console.log(values);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
        if (res.data.message == "success") {
          setIsLoading(false);
          setError(null);
          navigate("/");
          localStorage.setItem("token", res.data.token);
          setUserToken(res.data.token);
          console.log(res.data.token);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        setIsLoading(false);
      });
  }
  return (
    <section>
      <div className="container">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={formik.handleSubmit} className="w-75 py-5">
          <h1>Login in</h1>

          <div className="mb-2">
            <label htmlFor="email" className="form-label">
              Email :
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              placeholder="Enter Your Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <span className="text-danger mt-2">{formik.errors.email}</span>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="form-label">
              Password :
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="Enter Your Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />

            {formik.errors.password && formik.touched.password && (
              <span className="text-danger mt-2">{formik.errors.password}</span>
            )}
          </div>
          <Link to="/forgetpassword">
            <p>forget your password ?</p>
          </Link>

          <button
            type="submit"
            className="btn btn-success"
            disabled={!(formik.isValid && formik.dirty)}
          >
            {isLoading ? "Loading..." : "Login Now"}
          </button>
        </form>
      </div>
    </section>
  );
}
