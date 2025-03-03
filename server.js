const express = require("express");
import cors from "cors";
import bodyParser from "body-parser";
import { exec } from "child_process";
import util from "util";

const express = require("express");
const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Test server is working!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Test server running on http://localhost:${PORT}`);
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const execPromise = util.promisify(exec);

// Debugging: Log every request
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

// Function to generate an ad using Ollama
const generateAd = async (niche) => {
  try {
    console.log(`Generating ad for niche: ${niche}`);
    
    // Run Ollama as an async command
    const { stdout, stderr } = await execPromise(
      `ollama run mistral "Generate a high-converting Facebook ad for a ${niche} business. Include:
      - Ad Title
      - Ad Copy
      - Short Description"`
    );

    if (stderr) {
      console.error("Ollama Error:", stderr);
      throw new Error("Failed to generate ad with Ollama.");
    }

    console.log("Ollama Raw Output:", stdout);

    // Extract Ad Title, Copy, and Description
    const lines = stdout.trim().split("\n").map(line => line.trim());
    let title = "Generated Ad Title";
    let copy = "Generated Ad Copy";
    let description = "Generated Ad Description";

    lines.forEach(line => {
      if (line.startsWith("**Ad Title:**")) title = line.replace("**Ad Title:**", "").trim();
      if (line.startsWith("**Ad Copy:**")) copy = line.replace("**Ad Copy:**", "").trim();
      if (line.startsWith("**Short Description:**")) description = line.replace("**Short Description:**", "").trim();
    });

    // Remove extra notes if Ollama includes them
    description = description.split("Note:")[0].trim();

    return { title, copy, description };
  } catch (error) {
    console.error("Error in generating ad:", error.message);
    throw new Error("Ad generation failed.");
  }
};

// API route for ad generation
app.post("/api/generate-ad", async (req, res) => {
  try {
    console.log("Received Body:", req.body); // 🔥 Log request body

    const { niche } = req.body;
    if (!niche) {
      console.error("❌ Missing 'niche' in request body!");
      return res.status(400).json({ error: "Niche is required." });
    }

    console.log(`Generating ad for niche: ${niche}`);
    const ad = await generateAd(niche);
    res.json(ad);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Server error." });
  }
});
