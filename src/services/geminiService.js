const API_KEY = import.meta.env.VITE_GEMINI_KEY;

export async function generateRoadmap(goal, level, hours, style) {
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
4. Each week should contain 4–6 practical topics or tasks.
5. Include projects where appropriate.

Return ONLY valid JSON in this format:

{
 "weeks":[
  {
   "week":1,
   "topics":[
    "topic 1",
    "topic 2"
   ]
  }
 ]
}

Do not include explanations outside the JSON.
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }),
    },
  );

  const data = await response.json();
  console.log(data)
  const text = data.candidates[0].content.parts[0].text;
  return text;
}
