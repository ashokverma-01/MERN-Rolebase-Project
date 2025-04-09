const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "MERN-Images",
    format: async (req, file) => "png",
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});
const deleteImage = async (imageId) => {
  try {
    const result = await cloudinary.uploader.destroy(imageId);
    console.log("Deleted:", result);
    return result;
  } catch (err) {
    console.error("Cloudinary deletion error:", err);
    throw err;
  }
};

module.exports = {
  cloudinary,
  storage,
  deleteImage,
};
