import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

app.post("/generate-ad", async (req, res) => {
  try {
    const { niche } = req.body;

    if (!niche) {
      return res.status(400).json({ error: "Niche is required" });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an expert in ad copywriting." },
        {
          role: "user",
          content: `Generate 3 Facebook ad variations for the niche: ${niche}. Each should include a primary text, headline, and description.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 250,
    });

    res.json({ ads: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error generating ad:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
