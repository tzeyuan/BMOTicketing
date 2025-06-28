const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const communityRoutes = require("./routes/communityRoutes");
import Community from "./models/Community";
import JoinedCommunity from "./models/JoinedCommunity";


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/communities", communityRoutes);


sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});

sequelize.sync({ alter: true })  // or { force: true } for first time
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("DB sync error", err));
