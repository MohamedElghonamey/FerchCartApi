import React, { useEffect, useState } from "react";
import styles from "./Register.css";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    Phone: "",
    password: "",
    rePassword: "",
  };
  const validationSchema = yup.object({
    name: yup.string().required().min(3).max(15),
    email: yup
      .string()
      .required("email is required")
      .email(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Invalid email address"),
    phone: yup
      .string()
      .required()
      .matches(/^(002)?01[0125][0-9]{8}$/i),
    password: yup.string().required().min(8),
    rePassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")]),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
  
    onSubmit: (values) => handleRegister(values),

  });
  function handleValdiate(values) {
    let errors = {};

    if (!values.name) {
      errors.name = "name is Required";
    } else if (values.name.length < 3) {
      errors.name = "name is too short";
    } else if (values.name.length > 15) {
      errors.name = "name is too long";
    }

    if (!values.email) {
      errors.email = "email is Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.phone) {
      errors.phone = "Phone is Required";
    } else if (!/^(002)?01[0125][0-9]{8}$/i.test(values.phone)) {
      errors.phone = "Invalid phone number";
    }

    if (!values.password) {
      errors.password = "password is Required";
    } else if (values.password.length < 3) {
      errors.password = "password is too short";
    } else if (values.password.length > 15) {
      errors.password = "password is too long";
    } else if (values.password !== values.rePassword) {
      errors.rePassword = "password is not match";
    }

    if (!values.rePassword) {
      errors.rePassword = "rePassword is Required";
    } else if (values.password !== values.rePassword) {
      errors.rePassword = "password is not match";
    }
    return errors;
  }
  async function handleRegister(values) {
    setIsLoading(true);
    console.log(values);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((res) => {
        if (res.data.message == "success") {
          setIsLoading(false);
          setError(null);
          navigate("/login");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        setIsLoading(false);
      });
  }
  useEffect(() => {
    document.title = "Register Now";
  },[])
  return (
    <section>
      <div className="container">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={formik.handleSubmit} className="w-75 py-5">
          <h1>Register Now</h1>

          <div className="mb-2">
            <label htmlFor="name" className="form-label">
              Name :
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              placeholder="Enter Your Name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name && (
              <span className="text-danger mt-2">{formik.errors.name}</span>
            )}
          </div>
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
            <label htmlFor="Phone" className="form-label">
              Phone :
            </label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              id="phone"
              placeholder="Enter Your Phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone && (
              <span className="text-danger mt-2">{formik.errors.phone}</span>
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
          <div className="mb-2">
            <label htmlFor="rePassword" className="form-label">
              Confirm Password :
            </label>
            <input
              type="Password"
              name="rePassword"
              className="form-control"
              id="rePassword"
              placeholder="Enter Your RePassword"
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              onBlur={formik.handleBlur}
            />
            {formik.errors.rePassword && formik.touched.rePassword && (
              <span className="text-danger mt-2">
                {formik.errors.rePassword}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-success"
            disabled={!(formik.isValid && formik.dirty)}
          >
            {isLoading ? "Loading..." : "Register Now"}
          </button>
        </form>
      </div>
    </section>
  );
}
