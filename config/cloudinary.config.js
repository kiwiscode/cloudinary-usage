const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  // the information about 2 things below is here https://console.cloudinary.com/settings/c-4306a1ae8388dc1e1ce32ed95f1ad9/api-keys
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  // the information about below (cloud_name) is here https://console.cloudinary.com/settings/c-4306a1ae8388dc1e1ce32ed95f1ad9/account
  cloud_name: process.env.CLOUDINARY_NAME,
});

const storage = new CloudinaryStorage({
  // cloudinary: cloudinary,
  cloudinary,
  params: {
    allowed_formats: ["jpg", "png"],
    folder: "movie-project", // The name of the folder in cloudinary
    // resource_type: 'raw' => this is in case you want to upload other type of files, not just images
  },
});

// storage: storage
module.exports = multer({ storage });
