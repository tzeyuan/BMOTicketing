import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db";         
import authRoutes from "./routes/authRoutes";
import communityRoutes from "./routes/communityRoutes";
import "./models/Community";
import "./models/JoinedCommunity";
import ticketRoutes from "./routes/ticketRoutes";


dotenv.config();
const app = express();

app.use(cors()); 
app.use(express.json());

app.use("/api/auth", authRoutes); 
app.use("/api/communities", communityRoutes);
app.use("/api/tickets", ticketRoutes);


const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced");
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err: unknown) => {
    console.error("DB sync error:", err);
  });