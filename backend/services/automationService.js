import { spawn } from 'child_process';

/**
 * Asynchronously triggers the Python model retraining script.
 * This runs in the background and is non-blocking.
 */
export const triggerRetraining = () => {
    console.log('[Retrain-Job] Model retraining initiated...');

    // Execute retrain_script.py
    // Use the absolute path to the Python executable if 'python' doesn't work.
    const pythonProcess = spawn('python', ['retrain_script.py']);

    // Log Python's output for debugging
    pythonProcess.stdout.on('data', (data) => {
        console.log(`[Retrain-Job] STDOUT: ${data.toString().trim()}`);
    });

    // Log Python's errors
    pythonProcess.stderr.on('data', (data) => {
        console.error(`[Retrain-Job] STDERR: ${data.toString().trim()}`);
    });

    // Handle the closing of the process
    pythonProcess.on('close', (code) => {
        if (code === 0) {
            console.log(`[Retrain-Job] Process finished successfully.`);
        } else {
            console.error(`[Retrain-Job] WARNING: Process exited with code ${code}. Check STDERR logs.`);
        }
    });

    pythonProcess.on('error', (err) => {
        console.error(`[Retrain-Job] FATAL ERROR: Failed to start Python process. Ensure Python and all libraries are installed. Error: ${err.message}`);
    });
};
