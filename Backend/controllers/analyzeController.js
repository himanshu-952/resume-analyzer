const genAI = require("../geminiConfig");
const ResumeAnalysis = require("../models/ResumeAnalysis");

const analyzeResume = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({ error: "Missing resume or job description." });
    }

    // Prompt Gemini API
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
    const prompt = `
Evaluate the given resume against the job description and provide:

1. Strengths
2. Weaknesses
3. Match Percentage (as a number, like 75%)
4. A short reasoning

Resume:
${resumeText}

Job Description:
${jobDescription}
    `;

    const result = await model.generateContent(prompt);
    let analysis = result.response.text();
    analysis = analysis.replace(/\. /g, '.\n');

    // Extract match percentage from analysis
    const match = analysis.match(/Match Percentage:\s*(\d{1,3})%/i);
    const matchPercentage = match ? parseInt(match[1]) : null;
    const rating = matchPercentage !== null ? matchPercentage : 0;

    // Save to MongoDB (no userId)
    const saved = await ResumeAnalysis.create({
      resumeText,
      jobDescription,
      result: analysis,
      rating,
      matchPercentage: matchPercentage !== null ? `${matchPercentage}%` : "N/A"
    });

    res.json({
      analysis,
      rating,
      matchPercentage: matchPercentage !== null ? `${matchPercentage}%` : "N/A",
      id: saved._id
    });

  } catch (err) {
    console.error("❌ Error analyzing resume:", err.message);
    res.status(500).json({ error: "Failed to analyze resume" });
  }
};

module.exports = analyzeResume;
