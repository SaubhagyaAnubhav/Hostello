import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import noticeRoutes from './routes/noticeRoutes.js';

dotenv.config();

const startServer = async () => {
  await connectDB();

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));

  app.use("/api/auth", authRoutes);
  app.use("/api/complaints", complaintRoutes);
  app.use('/api/notices', noticeRoutes);

  app.listen(process.env.PORT || 5000, () =>
    console.log("Server running 🚀")
  );
};

startServer();


