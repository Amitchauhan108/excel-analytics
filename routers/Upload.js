import express from "express";
const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/isAdmin.js";

import {
  uploadExcel,
  getUserUploads,
  getAllUploads,
} from "../controllers/uploadController.js";

// ✅ POST: Upload Excel file (only for logged-in users)
router.post("/upload", protect, uploadExcel);

// ✅ GET: Get uploads of the logged-in user
router.get("/my-uploads", protect, getUserUploads);

// ✅ GET: Admin-only - view all uploads
router.get("/admin/uploads", protect, isAdmin, getAllUploads);

export default router;
