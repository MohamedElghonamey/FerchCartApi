import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-toastify";

export default function ResetPassword() {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("This email is required")
      .email("enter availd email"),
    newPassword: Yup.string().required("This newpassword is required"),
  });

  async function ResetPassword(values) {
    const { data } = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      values
    );

    if (data !== "") {
      navigate("/signin");
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: ResetPassword,
  });
  return (
    <div className=" container mt-5 pt-5">
      <h1 className="text-main text-center my-5">Reset Password Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="row  gy-4">
          <div className="col-md-8 m-auto bg-light p-5">
            <div className="row">
              <div className="col-md-12">
                <label htmlFor="userEmail" className="text-main pt-3">
                  email
                </label>
                <input
                  type="email"
                  id="userEmail"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  className="form-control"
                ></input>
              </div>
              {formik.errors.email && formik.touched.email ? (
                <p className="text-danger">{formik.errors.email}</p>
              ) : (
                ""
              )}
              <div className="col-md-12">
                <label htmlFor="newPassword" className="text-main pt-3">
                  newPassword
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-control"
                ></input>
              </div>
              {formik.errors.newPassword && formik.touched.newPassword ? (
                <p className="text-danger">{formik.errors.newPassword}</p>
              ) : (
                ""
              )}
              <div className="col-md-12 text-center m-3">
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="btn bg-main text-light"
                >
                  ResetPassword
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
