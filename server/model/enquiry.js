const mongoose = require('mongoose')
const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: {
    type: String,
    required: false,
    default: ""
  },
    status: { type: String, enum: ["new", "contacted", "closed"], default: "new" }
}, { timestamps: true })

module.exports = mongoose.model('enquiry', enquirySchema)