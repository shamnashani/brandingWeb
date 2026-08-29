const mongo = require('mongoose')

const loginscheema = new mongo.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
password: {
  type: String,
  required: false,
  default: null
},
    role: { type: String, required: true, enum: ["admin", "user"] },
    phone: { type: String },
    photo: String,
    resetToken: String,
    resetTokenExpiry: Date,
    lastActive: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true })

const login = mongo.model('login', loginscheema)

module.exports = login