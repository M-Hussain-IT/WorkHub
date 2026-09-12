import Proposal from "../models/Proposal.js";
import Project from "../models/Project.js";

// ==========================================
// CREATE PROPOSAL
// ==========================================
export const createProposal = async (req, res) => {
  try {
    const {
      project,
      coverLetter,
      bidAmount,
      estimatedDays,
    } = req.body;

    if (
      !project ||
      !coverLetter ||
      !bidAmount ||
      !estimatedDays
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Project, cover letter, bid amount and estimated days are required.",
      });
    }

    if (req.user.role !== "freelancer") {
      return res.status(403).json({
        success: false,
        message: "Only freelancers can submit proposals.",
      });
    }

    const projectData = await Project.findById(project);

    if (!projectData) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    if (projectData.status !== "open") {
      return res.status(400).json({
        success: false,
        message: "This project is no longer accepting proposals.",
      });
    }

    const existingProposal = await Proposal.findOne({
      project,
      freelancer: req.user.userId,
    });

    if (existingProposal) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted a proposal for this project.",
      });
    }

    const proposal = await Proposal.create({
      project,
      freelancer: req.user.userId,
      coverLetter: coverLetter.trim(),
      bidAmount: Number(bidAmount),
      estimatedDays: Number(estimatedDays),
    });

    return res.status(201).json({
      success: true,
      message: "Proposal submitted successfully.",
      proposal,
    });
  } catch (error) {
    console.error("Create proposal error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while submitting proposal.",
    });
  }
};


// ==========================================
// GET MY PROPOSALS
// ==========================================
export const getMyProposals = async (req, res) => {
  try {
    if (req.user.role !== "freelancer") {
      return res.status(403).json({
        success: false,
        message: "Only freelancers can access their proposals.",
      });
    }

    const proposals = await Proposal.find({
      freelancer: req.user.userId,
    })
      .populate("project", "title budget deadline category status")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: proposals.length,
      proposals,
    });
  } catch (error) {
    console.error("Get my proposals error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching proposals.",
    });
  }
};


// ==========================================
// GET PROPOSALS FOR A PROJECT
// ==========================================
export const getProjectProposals = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    if (project.client.toString() !== req.user.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view these proposals.",
      });
    }

    const proposals = await Proposal.find({
      project: req.params.projectId,
    })
      .populate(
        "freelancer",
        "name email profileImage bio skills location"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: proposals.length,
      proposals,
    });
  } catch (error) {
    console.error("Get project proposals error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching project proposals.",
    });
  }
};


// ==========================================
// GET SINGLE PROPOSAL
// ==========================================
export const getProposalById = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id)
      .populate("project", "title budget deadline category status")
      .populate(
        "freelancer",
        "name email profileImage bio skills location"
      );

    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found.",
      });
    }

    const isFreelancer =
      proposal.freelancer._id.toString() ===
      req.user.userId.toString();

    const project = await Project.findById(proposal.project._id);

    const isClient =
      project &&
      project.client.toString() === req.user.userId.toString();

    if (!isFreelancer && !isClient) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this proposal.",
      });
    }

    return res.status(200).json({
      success: true,
      proposal,
    });
  } catch (error) {
    console.error("Get proposal error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching proposal.",
    });
  }
};


// ==========================================
// UPDATE PROPOSAL STATUS
// ==========================================
export const updateProposalStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be accepted or rejected.",
      });
    }

    const proposal = await Proposal.findById(req.params.id);

    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found.",
      });
    }

    const project = await Project.findById(proposal.project);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    if (
      project.client.toString() !==
      req.user.userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Only the project owner can update proposal status.",
      });
    }

    proposal.status = status;

    // If a proposal is accepted, mark the project in progress.
    if (status === "accepted") {
      project.status = "in-progress";
      await project.save();

      // Reject other pending proposals for same project.
      await Proposal.updateMany(
        {
          project: project._id,
          _id: { $ne: proposal._id },
          status: "pending",
        },
        {
          $set: { status: "rejected" },
        }
      );
    }

    await proposal.save();

    return res.status(200).json({
      success: true,
      message: `Proposal ${status} successfully.`,
      proposal,
    });
  } catch (error) {
    console.error("Update proposal status error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while updating proposal.",
    });
  }
};


// ==========================================
// DELETE PROPOSAL
// ==========================================
export const deleteProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);

    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found.",
      });
    }

    if (
      proposal.freelancer.toString() !==
      req.user.userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own proposal.",
      });
    }

    if (proposal.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending proposals can be deleted.",
      });
    }

    await proposal.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Proposal deleted successfully.",
    });
  } catch (error) {
    console.error("Delete proposal error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while deleting proposal.",
    });
  }
};