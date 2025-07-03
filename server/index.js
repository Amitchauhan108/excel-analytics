import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import chartRoutes from "./routes/chartRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api", chartRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
