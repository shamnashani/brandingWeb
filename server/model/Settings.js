const { type } = require("@testing-library/user-event/dist/type")
const mongoose = require("mongoose")

const settingsSchema = new mongoose.Schema(
  {
    businessName: { type: String, default: "" },
    tagline: { type: String, default: "" },
    contactEmail: { type: String, default: "" },
    contactPhone: { type: String, default: "" },
    address: { type: String, default: "" },
    socialLinks: {
  instagram: { type: String, default: "" },
  facebook: { type: String, default: "" },
  whatsapp: { type: String, default: "" },
  linkedin:{ type: String,default: ""},
    },
    autoApproveReviews: { type: Boolean, default: false },
    featuredReviewsLimit: { type: Number, default: 3 },
    notifyOnEnquiry: { type: Boolean, default: true },
    notifyOnReview: { type: Boolean, default: true },
    enquiryNotificationEmail: { type: String, default: "" },

  },
  
  { timestamps: true }
)

module.exports = mongoose.model("Settings", settingsSchema)