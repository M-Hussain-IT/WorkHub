import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 150,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 5000,
    },

    budget: {
      type: Number,
      required: true,
      min: 1,
    },

    deadline: {
      type: Date,
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    status: {
      type: String,
      enum: ["open", "in-progress", "completed", "cancelled"],
      default: "open",
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;