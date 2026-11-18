const GROQ_MODELS = [
  "openai/gpt-oss-20b",
  "openai/gpt-oss-120b",
  "qwen/qwen3.8-27b"
];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = (process.env.GROQ_API_KEY || "").trim();
  if (!apiKey) {
    return res.status(500).json({ error: "GROQ_API_KEY is missing in Vercel." });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  const prompt = body?.prompt;
  const host = ["api", "groq", "com"].join(".");
  const groqEndpoint = `https://${host}/openai/v1/chat/completions`;

  let lastError = "All models busy. Please wait 3 seconds and try again.";

  for (const model of GROQ_MODELS) {
    try {
      const response = await fetch(groqEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "json_object" },
          max_tokens: 2200
        })
      });

      const text = await response.text();
      if (response.ok) {
        return res.status(200).json(JSON.parse(text));
      }

      if (response.status === 429) {
        lastError = `Rate limit on ${model}, trying fallback...`;
        continue;
      }

      lastError = `Groq HTTP ${response.status} (${model}): ${text}`;
    } catch (err) {
      lastError = err.message;
    }
  }

  return res.status(429).json({ error: lastError });
}
