import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db";

// Route imports
import authRoutes from "./routes/authRoutes";
import communityRoutes from "./routes/communityRoutes";
import ticketRoutes from "./routes/ticketRoutes";

// Model imports (to register with Sequelize)
import "./models/User";
import "./models/Community";
import "./models/JoinedCommunity";
import "./models/Ticket"; 

// Initialize dotenv
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5174",  // Your React frontend port
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/communities", communityRoutes);
app.use("/api/tickets", ticketRoutes);

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
