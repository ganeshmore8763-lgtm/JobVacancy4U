import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================================
  // GET TODAY AS YYYY-MM-DD
  // =========================================
  const getTodayString = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // =========================================
  // ADD DAYS TO DATE
  // =========================================
  const addDays = (dateString, days) => {
    const year = Number(dateString.substring(0, 4));
    const month = Number(dateString.substring(5, 7)) - 1;
    const day = Number(dateString.substring(8, 10));

    const date = new Date(year, month, day);

    date.setDate(date.getDate() + days);

    const newYear = date.getFullYear();
    const newMonth = String(
      date.getMonth() + 1
    ).padStart(2, "0");
    const newDay = String(
      date.getDate()
    ).padStart(2, "0");

    return `${newYear}-${newMonth}-${newDay}`;
  };

  // =========================================
  // TODAY
  // =========================================
  const todayString = getTodayString();

  // =========================================
  // REMINDER END DATE
  // TODAY + 5 DAYS
  // =========================================
  const reminderEndDate = addDays(
    todayString,
    5
  );

  // =========================================
  // CHECK EXPIRING SOON
  // TODAY TO NEXT 5 DAYS
  // =========================================
  const isExpiringSoon = (lastDate) => {
    if (!lastDate) {
      return false;
    }

    // Supabase date → YYYY-MM-DD
    const date = String(lastDate).substring(
      0,
      10
    );

    return (
      date >= todayString &&
      date <= reminderEndDate
    );
  };

  // =========================================
  // FILTER STATES
  // =========================================
  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [organizationFilter, setOrganizationFilter] =
    useState("All");

  // =========================================
  // FETCH JOBS
  // =========================================
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", {
        ascending: false
      });

    if (error) {
      console.error(
        "Error fetching jobs:",
        error
      );

      alert(
        "Error loading jobs: " +
          error.message
      );
    } else {
      console.log(
        "Jobs from Supabase:",
        data
      );

      setJobs(data || []);
    }

    setLoading(false);
  };

  // =========================================
  // FILTER LATEST JOBS
  // =========================================
  const filteredJobs = jobs.filter((job) => {
    const categoryMatch =
      categoryFilter === "All" ||
      job.job_category === categoryFilter;

    const organizationMatch =
      organizationFilter === "All" ||
      job.organization_type ===
        organizationFilter;

    return (
      categoryMatch &&
      organizationMatch
    );
  });

  // =========================================
  // REMINDER JOBS
  //
  // IMPORTANT:
  // USE ALL JOBS
  // NOT filteredJobs
  // =========================================
  const expiringJobs = jobs.filter((job) =>
    isExpiringSoon(job.last_date)
  );

  // =========================================
  // CLEAR FILTERS
  // =========================================
  const clearFilters = () => {
    setCategoryFilter("All");
    setOrganizationFilter("All");
  };

  // =========================================
  // IMAGE FALLBACK
  // =========================================
  const handleImageError = (e) => {
    e.target.src =
      "https://via.placeholder.com/80x60?text=Job";
  };

  // =========================================
  // RENDER
  // =========================================
  return (
    <main className="home-page">

      {/* =====================================
          HERO SECTION
      ===================================== */}

      <section className="hero-section">

        <p>
          Find the latest Government, Private,
          IT, Engineering and other job
          opportunities.
        </p>

      </section>

      {/* =====================================
          LATEST JOBS
      ===================================== */}

      <section className="jobs-section">

        {/* SECTION HEADER */}

        <div className="section-title">

          <h2>
            Latest Jobs
          </h2>

          <span>
            {filteredJobs.length} Jobs
          </span>

        </div>

        {/* =================================
            FILTERS
        ================================= */}

        <div className="job-filters">

          {/* JOB CATEGORY */}

          <div className="filter-group">

            <label>
              Job Category
            </label>

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(
                  e.target.value
                )
              }
            >

              <option value="All">
                All Categories
              </option>

              <option value="IT">
                IT & Software
              </option>

              <option value="Engineering">
                Engineering
              </option>

              <option value="Banking & Finance">
                Banking & Finance
              </option>

              <option value="Government">
                Government
              </option>

              <option value="Teaching">
                Teaching
              </option>

              <option value="Healthcare">
                Healthcare
              </option>

              <option value="Sales & Marketing">
                Sales & Marketing
              </option>

              <option value="HR">
                Human Resources
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>

          {/* ORGANIZATION TYPE */}

          <div className="filter-group">

            <label>
              Organization Type
            </label>

            <select
              value={organizationFilter}
              onChange={(e) =>
                setOrganizationFilter(
                  e.target.value
                )
              }
            >

              <option value="All">
                All Organizations
              </option>

              <option value="Government">
                Government
              </option>

              <option value="Private">
                Private
              </option>

              <option value="PSU">
                PSU
              </option>

              <option value="Banking">
                Banking
              </option>

              <option value="Startup">
                Startup
              </option>

              <option value="NGO">
                NGO
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>

          {/* CLEAR FILTER */}

          <button
            className="clear-filter"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </div>

        {/* =================================
            LOADING
        ================================= */}

        {loading && (
          <p className="loading">
            Loading jobs...
          </p>
        )}

        {/* =================================
            NO JOBS
        ================================= */}

        {!loading &&
          filteredJobs.length === 0 && (

            <div className="no-jobs">

              <h3>
                No jobs found
              </h3>

              <p>
                Try changing the filters
                or check again later.
              </p>

            </div>

          )}

        {/* =================================
            LATEST JOB TABLE
        ================================= */}

        {!loading &&
          filteredJobs.length > 0 && (

            <div className="table-container">

              <table className="jobs-table">

                <thead>

                  <tr>

                    <th></th>

                    <th>
                      Job Title
                    </th>

                    <th>
                      Qualification
                    </th>

                    <th>
                      Last Date
                    </th>

                    <th>
                      View Details
                    </th>

                    <th>
                      Notification
                    </th>

                    <th>
                      Apply
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredJobs.map(
                    (job) => (

                      <tr
                        key={job.id}
                        className={
                          isExpiringSoon(
                            job.last_date
                          )
                            ? "expiring-row"
                            : ""
                        }
                      >

                        {/* IMAGE */}

                        <td>

                          <Link
                            to={`/jobs/${job.id}`}
                          >

                            <img
                              src={
                                job.image_link ||
                                "https://via.placeholder.com/80x60?text=Job"
                              }
                              alt="Job"
                              className="job-image"
                              onError={
                                handleImageError
                              }
                            />

                          </Link>

                        </td>

                        {/* JOB TITLE */}

                        <td>

                          <strong>
                            {job.job_title ||
                              "Not specified"}
                          </strong>

                          <small>
                            {job.job_category ||
                              "Other"}
                          </small>

                        </td>

                        {/* QUALIFICATION */}

                        <td>

                          {job.qualification ||
                            "Not specified"}

                        </td>

                        {/* LAST DATE */}

                        <td>

                          {job.last_date ||
                            "Not specified"}

                          {isExpiringSoon(
                            job.last_date
                          ) && (

                            <span className="expiring-badge">
                              ⚠️ Expiring Soon
                            </span>

                          )}

                        </td>

                        {/* VIEW DETAILS */}

                        <td>

                          <Link
                            to={`/jobs/${job.id}`}
                            className="details-link"
                          >
                            View Details
                          </Link>

                        </td>

                        {/* NOTIFICATION */}

                        <td>

                          {job.notification_link ? (

                            <a
                              href={
                                job.notification_link
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Official Notification
                            </a>

                          ) : (

                            <span className="no-notification">
                              Not Available
                            </span>

                          )}

                        </td>

                        {/* APPLY */}

                        <td>

                          {job.apply_link ? (

                            <a
                              href={
                                job.apply_link
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="apply-button"
                            >
                              Apply Now
                            </a>

                          ) : (

                            <span className="no-notification">
                              Not Available
                            </span>

                          )}

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

      </section>

      {/* =====================================
          REMINDER SECTION
      ===================================== */}

      <section className="jobs-section reminder-section">

        {/* SECTION HEADER */}

        <div className="section-title">

          <h2>
            ⏰ Reminder
          </h2>

          <span>
            {expiringJobs.length} Jobs
          </span>

        </div>

        {/* =================================
            REMINDER INFORMATION
        ================================= */}

        <p className="reminder-info">
          Jobs with an application last date
          from today up to the next 5 days.
        </p>

        {/* =================================
            NO EXPIRING JOBS
        ================================= */}

        {!loading &&
          expiringJobs.length === 0 && (

            <div className="no-jobs reminder-empty">

              <h3>
                No Expiring Jobs
              </h3>

              <p>
                There are no jobs expiring
                within the next 5 days.
              </p>

            </div>

          )}

        {/* =================================
            EXPIRING JOB TABLE
        ================================= */}

        {!loading &&
          expiringJobs.length > 0 && (

            <div className="table-container">

              <table className="jobs-table">

                <thead>

                  <tr>

                    <th></th>

                    <th>
                      Job Title
                    </th>

                    <th>
                      Qualification
                    </th>

                    <th>
                      Last Date
                    </th>

                    <th>
                      View Details
                    </th>

                    <th>
                      Notification
                    </th>

                    <th>
                      Apply
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {expiringJobs.map(
                    (job) => (

                      <tr
                        key={job.id}
                        className="expiring-row"
                      >

                        {/* IMAGE */}

                        <td>

                          <Link
                            to={`/jobs/${job.id}`}
                          >

                            <img
                              src={
                                job.image_link ||
                                "https://via.placeholder.com/80x60?text=Job"
                              }
                              alt="Job"
                              className="job-image"
                              onError={
                                handleImageError
                              }
                            />

                          </Link>

                        </td>

                        {/* JOB TITLE */}

                        <td>

                          <strong>
                            {job.job_title ||
                              "Not specified"}
                          </strong>

                          <small>
                            {job.job_category ||
                              "Other"}
                          </small>

                        </td>

                        {/* QUALIFICATION */}

                        <td>

                          {job.qualification ||
                            "Not specified"}

                        </td>

                        {/* LAST DATE */}

                        <td>

                          <strong>
                            {job.last_date ||
                              "Not specified"}
                          </strong>

                          <br />

                          <span className="expiring-badge">
                            ⚠️ Expiring Soon
                          </span>

                        </td>

                        {/* VIEW DETAILS */}

                        <td>

                          <Link
                            to={`/jobs/${job.id}`}
                            className="details-link"
                          >
                            View Details
                          </Link>

                        </td>

                        {/* NOTIFICATION */}

                        <td>

                          {job.notification_link ? (

                            <a
                              href={
                                job.notification_link
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Official Notification
                            </a>

                          ) : (

                            <span className="no-notification">
                              Not Available
                            </span>

                          )}

                        </td>

                        {/* APPLY */}

                        <td>

                          {job.apply_link ? (

                            <a
                              href={
                                job.apply_link
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="apply-button"
                            >
                              Apply Now
                            </a>

                          ) : (

                            <span className="no-notification">
                              Not Available
                            </span>

                          )}

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

      </section>

    </main>
  );
}

export default Home;