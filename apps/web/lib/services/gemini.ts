const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

interface GeminiPayload {
  contents: Array<{
    parts: Array<{ text: string }>;
  }>;
  systemInstruction: {
    parts: Array<{ text: string }>;
  };
  generationConfig?: {
    responseMimeType: "application/json";
    responseSchema: Record<string, unknown>;
  };
}

export const fetchGeminiAPI = async (prompt: string, isJson = false) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const payload: GeminiPayload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: {
      parts: [
        {
          text: "Kamu adalah 'Oracle Kosmik', asisten AI Astrolearn. Jelaskan konsep astronomi dengan cara yang menyenangkan, ringkas, dan mudah dipahami, layaknya kapten pesawat luar angkasa yang sedang mengajari kadetnya.",
        },
      ],
    },
  };

  if (isJson) {
    payload.generationConfig = {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          questions: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                question: { type: "STRING" },
                options: { type: "ARRAY", items: { type: "STRING" } },
                correctIndex: { type: "INTEGER" },
                explanation: { type: "STRING" },
              },
              required: ["question", "options", "correctIndex", "explanation"],
            },
          },
        },
        required: ["questions"],
      },
    };
  }

  const delays = [1000, 2000, 4000, 8000, 16000];

  for (let i = 0; i <= delays.length; i++) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const data = await response.json();
      const responseText = data.candidates[0].content.parts[0].text;

      return isJson ? JSON.parse(responseText) : responseText;
    } catch {
      if (i === delays.length) {
        throw new Error("Sistem komunikasi antar galaksi sedang terganggu.");
      }

      await new Promise((resolve) => setTimeout(resolve, delays[i]));
    }
  }
};
