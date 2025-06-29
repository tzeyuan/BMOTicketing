import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "../config/db";
import authRoutes from "./routes/authRoutes";
import communityRoutes from "./routes/communityRoutes";
import Community from "./models/Community";
import JoinedCommunity from "./models/JoinedCommunity";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/communities", communityRoutes);

sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced");
  app.listen(Number(process.env.PORT) || 5000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});