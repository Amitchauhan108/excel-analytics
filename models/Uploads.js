import mongoose from "mongoose";

const chartSchema = new mongoose.Schema({
  id: String,
  type: String,
  xAxis: String,
  yAxis: String,
  data: Object,
  createdAt: Date
});

const uploadSchema = new mongoose.Schema({
  userId: String,
  filename: String,
  uploadDate: { type: Date, default: Date.now },
  data: [Object],
  columns: [String],
  charts: [chartSchema]
});

export default mongoose.model("Upload", uploadSchema);
