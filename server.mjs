import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // Ensure this is properly installed

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static("public"));

// API Route
app.post("/api/chat", async (req, res) => {
    console.log("Received request");
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer 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`, // Use env variable
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
        });

        console.log(req.body);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error fetching from OpenRouter" });
    }
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

