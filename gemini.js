export async function callOpenRouter(input) {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer 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",
                "HTTP-Referer": "<YOUR_SITE_URL>", // Optional
                "X-Title": "<YOUR_SITE_NAME>", // Optional
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-lite-preview-02-05:free",
                "messages": [
                    {
                        "role": "user",
                        "content": input
                    }
                ]
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const answer = data.choices[0].message.content;
        return answer
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

callOpenRouter('Hello')
