// Import required modules (Use require instead of import)
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON requests

// API Route - Generate Ad
app.post("/api/generate-ad", (req, res) => {
    const { niche } = req.body;

    if (!niche) {
        return res.status(400).json({ error: "Niche is required." });
    }

    console.log(`Generating ads for niche: ${niche}`);

    // Generate mock variations
    const adVariations = [
        { primary_text: `Boost your ${niche} business!`, headline: `🔥 Hot ${niche} Deals!`, description: `Get the best strategies to succeed in ${niche}.` },
        { primary_text: `Dominate the ${niche} market!`, headline: `💡 Exclusive ${niche} Insights`, description: `Unlock high-converting ad copy for ${niche}.` },
        { primary_text: `Supercharge your ${niche} marketing!`, headline: `🚀 Grow Your ${niche} Brand`, description: `Achieve high engagement with proven ad strategies.` },
        { primary_text: `Unlock powerful ${niche} opportunities!`, headline: `📈 High-Performing ${niche} Ads`, description: `Transform your business with effective campaigns.` },
        { primary_text: `Get more customers in ${niche}!`, headline: `💰 Maximize ${niche} Profits`, description: `Convert leads into sales with expert ad strategies.` }
    ];

    res.json({ variations: adVariations });
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
