const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/Cloudinary");
const storage = require("../config/CloudinaryStorage");
const Service = require("../model/Service");

// ================= Multer Storage (Cloudinary-backed) =================

const upload = multer({ storage });

// ================= Add Service =================

router.post("/services", upload.single("photo"), async (req, res) => {
  try {
    const { title, description, page } = req.body;

    const photo = req.file ? req.file.path : "";        // Cloudinary URL
    const photoId = req.file ? req.file.filename : "";   // Cloudinary public_id, for delete/replace

    const service = new Service({
      title,
      description,
      page,
      photo,
      photoId,
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

      const existing = await Service.findById(req.params.id);

      if (!existing) {
        return res.status(404).json({
          status: "error",
          message: "Service not found",
        });
      }

      const updateData = {
        title,
        description,
        page,
      };

      // If a new image was uploaded — delete the old Cloudinary
      // image first, then save the new one
      if (req.file) {
        if (existing.photoId) {
          try {
            await cloudinary.uploader.destroy(existing.photoId);
          } catch (cloudErr) {
            console.error("Cloudinary delete failed (old photo):", cloudErr.message);
            // don't block the update just because cleanup failed
          }
        }

        updateData.photo = req.file.path;
        updateData.photoId = req.file.filename;
      }

      const service = await Service.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
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

    // Delete image from Cloudinary
    if (service.photoId) {
      try {
        await cloudinary.uploader.destroy(service.photoId);
      } catch (cloudErr) {
        console.error("Cloudinary delete failed:", cloudErr.message);
        // still proceed to delete the DB record even if cloud cleanup fails
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