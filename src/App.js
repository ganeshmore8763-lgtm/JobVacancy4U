import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import AdmitCard from "./pages/AdmitCard";
import AddJob from "./pages/AddJob";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import JobDetailsAdmin from "./pages/JobDetailsAdmin";
import About from "./pages/About";

import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import AdminDashboard from "./pages/AdminDashboard";
import ResetPassword from "./pages/ResetPassword";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="App">

      <BrowserRouter>

        <Navbar />

        <Routes>

          {/* =========================
              PUBLIC PAGES
          ========================= */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/admit-card"
            element={<AdmitCard />}
          />

          <Route
            path="/jobs"
            element={<Jobs />}
          />

          {/* PUBLIC JOB DETAILS */}
          <Route
            path="/jobs/:id"
            element={<JobDetails />}
          />

          <Route
            path="/about"
            element={<About />}
          />


          {/* =========================
              ADMIN PAGES
          ========================= */}

          {/* ADMIN LOGIN */}
          <Route
            path="/admin-login"
            element={<AdminLogin />}
          />

          {/* ADMIN SIGNUP */}
          <Route
            path="/admin-signup"
            element={<AdminSignup />}
          />

          {/* ADMIN DASHBOARD */}
          <Route
            path="/AdminDashboard"
            element={<AdminDashboard />}
          />

          {/* ADMIN JOB DETAILS */}
          <Route
            path="/job-details-admin/:id"
            element={<JobDetailsAdmin />}
          />

          {/* ADD JOB */}
          <Route
            path="/add-job"
            element={<AddJob />}
          />

          {/* RESET PASSWORD */}
          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />

        </Routes>
        <Footer />

      </BrowserRouter>

    </div>
  );
}

export default App;