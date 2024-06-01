import React from "react";
import "./Regester.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function Register() {
  let navigate = useNavigate();
  const myValidationSchema = Yup.object({
    name: Yup.string()
      .matches(/^.{3,}$/, "Must be 3 or more characters")
      .required("Name is Required"),
    email: Yup.string().email("Invalid Format.").required("Email is Required"),
    Password: Yup.string()
      .matches(/^(?=.*\S).{9,}$/, "Must be 8 or more characters.")
      .required("Password Required"),
  });

  function callRegister(req) {
    console.log(req);
    localStorage.setItem("formData", JSON.stringify(req));
    navigate("/login");
  }
  const RegForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      Password: "",
    },
    onSubmit: callRegister,
    validationSchema: myValidationSchema,
  });

  return (
    <>
      <div className="container d-flex align-items-center justify-content-center  vh-100 my-4">
        <div className=" mx-auto formParent ">
          <h2 className="mb-2">Sign up</h2>
          <form onSubmit={RegForm.handleSubmit}>
            <div className="form-group">
              <label className="mb-1" htmlFor="Name">
                Name
              </label>
              <input
                type="text"
                id="Name"
                placeholder="Enter your name"
                name="name"
                className="form-control mb-3"
                value={RegForm.values.name}
                onChange={RegForm.handleChange}
                onBlur={RegForm.handleBlur}
              />
              {RegForm.errors.name && RegForm.touched.name ? (
                <p className="alertMsg">{RegForm.errors.name}</p>
              ) : null}
            </div>
            <div className="form-group">
              <label className="mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                name="email"
                className="form-control mb-3"
                value={RegForm.values.email}
                onChange={RegForm.handleChange}
                onBlur={RegForm.handleBlur}
              />
              {RegForm.errors.email && RegForm.touched.email ? (
                <p className="alertMsg">{RegForm.errors.email}</p>
              ) : null}
            </div>
            <div className="form-group">
              <label className="mb-1" htmlFor="Name">
                Password
              </label>
              <input
                type="Password"
                id="Password"
                placeholder="Enter your password"
                name="Password"
                className="form-control mb-3"
                value={RegForm.values.Password}
                onChange={RegForm.handleChange}
                onBlur={RegForm.handleBlur}
              />
              {RegForm.errors.Password && RegForm.touched.Password ? (
                <p className="alertMsg">{RegForm.errors.Password}</p>
              ) : null}
            </div>
            <button className="w-100 SubBtn ">Submit</button>
            <div className=" lines mt-4  ">
              <div className="cstOr px-2">OR</div>
            </div>
            <div className="footer mt-3 d-flex align-items-center justify-content-center">
              <p>
                Already have account? <Link to={"/login"}>Signin</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
