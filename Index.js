const { GoogleGenerativeAI } = require("@google/generative-ai");

export default async function handler(req, res) {
  // Setting CORS supaya Janitor AI bisa akses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    // Janitor AI biasanya kirim data dalam format 'messages'
    const { messages } = req.body;
    const lastMessage = messages[messages.length - 1].content;

    const result = await model.generateContent(lastMessage);
    const response = await result.response;
    
    // Format response balik biar Janitor AI ngerti
    res.status(200).json({
      choices: [{
        message: {
          content: response.text()
        }
      }]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
