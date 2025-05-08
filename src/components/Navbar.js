import React, { useState } from 'react'
import { Link, useLocation } from "react-router-dom";

const Navbar = (props) => {
  let location = useLocation();
  const [country, setCountry] = useState('in')

  return (
    <>
      <div>
        <nav className={`navbar fixed-top navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
          <div className="container-fluid">
            <Link className="navbar-brand" to="/"> {props.title}</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/" ? 'active' : ""}`} aria-current="page" to="/">Home</Link>
                </li>
                <li><Link className={`nav-link ${location.pathname === "/business" ? 'active' : ""}`} to="/business">Business</Link></li>
                <li><Link className={`nav-link ${location.pathname === "/general" ? 'active' : ""}`} to="/general">General</Link></li>
                <li><Link className={`nav-link ${location.pathname === "/Entertainment" ? 'active' : ""}`} to="/entertainment">Entertainment</Link></li>
                <li><Link className={`nav-link ${location.pathname === "/health" ? 'active' : ""}`} to="/health">Health</Link></li>
                <li><Link className={`nav-link ${location.pathname === "/science" ? 'active' : ""}`} to="/science">Science</Link></li>
                <li><Link className={`nav-link ${location.pathname === "/sports" ? 'active' : ""}`} to="/sports">Sports</Link></li>
                <li><Link className={`nav-link ${location.pathname === "/technology" ? 'active' : ""}`} to="/technology">Technology</Link></li>

                <li>
                  <select
                    onChange={(e) => {
                      const selected = e.target.value;
                      setCountry(selected);
                      props.selectCountry(selected);
                    }}
                    value={country}
                    className={`form-select mt-1 mx-2`}
                    style={{
                      fontSize: '0.8rem',
                      color: props.mode === "dark" ? "white" : "#042743",
                      backgroundColor: props.mode === "dark" ? "#212529" : "white"
                    }}
                  >
                    {/* <option value="">Select Country</option> */}
                    <option value="in">India</option>
                    <option value="us">United States</option>
                  </select>
                </li>

              </ul>

              <div
                className={`form-check form-switch text-${props.mode === "light" ? "dark" : "light"}`}>
                <input onClick={props.toggleStyle}
                  className="form-check-input"
                  type="checkbox"
                  role="switch" id="flexSwitchCheckDefault"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Enable Dark Mode
                </label>
              </div>

            </div>

          </div>
        </nav >
      </div >


    </>
  )

}

export default Navbar
