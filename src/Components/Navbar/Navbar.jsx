import React, { useEffect } from "react";
import "./Navbar.css";
import spaceImg from "../../assets/photos/image.png";
import { useUserProfile } from "../../Context/UserProfile/User";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const { name, setName } = useUserProfile();

  useEffect(() => {
    const formData = localStorage.getItem("formData");
    if (formData) {
      const parsedData = JSON.parse(formData);
      setName(parsedData.name);
    }
  }, []);

  let navigate = useNavigate();
  function logOut() {
    // localStorage.removeItem('formData')
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid mx-4">
          <div className="leftSide d-flex align-items-center justify-content-center">
            <div className="logo">
              <img
                className="navbar-brand w-100"
                src={spaceImg}
                alt="spaceImg"
              />
            </div>
            <p className="pt-3 ps-2">SPACEJAT</p>
          </div>

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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Hello {name}
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a onClick={logOut} className="dropdown-item">
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
