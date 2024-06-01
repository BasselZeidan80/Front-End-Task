import React, { useState } from "react";
import "./Regester.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function Login() {
  const [loginError, setLoginError] = useState();
  let navigate = useNavigate();
  const myValidationSchema = Yup.object({
    email: Yup.string().email("Invalid Format.").required("Email is Required"),
    Password: Yup.string()
      .matches(/^(?=.*\S).{9,}$/, "Must be 8 or more characters.")
      .required("Password Required"),
  });

  function callLogin(values) {
    console.log(values);
    const storedData = JSON.parse(localStorage.getItem("formData"));
    console.log(storedData);
    if (
      storedData &&
      storedData.email === values.email &&
      storedData.password === values.password
    ) {
      console.log("Login successful");
      navigate("/home");
    } else {
      setLoginError("Invalid email or password");

      console.log("Invalid email or password");
    }
  }
  const LoginForm = useFormik({
    initialValues: {
      email: "",
      Password: "",
    },
    onSubmit: callLogin,
    validationSchema: myValidationSchema,
  });

  return (
    <>
      <div className="container d-flex align-items-center justify-content-center  vh-100 my-4">
        <div className=" mx-auto formParent ">
          <h2 className="mb-2">Sign in</h2>

          {loginError && (
            <div className="alertMsgE d-flex align-items-center justify-content-center mb-2">
              <p className="alertMsg align-self-center mt-3">{loginError}</p>
            </div>
          )}

          <form onSubmit={LoginForm.handleSubmit}>
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
                value={LoginForm.values.email}
                onChange={LoginForm.handleChange}
                onBlur={LoginForm.handleBlur}
              />
              {LoginForm.errors.email && LoginForm.touched.email ? (
                <p className="alertMsg">{LoginForm.errors.email}</p>
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
                value={LoginForm.values.Password}
                onChange={LoginForm.handleChange}
                onBlur={LoginForm.handleBlur}
              />
              {LoginForm.errors.Password && LoginForm.touched.Password ? (
                <p className="alertMsg">{LoginForm.errors.Password}</p>
              ) : null}
            </div>
            <button className="w-100 SubBtn ">Submit</button>
            <div className=" lines mt-4  ">
              <div className="cstOr px-2">OR</div>
            </div>
            <div className="footer mt-3 d-flex align-items-center justify-content-center">
              <p>
                Don't have account? <Link to="/Register">Signup</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
