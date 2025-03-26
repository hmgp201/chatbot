import express from "express";
import cors from "cors";
import fetch from "node-fetch"; 

const app = express();


app.use(cors());
app.use(express.json());


app.use(express.static("public"));


app.post("/api/chat", async (req, res) => {
    console.log("Received request");
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer`, // removed API coz I need to figure out env
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

