import express from "express";

import {
  adminLogin,
  getAllUsers,
  deleteUser,
  getAllComplaints,
  updateComplaintStatus,
  blockUser,
  unblockUser,
  getAllOfficers,
  addOfficer, 
  deleteOfficer,
  addLocation,
  getLocations,
} from "../controllers/adminController.js";

import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= ADMIN LOGIN ================= */

router.post("/login", adminLogin);

/* ================= USERS ================= */

router.get("/users", verifyAdmin, getAllUsers);

router.delete("/users/:id", verifyAdmin, deleteUser);

// 🔥 BLOCK / UNBLOCK ROUTES (ADDED)
router.put("/users/block/:id", verifyAdmin, blockUser);

router.put("/users/unblock/:id", verifyAdmin, unblockUser);

/* ================= COMPLAINTS ================= */

router.get("/complaints", verifyAdmin, getAllComplaints);

/* ================= UPDATE STATUS ================= */

router.put("/update-status/:id", verifyAdmin, updateComplaintStatus);
/* ================= GET ALL OFFICERS ================= */
router.get("/officers", verifyAdmin, getAllOfficers);
/* ================= ADD OFFICER ================= */
router.post("/officers", verifyAdmin, addOfficer);
/* ================= DELETE OFFICER ================= */
router.delete("/officers/:id", verifyAdmin, deleteOfficer);
router.get("/locations", verifyAdmin, getLocations);
router.post("/locations", verifyAdmin, addLocation);

export default router;