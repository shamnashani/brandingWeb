const Settings = require("../model/Settings")
const bcrypt = require("bcryptjs")
const User = require("../model/login") 

// GET /settings
exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne()
    if (!settings) {
      settings = await Settings.create({})
    }
    res.json(settings)
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch settings", error: err.message })
  }
}

// PUT /settings/update
exports.updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne()

    const updateData = { ...req.body }

    // stamp the date only when policy text actually changes
    if (typeof req.body.privacyPolicy === "string") {
      updateData.privacyPolicyUpdatedAt = new Date()
    }

    if (!settings) {
      settings = await Settings.create(updateData)
    } else {
      settings = await Settings.findOneAndUpdate({}, updateData, {
        new: true,
        runValidators: true,
      })
    }
    res.json({ message: "Settings updated", settings })
  } catch (err) {
    res.status(500).json({ message: "Failed to update settings", error: err.message })
  }
}
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current and new password are required" })
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters" })
    }

    const user = await User.findById(req.user.id) // req.user set by your protect middleware
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" })
    }

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(newPassword, salt)
    await user.save()

    res.json({ message: "Password updated successfully" })
  } catch (err) {
    res.status(500).json({ message: "Failed to update password", error: err.message })
  }
}