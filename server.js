import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";

import cors from "cors";


// 🔁 Load env variables from .env
 // Adjust path if needed

// 🔗 Import Routes
//import chartRoutes from "./routes/chartRoutes.js";
import chartRoutes from "./routers/chartRoutes.js";
import userRoutes from "./routers/userRoutes.js";
import authRoutes from "./routers/authRoutes.js";

// ⚙️ Express App Init
const app = express();
app.use(express.json());

// 🛡️ Middleware
app.use(cors({
  origin: "http://localhost:3000", // frontend origin
  credentials: true
}));
app.use(express.json()); // for parsing application/json

// 🌐 MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection failed", err));

// 🛣️ Routes

app.use("/api",authRoutes);


app.get("/api/test-login", (req, res) => {
  res.send("✅ Login route base working");
});

app.use("/api", userRoutes);
app.use("/api", chartRoutes);

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
