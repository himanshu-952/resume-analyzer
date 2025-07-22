import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Resume Analyzer</h1>
      <p>This tool helps you evaluate how well your resume matches a job.</p>
      <Link to="/analyze" className="start-link">
        Start Analysis
      </Link>
      <Footer />
    </div>
  );
}

export default Home;
