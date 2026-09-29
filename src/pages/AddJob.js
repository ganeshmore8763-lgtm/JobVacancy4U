import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./AddJob.css";

function AddJob() {
  const navigate = useNavigate();

  const initialJob = {
    job_title: "",image_link: "",
    company_name: "",
    job_category: "",
    department: "",
    employment_type: "",
    work_mode: "",
    location: "",
    vacancies: "",

    qualification: "",
    specialization: "",
    min_experience: "",
    max_experience: "",
    age_limit: "",
    skills: "",

    min_salary: "",
    max_salary: "",
    salary_period: "",
    benefits: "",

    application_start_date: "",
    last_date: "",
    apply_link: "",
    contact_email: "",
    contact_number: "",

    description: "",
    responsibilities: "",
    requirements: "",
    selection_process: "",

    organization_type: "",
    state: "",
    city: "",
    application_fee: "",
    notification_link: ""
  };

  const [job, setJob] = useState(initialJob);
  const [loading, setLoading] = useState(false);

  // Check whether Entrance Exam is selected
  const isEntranceExam =
    job.employment_type === "Entrance Exam";

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setJob((prevJob) => ({
      ...prevJob,
      [name]: value
    }));

    // Clear salary-related fields when Entrance Exam is selected
    if (
      name === "employment_type" &&
      value === "Entrance Exam"
    ) {
      setJob((prevJob) => ({
        ...prevJob,
        employment_type: value,
        vacancies: "",
        min_salary: "",
        max_salary: "",
        salary_period: "",
        benefits: ""
      }));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // Prepare data for Supabase
    const jobData = {
      ...job,

      vacancies:
        job.employment_type === "Entrance Exam"
          ? null
          : job.vacancies === ""
          ? null
          : Number(job.vacancies),

      min_experience:
        job.min_experience === ""
          ? null
          : Number(job.min_experience),

      max_experience:
        job.max_experience === ""
          ? null
          : Number(job.max_experience),

      min_salary:
        job.employment_type === "Entrance Exam"
          ? null
          : job.min_salary === ""
          ? null
          : Number(job.min_salary),

      max_salary:
        job.employment_type === "Entrance Exam"
          ? null
          : job.max_salary === ""
          ? null
          : Number(job.max_salary),

      salary_period:
        job.employment_type === "Entrance Exam"
          ? null
          : job.salary_period === ""
          ? null
          : job.salary_period,

      benefits:
        job.employment_type === "Entrance Exam"
          ? null
          : job.benefits === ""
          ? null
          : job.benefits,

      application_start_date:
        job.application_start_date === ""
          ? null
          : job.application_start_date,

      last_date:
        job.last_date === ""
          ? null
          : job.last_date
    };

    const { error } = await supabase
      .from("jobs")
      .insert([jobData]);

    if (error) {
      console.error("Supabase Error:", error);

      alert(
        "Error adding job:\n" +
        error.message
      );

      setLoading(false);
      return;
    }

    alert("Job added successfully!");

    // Clear form
    setJob(initialJob);

    setLoading(false);
  };

  return (
    <div className="add-job-page">

      {/* Back Button */}
      <div className="back-dashboard-container">
        <button
          type="button"
          className="back-dashboard-button"
          onClick={() =>
            navigate("/AdminDashboard")
          }
        >
          ← Back to Admin Dashboard
        </button>
      </div>

      <div className="add-job-container">

        <h1>Add New Job</h1>

        <p className="form-subtitle">
          Add Government, Private, IT, Engineering,
          Entrance Exam and other opportunities.
        </p>

        <form onSubmit={handleSubmit}>

          {/* ========================================= */}
          {/* 1. JOB DETAILS */}
          {/* ========================================= */}

          <div className="form-section">

            <h2>1. Job Details</h2>

            <div className="form-grid">

              <div className="form-group">
                <label>
                  Job Title *
                </label>

                <input
                  type="text"
                  name="job_title"
                  value={job.job_title}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineer"
                  required
                />
              </div>


              <div className="form-group">
                <label>
                  Company / Organization *
                </label>

                <input
                  type="text"
                  name="company_name"
                  value={job.company_name}
                  onChange={handleChange}
                  placeholder="e.g. TCS"
                  required
                />
              </div>


              <div className="form-group">
                <label>
                  Job Category *
                </label>

                <select
                  name="job_category"
                  value={job.job_category}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Category
                  </option>

                  <option value="Government">
                    Government
                  </option>

                  <option value="Private">
                    Private
                  </option>

                  <option value="IT">
                    IT
                  </option>

                  <option value="Engineering">
                    Engineering
                  </option>

                  <option value="Banking">
                    Banking
                  </option>

                  <option value="Railway">
                    Railway
                  </option>

                  <option value="Defence">
                    Defence
                  </option>

                  <option value="Teaching">
                    Teaching
                  </option>

                  <option value="Entrance Exam">
                    Entrance Exam
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>


              <div className="form-group">
                <label>
                  Department
                </label>

                <input
                  type="text"
                  name="department"
                  value={job.department}
                  onChange={handleChange}
                  placeholder="e.g. IT Department"
                />
              </div>


              <div className="form-group">
                <label>
                  Employment Type *
                </label>

                <select
                  name="employment_type"
                  value={job.employment_type}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Employment Type
                  </option>

                  <option value="Full Time">
                    Full Time
                  </option>

                  <option value="Part Time">
                    Part Time
                  </option>

                  <option value="Contract">
                    Contract
                  </option>

                  <option value="Temporary">
                    Temporary
                  </option>

                  <option value="Internship">
                    Internship
                  </option>

                  <option value="Apprenticeship">
                    Apprenticeship
                  </option>

                  <option value="Freelance">
                    Freelance
                  </option>

                  <option value="Entrance Exam">
                    Entrance Exam
                  </option>
                </select>
              </div>


              <div className="form-group">
                <label>
                  Work Mode
                </label>

                <select
                  name="work_mode"
                  value={job.work_mode}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Work Mode
                  </option>

                  <option value="On Site">
                    On Site
                  </option>

                  <option value="Remote">
                    Remote
                  </option>

                  <option value="Hybrid">
                    Hybrid
                  </option>
                </select>
              </div>


              <div className="form-group">
                <label>
                  Location *
                </label>

                <input
                  type="text"
                  name="location"
                  value={job.location}
                  onChange={handleChange}
                  placeholder="e.g. Mumbai, Maharashtra"
                  required
                />
              </div>


              {/* NUMBER OF VACANCIES HIDDEN FOR ENTRANCE EXAM */}

              {!isEntranceExam && (
                <div className="form-group">

                  <label>
                    Number of Vacancies *
                  </label>

                  <input
                    type="number"
                    name="vacancies"
                    value={job.vacancies}
                    onChange={handleChange}
                    min="1"
                    placeholder="e.g. 10"
                    required
                  />

                </div>
              )}

              <div className="form-group">
  <label>
    Image Link
  </label>

  <input
    type="url"
    name="image_link"
    value={job.image_link}
    onChange={handleChange}
    placeholder="https://example.com/job-image.jpg"
  />
</div>

            </div>

          </div>


          {/* ========================================= */}
          {/* 2. ELIGIBILITY */}
          {/* ========================================= */}

          <div className="form-section">

            <h2>
              2. Eligibility & Requirements
            </h2>

            <div className="form-grid">

              <div className="form-group">
                <label>
                  Qualification *
                </label>

                <input
                  type="text"
                  name="qualification"
                  value={job.qualification}
                  onChange={handleChange}
                  placeholder="e.g. B.E / B.Tech / Graduate"
                  required
                />
              </div>


              <div className="form-group">
                <label>
                  Specialization
                </label>

                <input
                  type="text"
                  name="specialization"
                  value={job.specialization}
                  onChange={handleChange}
                  placeholder="e.g. Computer Engineering"
                />
              </div>


              <div className="form-group">
                <label>
                  Minimum Experience (Years)
                </label>

                <input
                  type="number"
                  name="min_experience"
                  value={job.min_experience}
                  onChange={handleChange}
                  min="0"
                  placeholder="e.g. 0"
                />
              </div>


              <div className="form-group">
                <label>
                  Maximum Experience (Years)
                </label>

                <input
                  type="number"
                  name="max_experience"
                  value={job.max_experience}
                  onChange={handleChange}
                  min="0"
                  placeholder="e.g. 5"
                />
              </div>


              <div className="form-group">
                <label>
                  Age Limit
                </label>

                <input
                  type="text"
                  name="age_limit"
                  value={job.age_limit}
                  onChange={handleChange}
                  placeholder="e.g. 18-30 Years"
                />
              </div>


              <div className="form-group full-width">
                <label>
                  Required Skills
                </label>

                <textarea
                  name="skills"
                  value={job.skills}
                  onChange={handleChange}
                  placeholder="e.g. JavaScript, React, SQL, Communication"
                  rows="3"
                />
              </div>

            </div>

          </div>


          {/* ========================================= */}
          {/* ENTRANCE EXAM MESSAGE */}
          {/* ========================================= */}

          {isEntranceExam && (
            <div className="form-section entrance-exam-message">

              <h2>
                🎓 Entrance Exam
              </h2>

              <p>
                Number of Vacancies and Salary &
                Benefits are not required for
                entrance exam listings.
              </p>

            </div>
          )}


          {/* ========================================= */}
          {/* 3. SALARY & BENEFITS */}
          {/* ========================================= */}

          {!isEntranceExam && (

            <div className="form-section">

              <h2>
                3. Salary & Benefits
              </h2>

              <div className="form-grid">

                <div className="form-group">
                  <label>
                    Minimum Salary
                  </label>

                  <input
                    type="number"
                    name="min_salary"
                    value={job.min_salary}
                    onChange={handleChange}
                    min="0"
                    placeholder="e.g. 25000"
                  />
                </div>


                <div className="form-group">
                  <label>
                    Maximum Salary
                  </label>

                  <input
                    type="number"
                    name="max_salary"
                    value={job.max_salary}
                    onChange={handleChange}
                    min="0"
                    placeholder="e.g. 50000"
                  />
                </div>


                <div className="form-group">
                  <label>
                    Salary Period
                  </label>

                  <select
                    name="salary_period"
                    value={job.salary_period}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select Period
                    </option>

                    <option value="Per Month">
                      Per Month
                    </option>

                    <option value="Per Year">
                      Per Year
                    </option>

                    <option value="Per Day">
                      Per Day
                    </option>
                  </select>
                </div>


                <div className="form-group full-width">

                  <label>
                    Benefits
                  </label>

                  <textarea
                    name="benefits"
                    value={job.benefits}
                    onChange={handleChange}
                    placeholder="e.g. Health Insurance, PF, Bonus"
                    rows="3"
                  />

                </div>

              </div>

            </div>

          )}


          {/* ========================================= */}
          {/* 4. APPLICATION DETAILS */}
          {/* ========================================= */}

          <div className="form-section">

            <h2>
              4. Application Details
            </h2>

            <div className="form-grid">

              <div className="form-group">
                <label>
                  Application Start Date
                </label>

                <input
                  type="date"
                  name="application_start_date"
                  value={job.application_start_date}
                  onChange={handleChange}
                />
              </div>


              <div className="form-group">
                <label>
                  Last Date *
                </label>

                <input
                  type="date"
                  name="last_date"
                  value={job.last_date}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="form-group">
                <label>
                  Apply Link
                </label>

                <input
                  type="url"
                  name="apply_link"
                  value={job.apply_link}
                  onChange={handleChange}
                  placeholder="https://example.com/apply"
                />
              </div>


              <div className="form-group">
                <label>
                  Notification Link
                </label>

                <input
                  type="url"
                  name="notification_link"
                  value={job.notification_link}
                  onChange={handleChange}
                  placeholder="https://example.com/notification.pdf"
                />
              </div>


              <div className="form-group">
                <label>
                  Contact Email
                </label>

                <input
                  type="email"
                  name="contact_email"
                  value={job.contact_email}
                  onChange={handleChange}
                  placeholder="hr@example.com"
                />
              </div>


              <div className="form-group">
                <label>
                  Contact Number
                </label>

                <input
                  type="tel"
                  name="contact_number"
                  value={job.contact_number}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                />
              </div>

            </div>

          </div>


          {/* ========================================= */}
          {/* 5. JOB DESCRIPTION */}
          {/* ========================================= */}

          <div className="form-section">

            <h2>
              5. Job Description
            </h2>

            <div className="form-group">

              <label>
                Job Description *
              </label>

              <textarea
                name="description"
                value={job.description}
                onChange={handleChange}
                placeholder="Enter complete job description..."
                rows="6"
                required
              />

            </div>


            <div className="form-group">

              <label>
                Responsibilities
              </label>

              <textarea
                name="responsibilities"
                value={job.responsibilities}
                onChange={handleChange}
                placeholder="Enter job responsibilities..."
                rows="6"
              />

            </div>


            <div className="form-group">

              <label>
                Requirements
              </label>

              <textarea
                name="requirements"
                value={job.requirements}
                onChange={handleChange}
                placeholder="Enter job requirements..."
                rows="6"
              />

            </div>


            <div className="form-group">

              <label>
                Selection Process
              </label>

              <textarea
                name="selection_process"
                value={job.selection_process}
                onChange={handleChange}
                placeholder="e.g. CBT → Interview → Document Verification"
                rows="4"
              />

            </div>

          </div>


          {/* ========================================= */}
          {/* 6. ADDITIONAL INFORMATION */}
          {/* ========================================= */}

          <div className="form-section">

            <h2>
              6. Additional Information
            </h2>

            <div className="form-grid">

              <div className="form-group">
                <label>
                  Organization Type
                </label>

                <select
                  name="organization_type"
                  value={job.organization_type}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Organization Type
                  </option>

                  <option value="Central Government">
                    Central Government
                  </option>

                  <option value="State Government">
                    State Government
                  </option>

                  <option value="PSU">
                    PSU
                  </option>

                  <option value="Private Company">
                    Private Company
                  </option>

                  <option value="Startup">
                    Startup
                  </option>

                  <option value="Educational Institution">
                    Educational Institution
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>


              <div className="form-group">
                <label>
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  value={job.state}
                  onChange={handleChange}
                  placeholder="e.g. Maharashtra"
                />
              </div>


              <div className="form-group">
                <label>
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={job.city}
                  onChange={handleChange}
                  placeholder="e.g. Nashik"
                />
              </div>


              <div className="form-group">
                <label>
                  Application Fee
                </label>

                <input
                  type="text"
                  name="application_fee"
                  value={job.application_fee}
                  onChange={handleChange}
                  placeholder="e.g. ₹500 / No Fee"
                />
              </div>

            </div>

          </div>


          {/* ========================================= */}
          {/* SUBMIT BUTTON */}
          {/* ========================================= */}

          <div className="form-submit">

            <button
              type="submit"
              className="submit-job-button"
              disabled={loading}
            >
              {loading
                ? "Adding Job..."
                : "Add Job"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddJob;