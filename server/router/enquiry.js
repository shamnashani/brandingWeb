const express = require('express')
const router = express.Router()
const enquiry = require('../model/enquiry')
const authMiddleware = require('../middleware/authMiddleware')
const Settings = require('../model/Settings')
const sendEmail = require('../utils/sendEmail')

// Submit enquiry (public)
router.post('/submit', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Missing required fields" })
    }
    const newEnquiry = new enquiry({ name, email, phone,  message })
    await newEnquiry.save()

    // Notify admin if enabled in settings
    try {
      const settings = await Settings.findOne()
      if (settings?.notifyOnEnquiry && settings?.enquiryNotificationEmail) {
        await sendEmail({
          to: settings.enquiryNotificationEmail,
          subject: `New enquiry from ${name}`,
          html: `
            <h2>New Enquiry Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "—"}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        })
      }
    } catch (emailErr) {
      console.error("Enquiry notification email failed:", emailErr.message)
      // don't fail the request just because the email failed
    }

    res.json({ message: "Enquiry submitted successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get all enquiries (admin only)
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const enquiries = await enquiry.find().sort({ createdAt: -1 })
    res.json(enquiries)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get stats (admin only)
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const enquiryCount = await enquiry.countDocuments()
    const newCount = await enquiry.countDocuments({ status: "new" })
    const userCount = await require('../model/login').countDocuments()
    res.json({ enquiryCount, newCount, userCount })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Update enquiry status (admin only)
router.put('/status/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body
    await enquiry.findByIdAndUpdate(req.params.id, { status })
    res.json({ message: "Status updated" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    await enquiry.findByIdAndDelete(req.params.id)
    res.json({ message: "Enquiry deleted" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/today-count', async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const count = await enquiry.countDocuments({
      createdAt: { $gte: start }
    });

    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router