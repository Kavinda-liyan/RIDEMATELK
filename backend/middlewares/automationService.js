import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// working environment python path
const PYTHON_PATH =
  "C:\\Users\\user\\AppData\\Local\\Programs\\Python\\Python310\\python.exe";

//script path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SCRIPT_PATH = path.join(
  __dirname,
  "..",
  "Trained_model",
  "retrain_script.py"
);

const triggerRetraining = () => {
  console.log("[Retrain-Job] Model retraining initiated...");

  const retrainingProcess = spawn(PYTHON_PATH, [SCRIPT_PATH]);

  retrainingProcess.stdout.on("data", (data) => {
    console.log(`[Retrain-Job] STDOUT: ${data.toString().trim()}`);
  });

  retrainingProcess.stderr.on("data", (data) => {
    console.error(`[Retrain-Job] STDERR: ${data.toString().trim()}`);
  });

  retrainingProcess.on("close", (code) => {
    if (code === 0) {
      console.log("Model retraining and deployment complete.");
    } else {
      console.error(
        `Retraining failed with code ${code}. Check STDERR logs above.`
      );
    }
  });

  retrainingProcess.unref();
};

export default triggerRetraining;
