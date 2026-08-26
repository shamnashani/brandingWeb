const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    version: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    effectiveDate: {
      type: Date,
      default: Date.now,
    },

    updatedBy: {
      type: String,
      default: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Policy", policySchema);