import mongoose from "mongoose";

const chartSchema = new mongoose.Schema({
  title: String,
  type: String, // 'bar', 'line', etc.
  labels: [String],
  dataset: [Number],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Chart", chartSchema);
