export async function explainExpression(expr, result) {
  if (!expr || !result) {
    return "Type something (e.g., (4+7), press =, then click Ask AI)";
  }

  const key = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!key) {
    return "Missing API key.";
  }

  const systemPrompt =
    "You are a kind tutor for absolute beginners. Explain like to a 10-year-old. " +
    "Use 3–7 short bullet steps. Prefer everyday words. Do not invent new numbers. " +
    "Explain the order of operations if relevant. End with a one-line recap.";

  const userPrompt =
    `Expression: ${expr}\n` +
    `Result: ${result}\n` +
    `Explain simply, in steps, without extra symbols.`;

  const body = {
    model: "google/gemini-flash-1.5 " || "openai/gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
  };

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text(); // helpful for debugging
      console.error("OpenRouter error:", errorText);
      return "AI request failed. Check your key, model name, or network.";
    }

    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content?.trim();

    return text || "AI did not return any explanation.";
  } catch (err) {
    console.error("Fetch error:", err);
    return "Could not reach AI service. Please try again.";
  }
}