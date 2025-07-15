import { Request, Response } from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const chatWithAI = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required." });
    }

    
    const events = await Event.findAll({ limit: 3, order: [["date", "ASC"]] });
    const eventList = events.map(e => `• ${e.title} on ${e.date}`).join("\n");

    const systemPrompt = `
You are BMO AI, a helpful assistant for the BMO Ticketing website.

Website features:
- Users can browse and buy tickets to upcoming concerts and events.
- There are fan communities where users can post discussions and reply.
- Users can register, log in, and manage their profile.
- A merchandise section allows users to view, add to cart, and purchase official products.
- Admins can manage events and products through the admin interface.

If users ask about upcoming concerts or merchandise, suggest checking the respective pages.
For general knowledge questions, respond like a helpful assistant.
    `.trim();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({ message: "No reply from AI." });
    }

    res.json({ reply });

  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ message: "AI error", error: (err as Error).message });
  }
};
