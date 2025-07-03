import express from "express";

import {
  createChart,
  getAllCharts,
  getChartById,
  updateChart,
  deleteChart
} from "../controllers/chartController.js"

import  verifyToken  from "../middleware/auth.js";

const router = express.Router();


// create a new chart
router.post("/charts",verifyToken,createChart);

// get all chart (admin only for test purpose)

router.get("/charts",verifyToken,getAllCharts);

// Get Chart by id
router.get("/charts/:id",getChartById);

// Update Chart by ID (Proctected)

router.put("/charts/:id",verifyToken,updateChart);

// Delete chart by ID (Protected)
router.delete("/charts/:id", verifyToken, deleteChart);

export default router;
