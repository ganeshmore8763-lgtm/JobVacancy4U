import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./JobDetailsAdmin.css";

function JobDetailsAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // FETCH JOB
  // ==========================================
  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching job:", error);
        setError(error.message);
        setJob(null);
      } else {
        setJob(data);
        setFormData(data);
      }

      setLoading(false);
    };

    fetchJob();
  }, [id]);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSuccess("");
  };

  // ==========================================
  // UPDATE JOB
  // ==========================================
  const handleUpdate = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    // Only update fields belonging to the jobs form.
    // id and created_at are NOT changed.
    const updateData = {
      job_title: formData.job_title || null,
      company_name: formData.company_name || null,
      job_category: formData.job_category || null,
      department: formData.department || null,
      employment_type: formData.employment_type || null,
      work_mode: formData.work_mode || null,
      location: formData.location || null,
      vacancies: formData.vacancies || null,

      qualification: formData.qualification || null,
      specialization: formData.specialization || null,
      min_experience: formData.min_experience || null,
      max_experience: formData.max_experience || null,
      age_limit: formData.age_limit || null,
      skills: formData.skills || null,

      min_salary: formData.min_salary || null,
      max_salary: formData.max_salary || null,
      salary_period: formData.salary_period || null,
      benefits: formData.benefits || null,

      application_start_date:
        formData.application_start_date || null,
      last_date: formData.last_date || null,

      apply_link: formData.apply_link || null,
      contact_email: formData.contact_email || null,
      contact_number: formData.contact_number || null,

      description: formData.description || null,
      responsibilities: formData.responsibilities || null,
      requirements: formData.requirements || null,
      selection_process: formData.selection_process || null,

      organization_type:
        formData.organization_type || null,

      state: formData.state || null,
      city: formData.city || null,

      application_fee:
        formData.application_fee || null,

      notification_link:
        formData.notification_link || null,
    };

    const { data, error } = await supabase
      .from("jobs")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Update error:", error);
      setError(error.message);
      setSaving(false);
      return;
    }

    setJob(data);
    setFormData(data);
    setEditing(false);
    setSuccess("Job updated successfully!");
    setSaving(false);
  };

  // ==========================================
  // CANCEL EDIT
  // ==========================================
  const handleCancel = () => {
    setFormData(job);
    setEditing(false);
    setError("");
    setSuccess("");
  };

  // ==========================================
  // TEXT INPUT
  // ==========================================
  const renderInput = (
    label,
    name,
    type = "text"
  ) => {
    return (
      <div className="admin-form-group">
        <label>{label}</label>

        <input
          type={type}
          name={name}
          value={formData[name] ?? ""}
          onChange={handleChange}
        />
      </div>
    );
  };

  // ==========================================
  // TEXTAREA
  // ==========================================
  const renderTextarea = (label, name) => {
    return (
      <div className="admin-form-group full-width">
        <label>{label}</label>

        <textarea
          name={name}
          value={formData[name] ?? ""}
          onChange={handleChange}
          rows="6"
        />
      </div>
    );
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <main className="job-details-page">
        <div className="job-details-loading">
          Loading job details...
        </div>
      </main>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================
  if (error && !job) {
    return (
      <main className="job-details-page">
        <div className="job-details-error">
          <h2>Job Not Found</h2>

          <p>{error}</p>

          <button
            type="button"
            className="back-button"
            onClick={() =>
              navigate("/AdminDashboard")
            }
          >
            ← Back to Admin Dashboard
          </button>
        </div>
      </main>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================
  return (
    <main className="job-details-page">

      <div className="details-container">

        {/* ====================================
            TOP BUTTONS
        ==================================== */}

        <div className="admin-top-bar">

          <button
            type="button"
            className="back-button"
            onClick={() =>
              navigate("/AdminDashboard")
            }
          >
            ← Back to Admin Dashboard
          </button>

          {!editing && (
            <button
              type="button"
              className="edit-button"
              onClick={() => {
                setEditing(true);
                setError("");
                setSuccess("");
              }}
            >
              ✏️ Edit Job
            </button>
          )}

        </div>

        {/* ====================================
            SUCCESS MESSAGE
        ==================================== */}

        {success && (
          <div className="success-message">
            ✓ {success}
          </div>
        )}

        {/* ====================================
            ERROR MESSAGE
        ==================================== */}

        {error && (
          <div className="update-error">
            ⚠️ {error}
          </div>
        )}

        {/* ====================================
            EDIT MODE
        ==================================== */}

        {editing ? (

          <form
            className="admin-edit-form"
            onSubmit={handleUpdate}
          >

            {/* ================================
                BASIC JOB INFORMATION
            ================================= */}

            <section className="details-section">

              <h2>Job Information</h2>

              <div className="admin-form-grid">

                {renderInput(
                  "Job Title",
                  "job_title"
                )}
                {renderInput(
                  "Image Link",
                  "image_link"
                )}

                {renderInput(
                  "Company Name",
                  "company_name"
                )}

                {renderInput(
                  "Job Category",
                  "job_category"
                )}

                {renderInput(
                  "Department",
                  "department"
                )}

                {renderInput(
                  "Employment Type",
                  "employment_type"
                )}

                {renderInput(
                  "Work Mode",
                  "work_mode"
                )}

                {renderInput(
                  "Location",
                  "location"
                )}

                {renderInput(
                  "Vacancies",
                  "vacancies",
                  "number"
                )}

              </div>

            </section>

            {/* ================================
                ELIGIBILITY
            ================================= */}

            <section className="details-section">

              <h2>Eligibility</h2>

              <div className="admin-form-grid">

                {renderInput(
                  "Qualification",
                  "qualification"
                )}

                {renderInput(
                  "Specialization",
                  "specialization"
                )}

                {renderInput(
                  "Minimum Experience",
                  "min_experience"
                )}

                {renderInput(
                  "Maximum Experience",
                  "max_experience"
                )}

                {renderInput(
                  "Age Limit",
                  "age_limit"
                )}

                {renderInput(
                  "Skills",
                  "skills"
                )}

              </div>

            </section>

            {/* ================================
                SALARY
            ================================= */}

            <section className="details-section">

              <h2>Salary & Benefits</h2>

              <div className="admin-form-grid">

                {renderInput(
                  "Minimum Salary",
                  "min_salary",
                  "number"
                )}

                {renderInput(
                  "Maximum Salary",
                  "max_salary",
                  "number"
                )}

                {renderInput(
                  "Salary Period",
                  "salary_period"
                )}

                {renderInput(
                  "Benefits",
                  "benefits"
                )}

              </div>

            </section>

            {/* ================================
                DATES
            ================================= */}

            <section className="details-section">

              <h2>Important Dates</h2>

              <div className="admin-form-grid">

                {renderInput(
                  "Application Start Date",
                  "application_start_date",
                  "date"
                )}

                {renderInput(
                  "Last Date",
                  "last_date",
                  "date"
                )}

              </div>

            </section>

            {/* ================================
                DESCRIPTION
            ================================= */}

            <section className="details-section">

              <h2>Job Description</h2>

              {renderTextarea(
                "Description",
                "description"
              )}

            </section>

            {/* ================================
                RESPONSIBILITIES
            ================================= */}

            <section className="details-section">

              <h2>Responsibilities</h2>

              {renderTextarea(
                "Responsibilities",
                "responsibilities"
              )}

            </section>

            {/* ================================
                REQUIREMENTS
            ================================= */}

            <section className="details-section">

              <h2>Requirements</h2>

              {renderTextarea(
                "Requirements",
                "requirements"
              )}

            </section>

            {/* ================================
                SELECTION PROCESS
            ================================= */}

            <section className="details-section">

              <h2>Selection Process</h2>

              {renderTextarea(
                "Selection Process",
                "selection_process"
              )}

            </section>

            {/* ================================
                ORGANIZATION
            ================================= */}

            <section className="details-section">

              <h2>Organization Details</h2>

              <div className="admin-form-grid">

                {renderInput(
                  "Organization Type",
                  "organization_type"
                )}

                {renderInput(
                  "State",
                  "state"
                )}

                {renderInput(
                  "City",
                  "city"
                )}

              </div>

            </section>

            {/* ================================
                APPLICATION FEE
            ================================= */}

            <section className="details-section">

              <h2>Application Fee</h2>

              <div className="admin-form-grid">

                {renderInput(
                  "Application Fee",
                  "application_fee"
                )}

              </div>

            </section>

            {/* ================================
                CONTACT
            ================================= */}

            <section className="details-section">

              <h2>Contact Information</h2>

              <div className="admin-form-grid">

                {renderInput(
                  "Contact Email",
                  "contact_email",
                  "email"
                )}

                {renderInput(
                  "Contact Number",
                  "contact_number"
                )}

              </div>

            </section>

            {/* ================================
                LINKS
            ================================= */}

            <section className="details-section">

              <h2>Application Links</h2>

              <div className="admin-form-grid">

                {renderInput(
                  "Official Notification Link",
                  "notification_link",
                  "url"
                )}

                {renderInput(
                  "Apply Link",
                  "apply_link",
                  "url"
                )}

              </div>

            </section>

            {/* ================================
                SAVE BUTTONS
            ================================= */}

            <div className="admin-save-bar">

              <button
                type="submit"
                className="update-button"
                disabled={saving}
              >
                {saving
                  ? "Updating..."
                  : "💾 Update Job"}
              </button>

              <button
                type="button"
                className="cancel-button"
                onClick={handleCancel}
                disabled={saving}
              >
                ❌ Cancel
              </button>

            </div>

          </form>

        ) : (

          /* ===================================
             VIEW MODE
          ================================== */

          <>

            {/* ================================
                JOB HEADER
            ================================= */}

            <section className="job-header">

              <div className="job-category">
                {job.job_category || "Job"}
              </div>

              <h1>
                {job.job_title ||
                  "Job Title Not Specified"}
              </h1>

              <p className="company-name">
                🏢{" "}
                {job.company_name ||
                  "Organization Not Specified"}
              </p>

              <div className="job-header-info">

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
                  🏢{" "}
                  {job.organization_type ||
                    "Not Specified"}
                </span>

              </div>

            </section>

            {/* ================================
                JOB INFORMATION
            ================================= */}

            <section className="details-section">

              <h2>Job Information</h2>

              <div className="details-grid">

                <div className="detail-item">
                  <label>Job Category</label>
                  <p>
                    {job.job_category ||
                      "Not specified"}
                  </p>
                </div>
                <div className="detail-item">
                  <label>Image Link</label>
                  <p>
                    {job.image_link ||
                      "Not specified"}
                  </p>
                </div>

                <div className="detail-item">
                  <label>Department</label>
                  <p>
                    {job.department ||
                      "Not specified"}
                  </p>
                </div>

                <div className="detail-item">
                  <label>Employment Type</label>
                  <p>
                    {job.employment_type ||
                      "Not specified"}
                  </p>
                </div>

                <div className="detail-item">
                  <label>Work Mode</label>
                  <p>
                    {job.work_mode ||
                      "Not specified"}
                  </p>
                </div>

                <div className="detail-item">
                  <label>Location</label>
                  <p>
                    {job.location ||
                      "Not specified"}
                  </p>
                </div>

                <div className="detail-item">
                  <label>Vacancies</label>
                  <p>
                    {job.vacancies ||
                      "Not specified"}
                  </p>
                </div>

              </div>

            </section>

            {/* ================================
                ELIGIBILITY
            ================================= */}

            <section className="details-section">

              <h2>Eligibility</h2>

              <div className="details-grid">

                <div className="detail-item">
                  <label>Qualification</label>
                  <p>
                    {job.qualification ||
                      "Not specified"}
                  </p>
                </div>

                <div className="detail-item">
                  <label>Specialization</label>
                  <p>
                    {job.specialization ||
                      "Not specified"}
                  </p>
                </div>

                <div className="detail-item">
                  <label>Minimum Experience</label>
                  <p>
                    {job.min_experience ||
                      "Not specified"}
                  </p>
                </div>

                <div className="detail-item">
                  <label>Maximum Experience</label>
                  <p>
                    {job.max_experience ||
                      "Not specified"}
                  </p>
                </div>

                <div className="detail-item">
                  <label>Age Limit</label>
                  <p>
                    {job.age_limit ||
                      "Not specified"}
                  </p>
                </div>

                <div className="detail-item">
                  <label>Skills</label>
                  <p>
                    {job.skills ||
                      "Not specified"}
                  </p>
                </div>

              </div>

            </section>

            {/* ================================
                SALARY
            ================================= */}

            <section className="details-section">

              <h2>Salary & Benefits</h2>

              <div className="details-grid">

                <div className="detail-item">
                  <label>Minimum Salary</label>
                  <p>
                    {job.min_salary ||
                      "Not specified"}
                  </p>
                </div>

                <div className="detail-item">
                  <label>Maximum Salary</label>
                  <p>
                    {job.max_salary ||
                      "Not specified"}
                  </p>
                </div>

                <div className="detail-item">
                  <label>Salary Period</label>
                  <p>
                    {job.salary_period ||
                      "Not specified"}
                  </p>
                </div>

                <div className="detail-item">
                  <label>Benefits</label>
                  <p>
                    {job.benefits ||
                      "Not specified"}
                  </p>
                </div>

              </div>

            </section>

            {/* ================================
                DATES
            ================================= */}

            <section className="details-section">

              <h2>Important Dates</h2>

              <div className="details-grid">

                <div className="detail-item">
                  <label>
                    Application Start Date
                  </label>
                  <p>
                    {job.application_start_date ||
                      "Not specified"}
                  </p>
                </div>

                <div className="detail-item">
                  <label>Last Date</label>
                  <p>
                    {job.last_date ||
                      "Not specified"}
                  </p>
                </div>

              </div>

            </section>

            {/* ================================
                DESCRIPTION
            ================================= */}

            <section className="details-section">

              <h2>Job Description</h2>

              <p className="long-text">
                {job.description ||
                  "Not specified"}
              </p>

            </section>

            {/* ================================
                RESPONSIBILITIES
            ================================= */}

            <section className="details-section">

              <h2>Responsibilities</h2>

              <p className="long-text">
                {job.responsibilities ||
                  "Not specified"}
              </p>

            </section>

            {/* ================================
                REQUIREMENTS
            ================================= */}

            <section className="details-section">

              <h2>Requirements</h2>

              <p className="long-text">
                {job.requirements ||
                  "Not specified"}
              </p>

            </section>

            {/* ================================
                SELECTION
            ================================= */}

            <section className="details-section">

              <h2>Selection Process</h2>

              <p className="long-text">
                {job.selection_process ||
                  "Not specified"}
              </p>

            </section>

            {/* ================================
                ORGANIZATION
            ================================= */}

            <section className="details-section">

              <h2>Organization Details</h2>

              <div className="details-grid">

                <div className="detail-item">
                  <label>Organization Type</label>
                  <p>
                    {job.organization_type ||
                      "Not specified"}
                  </p>
                </div>

                <div className="detail-item">
                  <label>State</label>
                  <p>
                    {job.state ||
                      "Not specified"}
                  </p>
                </div>

                <div className="detail-item">
                  <label>City</label>
                  <p>
                    {job.city ||
                      "Not specified"}
                  </p>
                </div>

              </div>

            </section>

            {/* ================================
                APPLICATION FEE
            ================================= */}

            <section className="details-section">

              <h2>Application Fee</h2>

              <p>
                {job.application_fee ||
                  "Not specified"}
              </p>

            </section>

            {/* ================================
                CONTACT
            ================================= */}

            <section className="details-section">

              <h2>Contact Information</h2>

              <div className="details-grid">

                <div className="detail-item">
                  <label>Contact Email</label>
                  <p>
                    {job.contact_email ||
                      "Not specified"}
                  </p>
                </div>

                <div className="detail-item">
                  <label>Contact Number</label>
                  <p>
                    {job.contact_number ||
                      "Not specified"}
                  </p>
                </div>

              </div>

            </section>

            {/* ================================
                LINKS
            ================================= */}

            <section className="details-section">

              <h2>Application Links</h2>

              <div className="details-grid">

                <div className="detail-item">
                  <label>
                    Official Notification
                  </label>

                  <p className="break-text">
                    {job.notification_link ||
                      "Not specified"}
                  </p>
                </div>

                <div className="detail-item">
                  <label>Apply Link</label>

                  <p className="break-text">
                    {job.apply_link ||
                      "Not specified"}
                  </p>
                </div>

              </div>

            </section>

            {/* ================================
                ACTION BUTTONS
            ================================= */}

            <section className="job-actions">

              {job.notification_link && (
                <a
                  href={job.notification_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="notification-button"
                >
                  Official Notification
                </a>
              )}

              {job.apply_link && (
                <a
                  href={job.apply_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apply-button"
                >
                  Check Apply Link
                </a>
              )}

            </section>

          </>

        )}

      </div>

    </main>
  );
}

export default JobDetailsAdmin;