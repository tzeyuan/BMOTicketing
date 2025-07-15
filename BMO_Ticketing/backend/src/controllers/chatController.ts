import { Request, Response } from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import Event from "../models/Event";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const chatWithAI = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: "Message is required." });
    }

    // Fetch upcoming events from DB
    const events = await Event.findAll({
      order: [["date", "ASC"]],
      limit: 10,
    });

    const eventList = events.length
      ? events
      .map((eventInstance) => {
        const event = eventInstance.toJSON(); 
        const types = Array.isArray(event.ticketTypes)
          ? event.ticketTypes.join(", ")
          : "N/A";
          return `• ${event.title} by ${event.artist} on ${event.date} at ${event.venue} (Ticket Types: ${types})`;
      })
          .join("\n")
      : "No upcoming events found.";

    const systemPrompt = `
You are BMO AI, an assistant for the BMO Ticketing website.

Website features:
- Users can browse and purchase tickets for events and concerts.
- There are discussion forums for community engagement.
- Users can shop for official merchandise.
- Admins can manage events and products.

Upcoming events:
${eventList}

If users ask about concerts, merchandise, profiles, or communities, help them navigate the site.
Also respond to general questions in a helpful, polite way.
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
