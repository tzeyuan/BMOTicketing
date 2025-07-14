import { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

export const chatWithAI = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: completion.data.choices[0].message?.content });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ message: "AI error" });
  }
};
