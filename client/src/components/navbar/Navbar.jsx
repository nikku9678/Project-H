import { Link } from "react-router-dom";
import "./navbar.css";
import { useEffect, useState } from "react";
import logo from "../../assets/logo_circle.png";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { useNavigate } from "react-router-dom";

const rootURL = "/";

const Navbar = () => {

  const isHomePage = window.location.pathname === rootURL;


  const [currentPageLink, setCurrentPageLink] = useState("");
  const [hamburger, setHamburger] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    if (localStorage.getItem("userToken")) {
      localStorage.removeItem("userToken");
      window.location = "/login";
    }

    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      window.location = "/doctorLogin";
    }
  };

  const handleNavigate = () => {
    navigate("/");
    console.log("hello");
  };

  useEffect(() => {
    console.log("Hello0", window.location.pathname);

    setCurrentPageLink(window.location.pathname);
    if (currentPageLink === rootURL) {
      setShow(true);
    }
    console.log("cpl ", currentPageLink);
    console.log(typeof currentPageLink);
  }, []);

  // Check if either userToken or token is present
  const isUserLoggedIn = localStorage.getItem("userToken");
  const isDoctorLoggedIn = localStorage.getItem("token");

  return (
    <nav className="navbar-container">
      <div className="logo">
        <img src={logo} alt="Healer Ji" onClick={handleNavigate} />
        <h2 className="logo-title" onClick={handleNavigate}>
          Healer-Ji
        </h2>
      </div>
      <div className={`nav-links ${hamburger ? "active" : ""}`}>
        <ul className="nav-link-list">
          {isHomePage ? (
            <>
              <li>
                <ScrollLink
                  to="about-section"
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                  onClick={() => setHamburger(false)}
                >
                  About
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="services-section"
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                  onClick={() => setHamburger(false)}
                >
                  Services
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="contact-section"
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                  onClick={() => setHamburger(false)}
                >
                  Contact
                </ScrollLink>
              </li>
            </>
          ) : (
            <li>
              <Link to="/">Home</Link>
            </li>
          )}
        </ul>
        <ul className="nav-link-list">
          {isUserLoggedIn ? (
            <>
              <li>
                <Link to="/user/profile">Profile</Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </>
          ) : isDoctorLoggedIn ? (
            <>
              <li>
                  <Link to="/docHome">Profile</Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/adminLogin">Admin</Link>
              </li>
              <li>
                <Link to="/doctorLogin">Doctor</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div
        className={`nav-hamburger ${hamburger ? "active" : ""}`}
        onClick={() => setHamburger(!hamburger)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
