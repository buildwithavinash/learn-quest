const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

function cleanJsonText(text) {
  return text.replace(/```json/g, "").replace(/```/g, "").trim();
}

export async function generateRoadmap(goal, level, hours, style) {
  if (!API_KEY) {
    throw new Error("Missing VITE_GROQ_API_KEY. Add it in Vercel Environment Variables and redeploy.");
  }

  const prompt = `
You are an expert learning planner.

Create a structured learning roadmap.

User goal: ${goal}
Skill level: ${level}
Daily study hours: ${hours}
Preferred learning style: ${style}

Instructions:
1. Estimate the total time needed to learn this skill from the given level.
2. Calculate how many weeks it will take based on the user's daily study hours.
3. Divide the roadmap into weekly sections.
4. Each week should contain 4-6 practical topics or tasks.
5. Include projects where appropriate.

Return ONLY valid JSON in this format:

{
  "weeks": [
    {
      "week": 1,
      "topics": [
        "topic 1",
        "topic 2"
      ]
    }
  ]
}

Do not include explanations outside the JSON.
`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch roadmap.");
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("No roadmap was returned.");
  }

  return JSON.parse(cleanJsonText(text));
}
