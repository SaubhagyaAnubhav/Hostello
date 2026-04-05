// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import morgan from "morgan";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";

// dotenv.config();

// // Connect to database
// await connectDB(); // Trigger restart

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));

// // Routes
// app.use('/api/auth', authRoutes);

// app.get("/", (req, res) => {
//   res.send("Hostello API is running 🚀");
// });

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   res.status(statusCode);
//   res.json({
//     message: err.message,
//     stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

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


