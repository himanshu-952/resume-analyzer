import React, { useState } from "react";
import "../styles/Analysis.css";
import axios from "axios";

function Analysis() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/analyze", {
        resumeText,
        jobDescription,
      });
      setAnalysisResult(response.data.analysis);
    } catch (error) {
      console.error("❌ Error analyzing resume:", error);
      setAnalysisResult("Something went wrong. Please try again later."+`${error}`);
    }
    setLoading(false);
  };

  const handleClear = () => {
    setResumeText("");
    setJobDescription("");
    setAnalysisResult("");
  };

  return (
    <div className="analysis-container">
      <h2>Resume Analyzer</h2>

      <label>Paste Resume:</label>
      <textarea
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        placeholder="Paste your resume here..."
      ></textarea>

      <label>Paste Job Description:</label>
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste the job description here..."
      ></textarea>

      <div className="button-group">
        <button
          onClick={handleAnalyze}
          disabled={loading || !resumeText || !jobDescription}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
        <button onClick={handleClear} className="clear-btn">
          Clear
        </button>
      </div>

      {analysisResult && (
        <div className="result-box">
          <h3>Result:</h3>
          <pre>{analysisResult}</pre>
        </div>
      )}
    </div>
  );
}

export default Analysis;
