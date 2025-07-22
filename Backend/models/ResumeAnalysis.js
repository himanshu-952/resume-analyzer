const mongoose = require('mongoose');

const resumeAnalysisSchema = new mongoose.Schema({
  resumeText: String,
  jobDescription: String,
  result: String,
  rating: Number,
  matchPercentage: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ResumeAnalysis', resumeAnalysisSchema);
