import express from "express";

import {
  createProposal,
  getMyProposals,
  getProjectProposals,
  getProposalById,
  updateProposalStatus,
  deleteProposal,
} from "../controllers/proposalController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createProposal);

router.get("/my", authMiddleware, getMyProposals);

router.get(
  "/project/:projectId",
  authMiddleware,
  getProjectProposals
);

router.get("/:id", authMiddleware, getProposalById);

router.put(
  "/:id/status",
  authMiddleware,
  updateProposalStatus
);

router.delete("/:id", authMiddleware, deleteProposal);

export default router;