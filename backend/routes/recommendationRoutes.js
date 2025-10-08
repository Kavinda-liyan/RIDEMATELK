import express from "express";
import { spawn } from "child_process";
import path from "path";

const router = express.Router();

const PYTHON_PATH =
  "C:\\Users\\user\\AppData\\Local\\Programs\\Python\\Python310\\python.exe";
const SCRIPT_PATH = path.join(
  process.cwd(),
  "Trained_model",
  "recommend_service.py"
);

router.post("/", (req, res) => {
  const userPreferences = req.body;

  if (!userPreferences) {
    return res.status(400).json({ message: "No user preferences provided." });
  }

  console.log("[Prediction-Job] Starting recommendation process...");

  // Spawn Python process first
  const pythonProcess = spawn(PYTHON_PATH, [SCRIPT_PATH]);

  let data = "";
  let errorData = "";

  // Send user preferences via stdin
  pythonProcess.stdin.write(JSON.stringify(userPreferences));
  pythonProcess.stdin.end();

  pythonProcess.stdout.on("data", (chunk) => {
    data += chunk.toString();
  });

  pythonProcess.stderr.on("data", (chunk) => {
    errorData += chunk.toString();
  });

  pythonProcess.on("close", (code) => {
    if (code !== 0) {
      console.error(
        `Python script failed with code ${code}. STDERR: ${errorData}`
      );
      return res.status(500).json({
        message: "Recommendation service failed.",
        details: errorData || data,
      });
    }

    try {
      console.log("RAW PYTHON OUTPUT:", data);
      const result = JSON.parse(data);

      if (result.error) {
        console.error(`[Prediction-Job] Script Error: ${result.error}`);
        return res.status(500).json({
          message: "Error in Python logic.",
          details: result.error,
        });
      }

      console.log("Recommendations generated successfully.");
      res.json({
        recommendations: result.recommendations || [],
      });
    } catch (e) {
      console.error("Failed to parse Python output:", data);
      res.status(500).json({
        message: "Invalid JSON from Python.",
        details: e.message,
      });
    }
  });

  pythonProcess.on("error", (err) => {
    console.error(`Failed to start Python process. Error: ${err.message}`);
    res.status(500).json({
      message: "Could not execute Python interpreter.",
      details: err.message,
    });
  });
});

export default router;
