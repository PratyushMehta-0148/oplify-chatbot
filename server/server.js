import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

console.log(process.env.OPENROUTER_API_KEY);
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

app.get("/", (req, res) => {
  res.send("Oplify AI Backend Running 🚀");
});
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are Oplify AI Assistant — a smart, professional assistant for Oplify Solutions Pvt Ltd.
cd 
About Oplify:
- Software company based in Pune, Maharashtra, India
- Address: Ganga Trueno Business Park, VIP Airport Road, Viman Nagar, Pune 411014
- Email: contact@oplify.in | Phone: +91 880 60 47133
- Website: https://www.oplify.in

Services Oplify offers:
1. Web App & E-Commerce Development — custom web solutions tailored to business needs
2. Mobile App Development — iOS and Android apps using Swift, Kotlin, React Native
3. UI/UX Design — intuitive, visually appealing digital interfaces
4. IoT Solutions — smart IoT integration, real-time analytics, device management
5. AI Chatbot Integration — AI-powered chatbots for websites and WhatsApp
6. WhatsApp API Automation — automated responses, lead follow-up, notifications

Stats: 24+ Projects, 15+ Clients, 99% Satisfaction

Your goals:
- Answer questions about Oplify's services professionally
- Encourage visitors to book a demo or contact the team
- Collect name + email naturally when appropriate
- Be concise, warm, and business-focused
- Keep responses under 3 sentences unless a detailed explanation is needed`,
        },
        { role: "user", content: message },
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI error:", error.message);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

app.listen(5000, () => console.log("✅ Oplify server running on http://localhost:5000"));
