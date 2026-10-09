import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Jobs from "./pages/Jobs/Jobs";
import About from "./pages/About/About";
import Companies from "./pages/Companies/Companies";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import JobDetails from "./pages/JobDetails/JobDetails";
import PostJob from "./pages/PostJob";
import ApplyJob from "./pages/ApplyJob";
import MyApplications from "./pages/MyApplications";
import EmployerDashboard from "./pages/EmployerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/jobs" element={<Jobs />} />

          <Route path="/companies" element={<Companies />} />

          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/job/:id" element={<JobDetails />} />

          {/* Apply Job */}
          <Route
            path="/job/:id/apply"
            element={<ApplyJob />}
          />
          <Route
            path="/my-applications"
            element={<MyApplications />}
          />

          <Route
            path="/employer-dashboard"
            element={<EmployerDashboard />}
          />

          <Route path="/post-job" element={<PostJob />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;