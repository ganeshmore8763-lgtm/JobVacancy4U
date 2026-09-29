import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./JobDetails.css";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // CHECK ADMIN LOGIN
  // ==========================================
 

  // ==========================================
  // FETCH JOB
  // ==========================================
  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching job:", error);
        setJob(null);
      } else {
        setJob(data);
      }

      setLoading(false);
    };

    fetchJob();
  }, [id]);

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="job-details-loading">
        Loading job details...
      </div>
    );
  }

  // ==========================================
  // JOB NOT FOUND
  // ==========================================
  if (!job) {
    return (
      <div className="job-not-found">
        <h2>Job Not Found</h2>

        <p>
          This job vacancy is no longer available.
        </p>

        <button
          type="button"
          onClick={() => navigate("/jobs")}
          className="back-jobs-button"
        >
          ← Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <main className="job-details-page">

      {/* ======================================
          ADMIN BACK BUTTON
          ONLY VISIBLE FOR ADMIN
      ====================================== */}


      {/* ======================================
          HEADER
      ====================================== */}
      <section className="job-details-header">
        <div className="job-header-content">

          <div className="job-category">
            {job.job_category || "Job"}
          </div>

          <h1>
            {job.job_title || "Job Title Not Specified"}
          </h1>

          <p className="company-name">
            🏢 {job.company_name || "Organization Not Specified"}
          </p>

          <div className="header-info">

            <span>
              📍 {job.location || "Location Not Specified"}
            </span>

            <span>
              💼 {job.employment_type || "Not Specified"}
            </span>

            <span>
              🏠 {job.work_mode || "Not Specified"}
            </span>

          </div>
        </div>
      </section>

      {/* ======================================
          MAIN CONTENT
      ====================================== */}
      <section className="job-details-container">

        {/* ====================================
            LEFT CONTENT
        ==================================== */}
        <div className="job-details-main">

          {/* JOB OVERVIEW */}
          <div className="details-card">

            <h2>Job Overview</h2>

            <div className="overview-grid">

              <div>
                <span>Job Category</span>
                <strong>
                  {job.job_category || "Not specified"}
                </strong>
              </div>

              <div>
                <span>Department</span>
                <strong>
                  {job.department || "Not specified"}
                </strong>
              </div>

              <div>
                <span>Organization</span>
                <strong>
                  {job.organization_type || "Not specified"}
                </strong>
              </div>

              <div>
                <span>Vacancies</span>
                <strong>
                  {job.vacancies || "Not specified"}
                </strong>
              </div>

              <div>
                <span>Location</span>
                <strong>
                  {job.location || "Not specified"}
                </strong>
              </div>

              <div>
                <span>Work Mode</span>
                <strong>
                  {job.work_mode || "Not specified"}
                </strong>
              </div>

              <div>
                <span>Employment Type</span>
                <strong>
                  {job.employment_type || "Not specified"}
                </strong>
              </div>

              <div>
                <span>State</span>
                <strong>
                  {job.state || "Not specified"}
                </strong>
              </div>

              <div>
                <span>City</span>
                <strong>
                  {job.city || "Not specified"}
                </strong>
              </div>

            </div>
          </div>
          {/* JOB DESCRIPTION */}
          <div className="details-card">

            <h2>Job Description</h2>

            <p className="description-text">
              {job.description ||
                "No description provided."}
            </p>

          </div>

          {/* ELIGIBILITY */}
          <div className="details-card">

            <h2>Eligibility & Requirements</h2>

            <div className="detail-list">

              <p>
                <strong>Qualification:</strong>
                <br />
                {job.qualification || "Not specified"}
              </p>

              <p>
                <strong>Specialization:</strong>
                <br />
                {job.specialization || "Not specified"}
              </p>

              <p>
                <strong>Experience:</strong>
                <br />

                {job.min_experience || job.max_experience
                  ? `${job.min_experience || 0} - ${job.max_experience || 0
                  } Years`
                  : "Not specified"}
              </p>

              <p>
                <strong>Age Limit:</strong>
                <br />
                {job.age_limit || "Not specified"}
              </p>

              <p>
                <strong>Skills:</strong>
                <br />
                {job.skills || "Not specified"}
              </p>

            </div>
          </div>

          
          {/* SALARY & BENEFITS */}
          <div className="details-card">

            <h2>Salary & Benefits</h2>

            <p className="salary-details">

              ₹{" "}

              {job.min_salary || job.max_salary
                ? `${job.min_salary || 0}K - ${job.max_salary || 0
                }K`
                : "Salary not specified"}

              {job.salary_period && (
                <span>
                  {" "}
                  / {job.salary_period}
                </span>
              )}

            </p>

            {job.benefits && (
              <div className="text-content">

                <h3>Benefits</h3>

                <p>
                  {job.benefits}
                </p>

              </div>
            )}

          </div>



          {/* RESPONSIBILITIES */}
          <div className="details-card">

            <h2>Responsibilities</h2>

            <p className="description-text">
              {job.responsibilities ||
                "Responsibilities not specified."}
            </p>

          </div>

          {/* REQUIREMENTS */}
          <div className="details-card">

            <h2>Requirements</h2>

            <p className="description-text">
              {job.requirements ||
                "Requirements not specified."}
            </p>

          </div>

          {/* SELECTION PROCESS */}
          <div className="details-card">

            <h2>Selection Process</h2>

            <p className="description-text">
              {job.selection_process ||
                "Selection process not specified."}
            </p>

          </div>

        </div>

        {/* ====================================
            RIGHT SIDEBAR
        ==================================== */}
        <aside className="job-sidebar">

          {/* APPLY CARD */}
          <div className="apply-card">

            <h3>
              Apply for this Job
            </h3>

            <p>
              Last Date:
            </p>

            <strong className="last-date">
              {job.last_date || "Not specified"}
            </strong>

            {job.apply_link ? (
              <a
                href={job.apply_link}
                target="_blank"
                rel="noopener noreferrer"
                className="apply-now-button"
              >
                Apply Now
              </a>
            ) : (
              <span className="apply-disabled">
                Application Link Not Available
              </span>
            )}

          </div>

          {/* APPLICATION DETAILS */}
          <div className="sidebar-card">

            <h3>
              Application Details
            </h3>

            <p>
              <strong>
                Application Start:
              </strong>

              <br />

              {job.application_start_date ||
                "Not specified"}
            </p>

            <p>
              <strong>
                Last Date:
              </strong>

              <br />

              {job.last_date ||
                "Not specified"}
            </p>

            <p>
              <strong>
                Application Fee:
              </strong>

              <br />

              {job.application_fee ||
                "Not specified"}
            </p>

          </div>

          {/* CONTACT INFORMATION */}
          <div className="sidebar-card">

            <h3>
              Contact Information
            </h3>

            {job.contact_email && (
              <p>
                📧 {job.contact_email}
              </p>
            )}

            {job.contact_number && (
              <p>
                📞 {job.contact_number}
              </p>
            )}

            {!job.contact_email &&
              !job.contact_number && (
                <p>
                  Contact information not specified.
                </p>
              )}

          </div>

          {/* OFFICIAL NOTIFICATION */}
          {job.notification_link && (
            <div className="sidebar-card">

              <h3>
                Official Notification
              </h3>

              <a
                href={job.notification_link}
                target="_blank"
                rel="noopener noreferrer"
                className="notification-link"
              >
                View Official Notification
              </a>

            </div>
          )}

          {/* ORGANIZATION */}
          <div className="sidebar-card">

            <h3>
              Organization
            </h3>

            <p>
              <strong>
                Organization Type:
              </strong>

              <br />

              {job.organization_type ||
                "Not specified"}
            </p>

            <p>
              <strong>
                Company:
              </strong>

              <br />

              {job.company_name ||
                "Not specified"}
            </p>

          </div>

        </aside>

      </section>

    </main>
  );
}

export default JobDetails;