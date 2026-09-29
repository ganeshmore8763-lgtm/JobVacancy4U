import { useEffect, useState } from "react";
import {  Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Jobs.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

 

  // ==========================================
  // CHECK ADMIN LOGIN
  // ==========================================


  // ==========================================
  // FETCH JOBS
  // ==========================================
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching jobs:", error);
    } else {
      setJobs(data || []);
    }

    setLoading(false);
  };

  return (
    <main className="home-page">

      

      {/* ======================================
          HERO SECTION
      ====================================== */}
      <section className="hero-section">

        <h1>Latest Job Vacancies</h1>

        <p>
          Find the latest Government, Private, IT,
          Engineering and other job opportunities.
        </p>

      </section>

      {/* ======================================
          JOB SECTION
      ====================================== */}
      <section className="jobs-section">

        <div className="section-title">

          <h2>Latest Jobs</h2>

          <span>
            {jobs.length} Jobs
          </span>

        </div>

        {/* ====================================
            LOADING
        ==================================== */}
        {loading ? (

          <p className="loading">
            Loading jobs...
          </p>

        ) : jobs.length === 0 ? (

          /* ====================================
             NO JOBS
          ==================================== */
          <div className="no-jobs">

            <h3>
              No jobs available
            </h3>

            <p>
              New job vacancies will appear here.
            </p>

          </div>

        ) : (

          /* ====================================
             JOB GRID
          ==================================== */
          <div className="jobs-grid">

            {jobs.map((job) => (

              <div
                className="job-card"
                key={job.id}
              >

                {/* CATEGORY */}
                <div className="job-category">
                  {job.job_category ||
                    "Job"}
                </div>

                {/* TITLE */}
                <h2>
                  {job.job_title ||
                    "Job Title Not Specified"}
                </h2>

                {/* COMPANY */}
                <p className="company-name">
                  🏢{" "}
                  {job.company_name ||
                    "Company Not Specified"}
                </p>

                {/* BASIC DETAILS */}
                <div className="job-info">

                  <span>
                    📍{" "}
                    {job.location ||
                      "Location Not Specified"}
                  </span>

                  <span>
                    💼{" "}
                    {job.employment_type ||
                      "Not Specified"}
                  </span>

                  <span>
                    🏠{" "}
                    {job.work_mode ||
                      "Not Specified"}
                  </span>

                  <span>
                    👥{" "}
                    {job.vacancies ||
                      "Not Specified"}{" "}
                    Vacancies
                  </span>

                </div>

                {/* ELIGIBILITY */}
                <div className="job-details">

                  <p>
                    <strong>
                      Qualification:
                    </strong>{" "}
                    {job.qualification ||
                      "Not specified"}
                  </p>

                  <p>
                    <strong>
                      Experience:
                    </strong>{" "}

                    {job.min_experience ||
                    job.max_experience
                      ? `${job.min_experience || 0} - ${
                          job.max_experience || 0
                        } Years`
                      : "Not specified"}
                  </p>

                  <p>
                    <strong>
                      Last Date:
                    </strong>{" "}

                    {job.last_date ||
                      "Not specified"}
                  </p>

                </div>

                {/* SALARY */}
                {(job.min_salary ||
                  job.max_salary) && (

                  <div className="salary">

                    💰 ₹
                    {job.min_salary || 0}
                    {" - "}
                    ₹
                    {job.max_salary || 0}

                    {job.salary_period && (
                      <span>
                        {" / "}
                        {job.salary_period}
                      </span>
                    )}

                  </div>
                )}

                {/* BUTTONS */}
                <div className="job-buttons">

                  {/* VIEW DETAILS */}
                  <Link
                    to={`/jobs/${job.id}`}
                    className="details-button"
                  >
                    View Details
                  </Link>

                  {/* APPLY */}
                  {job.apply_link ? (

                    <a
                      href={job.apply_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="apply-button"
                    >
                      Apply Now
                    </a>

                  ) : (

                    <span className="apply-button disabled-button">
                      Apply Not Available
                    </span>

                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}

export default Jobs;