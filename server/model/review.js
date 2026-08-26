const mongoose = require('mongoose')
const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  service: { type: String }, // Film, Construction, Technology
  rating: { type: Number, min: 1, max: 5, required: true },
  message: { type: String, required: true },
  approved: { type: Boolean, default: false } ,// admin approves before showing
  status: { type: String, enum: ["approved", "pending"], default: "pending" },
  featured: {
      type: Boolean,
      default: false,
    },

}, { timestamps: true })

module.exports = mongoose.model('review', reviewSchema)