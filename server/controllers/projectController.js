import Project from "../models/Project.js";

// ==========================================
// CREATE PROJECT
// ==========================================
export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      budget,
      deadline,
      category,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      budget === undefined ||
      !deadline ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, description, budget, deadline and category are required.",
      });
    }

    // Only clients can create projects
    if (req.user.role !== "client") {
      return res.status(403).json({
        success: false,
        message: "Only clients can create projects.",
      });
    }

    // Validate budget
    if (Number(budget) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Budget must be greater than zero.",
      });
    }

    // Validate deadline
    const projectDeadline = new Date(deadline);

    if (Number.isNaN(projectDeadline.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid deadline.",
      });
    }

    if (projectDeadline <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "Deadline must be in the future.",
      });
    }

    // Create project
    const project = await Project.create({
      title: title.trim(),
      description: description.trim(),
      budget: Number(budget),
      deadline: projectDeadline,
      category: category.trim(),
      client: req.user.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully.",
      project,
    });
  } catch (error) {
    console.error("Create project error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while creating project.",
    });
  }
};


// ==========================================
// GET ALL OPEN PROJECTS
// ==========================================
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: "open" })
      .populate("client", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error("Get projects error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching projects.",
    });
  }
};


// ==========================================
// GET SINGLE PROJECT
// ==========================================
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("client", "name email");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Get project error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching project.",
    });
  }
};


// ==========================================
// GET MY PROJECTS
// ==========================================
export const getMyProjects = async (req, res) => {
  try {
    if (req.user.role !== "client") {
      return res.status(403).json({
        success: false,
        message: "Only clients can access their project list.",
      });
    }

    const projects = await Project.find({
      client: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error("Get my projects error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching your projects.",
    });
  }
};


// ==========================================
// UPDATE PROJECT
// ==========================================
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    // Only the owner can edit the project
    if (project.client.toString() !== req.user.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this project.",
      });
    }

    if (req.user.role !== "client") {
      return res.status(403).json({
        success: false,
        message: "Only clients can update projects.",
      });
    }

    const {
      title,
      description,
      budget,
      deadline,
      category,
      status,
    } = req.body;

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Title cannot be empty.",
        });
      }

      project.title = title.trim();
    }

    if (description !== undefined) {
      if (!description.trim()) {
        return res.status(400).json({
          success: false,
          message: "Description cannot be empty.",
        });
      }

      project.description = description.trim();
    }

    if (budget !== undefined) {
      if (Number(budget) <= 0) {
        return res.status(400).json({
          success: false,
          message: "Budget must be greater than zero.",
        });
      }

      project.budget = Number(budget);
    }

    if (deadline !== undefined) {
      const newDeadline = new Date(deadline);

      if (Number.isNaN(newDeadline.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid deadline.",
        });
      }

      project.deadline = newDeadline;
    }

    if (category !== undefined) {
      if (!category.trim()) {
        return res.status(400).json({
          success: false,
          message: "Category cannot be empty.",
        });
      }

      project.category = category.trim();
    }

    if (status !== undefined) {
      const allowedStatuses = [
        "open",
        "in-progress",
        "completed",
        "cancelled",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid project status.",
        });
      }

      project.status = status;
    }

    const updatedProject = await project.save();

    return res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Update project error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while updating project.",
    });
  }
};


// ==========================================
// DELETE PROJECT
// ==========================================
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    // Only owner can delete
    if (project.client.toString() !== req.user.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this project.",
      });
    }

    if (req.user.role !== "client") {
      return res.status(403).json({
        success: false,
        message: "Only clients can delete projects.",
      });
    }

    await project.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error("Delete project error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while deleting project.",
    });
  }
};