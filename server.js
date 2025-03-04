const express = require("express");
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 5001;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
const VARIATION_LIMIT = 5; // Set limit to 5 variations

app.use(cors());
app.use(bodyParser.json());

// Debugging Logs
app.use((req, res, next) => {
    console.log(`Received ${req.method} request to ${req.url}`);
    console.log("Request Body:", req.body);
    next();
});

// Function to generate 5 ad variations
const generateVariations = (niche) => {
    const variations = [];

    for (let i = 1; i <= VARIATION_LIMIT; i++) {
        variations.push({
            primary_text: `🚀 Supercharge your ${niche} business today! Unlock growth opportunities. [Variation ${i}]`,
            headline: `🔥 Exclusive ${niche} Deals! Don't Miss Out! [Variation ${i}]`,
            description: `Discover top strategies to boost your ${niche} success. Start today! [Variation ${i}]`
        });
    }
    
    return variations;
};

// Free API Route
app.post("/api/generate-ad", (req, res) => {
    const { niche } = req.body;

    if (!niche) {
        return res.status(400).json({ error: "Niche is required." });
    }

    console.log(`Generating ads for niche: ${niche}`);

    // Generate mock variations
    const adVariations = [
        { primary_text: `Boost your ${niche} business!`, headline: `🔥 Hot ${niche} Deals!`, description: `Get the best strategies to succeed in ${niche}.` },
        { primary_text: `Dominate the ${niche} market!`, headline: `💡 Exclusive ${niche} Insights`, description: `Unlock high-converting ad copy for ${niche}.` }
    ];

    res.json({ variations: adVariations });
});

// Test Route
app.get("/", (req, res) => {
    res.send("Free AI Ad Generator is Live!");
});

app.listen(PORT, () => {
    console.log(`Free version running on http://localhost:${PORT}`);
});
