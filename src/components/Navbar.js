import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const [menuOpen, setMenuOpen] =
    useState(false);


  const closeMenu = () => {
    setMenuOpen(false);
  };


  return (

    <header className="navbar">


      {/* TITLE */}

      <div className="title-section">

      

        <img
          src="/logo.png"
          alt="Job Vacancy 4u Logo"
          className="website-logo"
        />

      </div>


      {/* MENU */}

      <div className="menu-section">

        <button
          className="menu-button"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          ☰
        </button>


        <nav
          className={
            menuOpen
              ? "nav-open"
              : ""
          }
        >

          <Link
            to="/"
            onClick={closeMenu}
          >
            Home
          </Link>


          <Link
            to="/jobs"
            onClick={closeMenu}
          >
            Jobs
          </Link>


          <Link
            to="/admit-card"
            onClick={closeMenu}
          >
            Admit Card
          </Link>


          <Link
            to="/about"
            onClick={closeMenu}
          >
            About
          </Link>


          

        </nav>

      </div>

    </header>

  );

}

export default Navbar;