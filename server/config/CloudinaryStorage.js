const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('./Cloudinary')

// Reusable storage config — uploads go straight to Cloudinary instead
// of the local /media folder, so they survive redeploys and load with
// correct CORS/CDN headers automatically.
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'studiobits', // all uploads grouped under this Cloudinary folder
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1600, height: 1600, crop: 'limit' }], // caps oversized uploads
  },
})

module.exports = storage