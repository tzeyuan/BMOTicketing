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
import threadRoutes from "./routes/threadRoutes";
import merchRoutes from "./routes/merchRoutes";
import chatRoutes from "./routes/chatRoutes";
import reportRoutes from "./routes/reportRoutes";

// Model imports (to register with Sequelize)
import User from "./models/User";
import Community from "./models/Community";
import JoinedCommunity from "./models/JoinedCommunity";
import Ticket from "./models/Ticket";
import Event from "./models/Event";
import Thread from "./models/Thread";
import Reply from "./models/Reply";
import Merchandise from  "./models/Merchandise"; 


//Define associations
Thread.belongsTo(User, { foreignKey: "userId", as: "user" });
Thread.hasMany(Reply, { foreignKey: "threadId", as: "replies" });

Reply.belongsTo(Thread, { foreignKey: "threadId" });
Reply.belongsTo(User, { foreignKey: "userId", as: "user" });

JoinedCommunity.belongsTo(User, { foreignKey: "userId" });
JoinedCommunity.belongsTo(Community, { foreignKey: "communityId" });

// Many-to-Many association between User and Community through JoinedCommunity
User.belongsToMany(Community, {
  through: JoinedCommunity,
  foreignKey: "userId",
  as: "joinedCommunities",
});
Community.belongsToMany(User, {
  through: JoinedCommunity,
  foreignKey: "communityId",
  as: "members",
});

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
app.use("/api/threads", threadRoutes);
app.use("/api/merchandise", merchRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/reports", reportRoutes);

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
