const express = require("express");
const router = express.Router();

const Policy = require("../model/privacy");

// =====================================================
// GET ALL POLICIES - ADMIN
// =====================================================

router.get("/", async (req, res) => {
  try {
    const policies = await Policy.find().sort({
      updatedAt: -1,
    });

    res.json(policies);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch policies",
    });
  }
});

// =====================================================
// GET PUBLISHED POLICY - PUBLIC
// =====================================================

router.get("/public/:slug", async (req, res) => {
  try {
    const policy = await Policy.findOne({
      slug: req.params.slug,
      status: "published",
    });

    if (!policy) {
      return res.status(404).json({
        message: "Policy not found",
      });
    }

    res.json(policy);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch policy",
    });
  }
});

// =====================================================
// GET SINGLE POLICY - ADMIN
// =====================================================

router.get("/:id", async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);

    if (!policy) {
      return res.status(404).json({
        message: "Policy not found",
      });
    }

    res.json(policy);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch policy",
    });
  }
});

// =====================================================
// CREATE POLICY
// =====================================================

router.post("/", async (req, res) => {
  try {
    const {
      title,
      slug,
      content,
      effectiveDate,
    } = req.body;

    const existingPolicy = await Policy.findOne({
      slug,
    });

    if (existingPolicy) {
      return res.status(400).json({
        message: "Policy already exists",
      });
    }

    const policy = await Policy.create({
      title,
      slug,
      content,
      effectiveDate,
      version: 1,
      status: "draft",
      updatedBy: "Admin",
    });

    res.status(201).json(policy);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create policy",
    });
  }
});

// =====================================================
// UPDATE POLICY
// =====================================================

router.put("/:id", async (req, res) => {
  try {
    const {
      title,
      content,
      effectiveDate,
    } = req.body;

    const policy = await Policy.findById(req.params.id);

    if (!policy) {
      return res.status(404).json({
        message: "Policy not found",
      });
    }

    policy.title = title;
    policy.content = content;
    policy.effectiveDate = effectiveDate;

    await policy.save();

    res.json(policy);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update policy",
    });
  }
});

// =====================================================
// PUBLISH POLICY
// =====================================================

router.put("/:id/publish", async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);

    if (!policy) {
      return res.status(404).json({
        message: "Policy not found",
      });
    }

    policy.status = "published";

    await policy.save();

    res.json({
      message: "Policy published successfully",
      policy,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to publish policy",
    });
  }
});

// =====================================================
// UNPUBLISH POLICY
// =====================================================

router.put("/:id/unpublish", async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);

    if (!policy) {
      return res.status(404).json({
        message: "Policy not found",
      });
    }

    policy.status = "draft";

    await policy.save();

    res.json({
      message: "Policy moved to draft",
      policy,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to unpublish policy",
    });
  }
});

// =====================================================
// DELETE POLICY
// =====================================================

router.delete("/:id", async (req, res) => {
  try {
    const policy = await Policy.findByIdAndDelete(
      req.params.id
    );

    if (!policy) {
      return res.status(404).json({
        message: "Policy not found",
      });
    }

    res.json({
      message: "Policy deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete policy",
    });
  }
});

module.exports = router;