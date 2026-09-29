import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check admin login
    const adminLoggedIn =
      localStorage.getItem("adminLoggedIn") === "true";

    if (!adminLoggedIn) {
      navigate("/admin-login");
      return;
    }

    fetchJobs();
  }, [navigate]);

  // Fetch all jobs
  const fetchJobs = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", {
        ascending: false
      });

    if (error) {
      console.error("Error fetching jobs:", error);

      alert(
        "Error loading jobs: " +
        error.message
      );
    } else {
      setJobs(data || []);
    }

    setLoading(false);
  };

  // Check expired job
  const isExpired = (lastDate) => {
    if (!lastDate) {
      return false;
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const expiryDate = new Date(lastDate);

    expiryDate.setHours(0, 0, 0, 0);

    return expiryDate < today;
  };

  // Delete job
  const deleteJob = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) {
      return;
    }

    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete error:", error);

      alert(
        "Unable to delete job: " +
        error.message
      );

      return;
    }

    alert("Job deleted successfully!");

    fetchJobs();
  };

  // Logout
  const handleLogout = () => {

    localStorage.removeItem("adminLoggedIn");

    navigate("/admin-login");
  };

  const totalJobs = jobs.length;

  const expiredJobs = jobs.filter(
    (job) => isExpired(job.last_date)
  ).length;

  const activeJobs =
    totalJobs - expiredJobs;

  return (
    <div className="admin-dashboard">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>
          <h1>Admin Dashboard</h1>

          <p>
            Welcome Admin!
          </p>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>


      {/* DASHBOARD CARDS */}

      <div className="dashboard-cards">

        {/* ADD JOB */}

        <div className="dashboard-card">

          <h2>📋 Add Job</h2>

          <p>
            Add a new Government, Private,
            IT, Engineering or other job.
          </p>

          <Link
            to="/add-job"
            className="dashboard-button"
          >
            Add New Job
          </Link>

        </div>


        {/* TOTAL JOBS */}

        <div className="dashboard-card">

          <h2>💼 Total Jobs</h2>

          <p>
            Total jobs currently stored
            in the database.
          </p>

          <div className="job-count">
            {totalJobs}
          </div>

        </div>


        {/* ACTIVE JOBS */}

        <div className="dashboard-card">

          <h2>🟢 Active Jobs</h2>

          <p>
            Jobs whose application last
            date has not expired.
          </p>

          <div className="job-count">
            {activeJobs}
          </div>

        </div>


        {/* EXPIRED JOBS */}

        <div className="dashboard-card">

          <h2>🔴 Expired Jobs</h2>

          <p>
            Jobs whose application last
            date has already passed.
          </p>

          <div className="job-count">
            {expiredJobs}
          </div>

        </div>

      </div>


      {/* JOB MANAGEMENT */}

      <div className="jobs-management">

        <div className="jobs-management-header">

          <h2>
            Manage All Jobs
          </h2>

          <button
            onClick={fetchJobs}
            className="refresh-button"
          >
            🔄 Refresh
          </button>

        </div>


        {/* LOADING */}

        {loading ? (

          <p className="loading">
            Loading jobs...
          </p>

        ) : jobs.length === 0 ? (

          /* NO JOBS */

          <div className="no-jobs">

            <h3>
              No Jobs Found
            </h3>

            <p>
              You have not added any jobs yet.
            </p>

            <Link
              to="/add-job"
              className="dashboard-button"
            >
              Add Your First Job
            </Link>

          </div>

        ) : (

          /* JOB TABLE */

          <div className="admin-table-container">

            <table className="admin-jobs-table">

              <thead>

                <tr>

                  <th>ID</th>

                  <th>Job Title</th>

                  <th>Company</th>

                  <th>Location</th>

                  <th>Vacancies</th>

                  <th>Last Date</th>

                  <th>Status</th>

                  <th>Action</th>

                </tr>

              </thead>


              <tbody>

                {jobs.map((job) => {

                  const expired =
                    isExpired(
                      job.last_date
                    );

                  return (

                    <tr key={job.id}>

                      <td>
                        {job.id}
                      </td>

                      <td>
                        <strong>
                          {job.job_title ||
                            "Not specified"}
                        </strong>
                      </td>

                      <td>
                        {job.company_name ||
                          "Not specified"}
                      </td>

                      <td>
                        {job.location ||
                          "Not specified"}
                      </td>

                      <td>
                        {job.vacancies ||
                          "Not specified"}
                      </td>

                      <td>
                        {job.last_date ||
                          "Not specified"}
                      </td>

                      <td>

                        {expired ? (

                          <span className="expired-status">
                            EXPIRED
                          </span>

                        ) : (

                          <span className="active-status">
                            ACTIVE
                          </span>

                        )}

                      </td>

                      <td>

                        <div className="action-buttons">
                          <Link to={`/job-details-admin/${job.id}`}>
                            View Details
                          </Link>

                          <button
                            className="delete-button"
                            onClick={() =>
                              deleteJob(job.id)
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default AdminDashboard;