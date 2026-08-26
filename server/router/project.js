const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Project = require("../model/Project");

// =====================================================
// Multer Storage
// =====================================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "media");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


// =====================================================
// ADD PROJECT
//=====================================================

router.post("/projects", upload.single("photo"), async (req, res) => {
  try {
    const { title, category, page } = req.body;

    const photo = req.file ? req.file.filename : "";

    const project = new Project({
      title,
      category,
      page,
      photo,
    });

    await project.save();

    res.status(201).json({
      status: "ok",
      message: "Project added successfully",
      data: project,
    });

  } catch (err) {
    console.error("Add project error:", err);

    res.status(500).json({
      status: "error",
      message: "Failed to add project",
    });
  }
});


// =====================================================
// VIEW ALL PROJECTS
// GET /project/viewprojects
// =====================================================

router.get("/viewprojects", async (req, res) => {
  try {
    const { page } = req.query;

    const filter = {};

    if (page) {
      filter.page = page;
    }

    const projects = await Project.find(filter).sort({
      createdAt: -1,
    });

    res.json({
      status: "ok",
      data: projects,
    });

  } catch (err) {
    console.error("View projects error:", err);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch projects",
    });
  }
});


// =====================================================
// VIEW SINGLE PROJECT
// GET /project/viewproject/:id
// =====================================================

router.get("/viewproject/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    res.json({
      status: "ok",
      data: project,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch project",
    });
  }
});


// =====================================================
// EDIT PROJECT
// PUT /project/editproject/:id
// =====================================================

router.put(
  "/editproject/:id",
  upload.single("photo"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, category, page } = req.body;

      const project = await Project.findById(id);

      if (!project) {
        return res.status(404).json({
          status: "error",
          message: "Project not found",
        });
      }

      // -----------------------------------------------
      // If new image uploaded
      // -----------------------------------------------

      if (req.file) {

        // Delete old image
        if (project.photo) {

          const oldImagePath = path.join(
            __dirname,
            "../media",
            project.photo
          );

          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }

        // Save new image
        project.photo = req.file.filename;
      }

      // -----------------------------------------------
      // Update fields
      // -----------------------------------------------

      project.title = title;
      project.category = category;
      project.page = page;

      await project.save();

      res.json({
        status: "ok",
        message: "Project updated successfully",
        data: project,
      });

    } catch (err) {
      console.error("Edit project error:", err);

      res.status(500).json({
        status: "error",
        message: "Failed to update project",
      });
    }
  }
);


// =====================================================
// DELETE PROJECT
// DELETE /project/deleteproject/:id
// =====================================================

router.delete("/deleteproject/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    // -----------------------------------------------
    // Delete image from media folder
    // -----------------------------------------------

    if (project.photo) {

      const imagePath = path.join(
        __dirname,
        "../media",
        project.photo
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // -----------------------------------------------
    // Delete project from database
    // -----------------------------------------------

    await Project.findByIdAndDelete(id);

    res.json({
      status: "ok",
      message: "Project deleted successfully",
    });

  } catch (err) {
    console.error("Delete project error:", err);

    res.status(500).json({
      status: "error",
      message: "Failed to delete project",
    });
  }
});


module.exports = router;