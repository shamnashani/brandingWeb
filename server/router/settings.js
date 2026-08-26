const express = require("express");
const router = express.Router();

const {getSettings,updateSettings,changePassword,} = require("../controllers/settingsController");

const authMiddleware = require("../middleware/authMiddleware");
const Settings = require("../model/Settings");
router.get("/", authMiddleware, getSettings);

router.put("/update", authMiddleware, updateSettings);
router.put("/change-password", authMiddleware, changePassword);
router.get("/social", async (req, res) => {
  try {
    const doc = await Settings.findOne();

    res.json({
      instagram: doc?.socialLinks?.instagram || "",
      facebook: doc?.socialLinks?.facebook || "",
      whatsapp: doc?.socialLinks?.whatsapp || "",
      linkedin: doc?.socialLinks?.linkedin || "",
    });
  } catch (err) {
    console.error("Social settings error:", err);

    res.status(500).json({
      message: "Failed to fetch social links",
      error: err.message,
    });
  }
});
router.put("/social", authMiddleware, async (req, res) => {
  try {
    const {
      instagram = "",
      facebook = "",
      whatsapp = "",
      linkedin = "",
    } = req.body;

    let doc = await Settings.findOne();

    // If settings document doesn't exist
    if (!doc) {
      doc = await Settings.create({
        socialLinks: {
          instagram,
          facebook,
          whatsapp,
          linkedin,
        },
      });
    } else {
      // Make sure socialLinks exists
      if (!doc.socialLinks) {
        doc.socialLinks = {};
      }

      doc.socialLinks.instagram = instagram;
      doc.socialLinks.facebook = facebook;
      doc.socialLinks.whatsapp = whatsapp;
      doc.socialLinks.linkedin = linkedin;

      await doc.save();
    }

    res.json({
      message: "Social links updated successfully",
      settings: doc,
    });
  } catch (err) {
    console.error("Update social settings error:", err);

    res.status(500).json({
      message: "Failed to update social links",
      error: err.message,
    });
  }
});

module.exports = router;