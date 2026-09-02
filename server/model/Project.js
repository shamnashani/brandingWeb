const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    page: {
      type: String,
      required: true,
      enum: ["construction", "film", "infroge"],
    },

    photo: { type: String, default: "" },     
    photoId: { type: String, default: "" },   // Cloudinary public_id, for delete/replace

  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;