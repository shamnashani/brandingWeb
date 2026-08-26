const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Service = require("../model/Service");
const fs = require("fs");

// ================= Multer Storage =================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "media");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ================= Add Service =================

router.post("/services", upload.single("photo"), async (req, res) => {
  try {
    const { title, description, page } = req.body;

    const photo = req.file ? req.file.filename : "";

    const service = new Service({
      title,
      description,
      page,
      photo,
    });

    await service.save();

    res.json({
      status: "ok",
      message: "Service added successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: "error",
      message: "Failed to add service",
    });
  }
});

// ================= View Services =================

router.get("/viewservices", async (req, res) => {
  try {
    const { page } = req.query;

    let filter = {};

    if (page) {
      filter.page = page;
    }

    const services = await Service.find(filter).sort({
      createdAt: -1,
    });

    res.json({
      status: "ok",
      data: services,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch services",
    });
  }
});

// ================= View Single Service =================

router.get("/service/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        status: "error",
        message: "Service not found",
      });
    }

    res.json({
      status: "ok",
      data: service,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch service",
    });
  }
});

// ================= Update Service =================

router.put(
  "/editservice/:id",
  upload.single("photo"),
  async (req, res) => {
    try {
      const { title, description, page } = req.body;

      const updateData = {
        title,
        description,
        page,
      };

      if (req.file) {
        updateData.photo = req.file.filename;
      }

      const service = await Service.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
        }
      );

      res.json({
        status: "ok",
        message: "Service updated successfully",
        data: service,
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        status: "error",
        message: "Failed to update service",
      });
    }
  }
);



// ================= Delete Service =================

router.delete("/service/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find service
    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        status: "error",
        message: "Service not found",
      });
    }

    // Delete image from media folder
    if (service.photo) {
      const imagePath = path.join(
        __dirname,
        "../media",
        service.photo
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete service from database
    await Service.findByIdAndDelete(id);

    res.json({
      status: "ok",
      message: "Service deleted successfully",
    });

  } catch (err) {
    console.error("Delete service error:", err);

    res.status(500).json({
      status: "error",
      message: "Failed to delete service",
    });
  }
});

module.exports = router;