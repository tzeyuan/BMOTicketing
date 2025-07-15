import { Request, Response } from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const chatWithAI = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message) return res.status(400).json({ message: "Message is required." });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
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
