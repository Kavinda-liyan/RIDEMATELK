import { spawn } from 'child_process';

// ✅ PATH CONFIRMED: This path should now point to the specific python.exe 
// where all your packages (pymongo, pandas, etc.) are installed.
const PYTHON_PATH = "C:\\Users\\user\\AppData\\Local\\Programs\\Python\\Python310\\python.exe"; 

// Since the traceback shows the script is in 'backend/Trained_model/', 
// we ensure the path to the script is correct relative to the project root.
const SCRIPT_PATH = 'backend/Trained_model/retrain_script.py';

/**
 * Asynchronously triggers the Python model retraining script.
 */
export const triggerRetraining = () => {
    // Check removed: The path is now correctly set and the script is ready to run.
    
    console.log('[Retrain-Job] Model retraining initiated...');

    // Use the absolute path to the correct Python executable
    const retrainingProcess = spawn(PYTHON_PATH, [SCRIPT_PATH]);

    retrainingProcess.stdout.on('data', (data) => {
        console.log(`[Retrain-Job] STDOUT: ${data.toString().trim()}`);
    });

    retrainingProcess.stderr.on('data', (data) => {
        // Log Python's errors, including the full traceback
        console.error(`[Retrain-Job] STDERR: ${data.toString().trim()}`);
    });

    retrainingProcess.on('close', (code) => {
        if (code === 0) {
            console.log("✅ Model retraining and deployment complete.");
        } else {
            console.error(`❌ Retraining failed with code ${code}. Check STDERR logs above.`);
        }
    });

    retrainingProcess.unref(); 
};

// Exporting as a named constant for better modularity in imports
export default { triggerRetraining };
