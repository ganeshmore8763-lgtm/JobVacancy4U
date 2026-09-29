import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* =================================
            WEBSITE
        ================================= */}

        <div className="footer-column">

          <h2>Job Vacancy For You</h2>

          <p>
            Find the latest Government, Private,
            IT, Engineering and other career
            opportunities in one place.
          </p>

        </div>


        {/* =================================
            QUICK LINKS
        ================================= */}

        <div className="footer-column">

          <h3>Quick Links</h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/jobs">
            Jobs
          </Link>

          <Link to="/admit-card">
            Admit Card
          </Link>

          <Link to="/about">
            About Us
          </Link>

        </div>


        {/* =================================
            SOCIAL MEDIA
        ================================= */}

        <div className="footer-column">

          <h3>Connect With Us</h3>

          <div className="social-links">

            {/* WhatsApp */}

            <a
              href="https://whatsapp.com/channel/0029Vb8lgPyIt5s5mtYLeZ0D"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link whatsapp"
            >
              <span>💬</span>
              WhatsApp
            </a>


            {/* Instagram */}

            <a
              href="https://www.instagram.com/jobvacancy4u?stkn=MWtjN3h6NjNkenFwcQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="social-link instagram"
            >
              <span>📷</span>
              Instagram
            </a>


            {/* YouTube */}

            <a
              href="https://youtube.com/@jobvacancy4u?si=M_ib6ckDtvccvrIF"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link youtube"
            >
              <span>▶️</span>
              YouTube
            </a>

          </div>

        </div>

      </div>


      {/* =================================
          BOTTOM
      ================================= */}

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Job Vacancy For You.
          All Rights Reserved.
        </p>

        <p>
          Managed by Anand Kumar | Developed by Ganesh More
        </p>

      </div>

    </footer>
  );
}

export default Footer;