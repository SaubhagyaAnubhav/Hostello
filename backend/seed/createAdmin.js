import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const targetEmail = process.env.ADMIN_EMAIL;
    const targetPassword = process.env.ADMIN_PASSWORD;
    const targetName = process.env.ADMIN_NAME || "Hostello Admin";

    if (!targetEmail || !targetPassword) {
      throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
    }

    const existingAdmin = await User.findOne({ email: targetEmail });

    if (existingAdmin) {
      console.log(`Admin ${targetEmail} already exists!`);
      process.exit(0);
    }

    await User.create({
      name: targetName,
      email: targetEmail,
      password: targetPassword,
      role: "admin",
    });

    console.log("Admin user created successfully!");
    console.log(`Email: ${targetEmail}`);
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();