import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db";

// Route imports
import authRoutes from "./routes/authRoutes";
import communityRoutes from "./routes/communityRoutes";
import ticketRoutes from "./routes/ticketRoutes";
import eventRoutes from "./routes/eventRoutes";
import userRoutes from "./routes/userRoutes";

// Model imports (to register with Sequelize)
import "./models/User";
import "./models/Community";
import "./models/JoinedCommunity";
import "./models/Ticket"; 
import "./models/Event";

// Initialize dotenv
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/communities", communityRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);  

// Server start
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced");
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err: unknown) => {
  console.error("DB sync error:", err);
});
