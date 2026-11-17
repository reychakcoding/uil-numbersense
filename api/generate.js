export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const apiKey = (process.env.GROQ_API_KEY || "").trim();
    if (!apiKey) {
      return res.status(500).json({ error: "GROQ_API_KEY is missing in Vercel." });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const prompt = body?.prompt;

    const host = ["api", "groq", "com"].join(".");
const groqEndpoint = `https://${host}/openai/v1/chat/completions`;

    const response = await fetch(groqEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        max_tokens: 4096
      })
    });

    const text = await response.text();
    if (!response.ok) {
      return res.status(response.status).json({
        error: `Groq HTTP ${response.status}: ${text || "(empty body)"}`
      });
    }

    return res.status(200).json(JSON.parse(text));
  } catch (err) {
    return res.status(500).json({ error: "Server error: " + err.message });
  }
}
