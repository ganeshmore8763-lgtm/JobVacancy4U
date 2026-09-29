import "./About.css";
import { Link } from "react-router-dom";
function About() {
  return (
    <main className="about-page">

      {/* =================================
          HERO
      ================================= */}

      <section className="about-hero">

        <h1>About Job Vacancy For You</h1>

        <p>
          A simple platform to discover government,
          private, IT, engineering and other
          career opportunities.
        </p>

      </section>


      {/* =================================
          ABOUT + PURPOSE
      ================================= */}

      <section className="about-section">

        <div className="about-card">

          <h2>Who We Are</h2>

          <p>
            Job Vacancy For You is a job information
            platform created to help job seekers
            discover employment opportunities in
            one place.
          </p>

          <p>
            We provide information about government
            jobs, private jobs, IT jobs, engineering
            jobs, apprenticeships and other
            opportunities.
          </p>

        </div>


        <div className="about-card">

          <h2>Our Purpose</h2>

          <p>
            Our purpose is to make job searching
            easier, faster and more convenient for
            students, graduates and job seekers.
          </p>

          <p>
            Users can find job details, eligibility,
            important dates, notification links and
            application links in one place.
          </p>

        </div>

      </section>


      {/* =================================
          WHAT WE PROVIDE
      ================================= */}

      <section className="services-section">

        <h2>What We Provide</h2>

        <div className="services-grid">

          <div className="service-card">

            <div className="service-icon">
              🏛️
            </div>

            <h3>Government Jobs</h3>

            <p>
              Information about government
              recruitment and job opportunities.
            </p>

          </div>


          <div className="service-card">

            <div className="service-icon">
              💼
            </div>

            <h3>Private Jobs</h3>

            <p>
              Discover private-sector employment
              opportunities across different fields.
            </p>

          </div>


          <div className="service-card">

            <div className="service-icon">
              💻
            </div>

            <h3>IT Jobs</h3>

            <p>
              Explore opportunities in software,
              IT, computer science and technology.
            </p>

          </div>


          <div className="service-card">

            <div className="service-icon">
              🎓
            </div>

            <h3>Career Opportunities</h3>

            <p>
              Find suitable opportunities for
              graduates and job seekers.
            </p>

          </div>

        </div>

      </section>


      {/* =================================
          WHY USE OUR WEBSITE
      ================================= */}

      <section className="features-section">

        <h2>Why Use Our Website?</h2>

        <div className="features-list">

          <div className="feature">
            <span>✓</span>
            <p>Easy-to-use job search interface</p>
          </div>

          <div className="feature">
            <span>✓</span>
            <p>Job eligibility and vacancy information</p>
          </div>

          <div className="feature">
            <span>✓</span>
            <p>Important application dates</p>
          </div>

          <div className="feature">
            <span>✓</span>
            <p>Official notification links</p>
          </div>

          <div className="feature">
            <span>✓</span>
            <p>Direct application links</p>
          </div>

        </div>

      </section>


      {/* =================================
          ABOUT US / TEAM
      ================================= */}

      <section className="contact-section">

        <h2>About Us</h2>

        <p className="team-subtitle">
          The people behind Job Vacancy For You.
        </p>


        <div className="team-info">

          {/* ANAND */}

          <div className="team-member">

            <img
              src="/anand-kumar.jpeg"
              alt="Anand Kumar"
              className="team-photo"
            />

            <h3>Managed By</h3>

            <p>
              Anand Kumar
            </p>

          </div>


          {/* GANESH */}

          <div className="team-member">

            <img
              src="/Ganesh-More.JPEG"
              alt="Ganesh More"
              className="team-photo"
            />

            <h3>Developer</h3>

            <p>
              Ganesh More
            </p>

          </div>

        </div>

      </section>
{/* =================================
    ADMIN LOGIN
================================= */}

<section className="admin-login-section">

  <div className="admin-login-card">

    <div className="admin-login-icon">
      🔐
    </div>

    <div className="admin-login-content">

      <h2>Admin Login</h2>

      <p>
        Admin can login to manage job vacancies,
        add new jobs and manage website information.
      </p>

    </div>

    <Link
      to="/admin-login"
      className="about-admin-login-button"
    >
      Admin Login
    </Link>

  </div>

</section>

      {/* =================================
          DISCLAIMER
      ================================= */}

      <section className="disclaimer-section">

        <div className="disclaimer-card">

          <h2>Important Notice</h2>

          <p>
            Job Vacancy For You is an information
            platform. Job seekers should always
            verify recruitment details, eligibility
            criteria, dates, fees and other
            information from the official
            notification or official organization
            website before applying.
          </p>

          <p>
            We are not the recruiting organization
            unless explicitly stated on a particular
            job listing.
          </p>

        </div>

      </section>

    </main>
  );
}

export default About;