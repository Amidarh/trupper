const cloudinary = require('../services/cloudinary');
const { badResponse } = require('../utils/response');

exports.uploadImage = async (req, res) => {
  if (req.file) {
    try {
      await cloudinary.api.resources({
        type: 'upload',
        max_results: 10,
      });
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Uploads',
      });
      return result.secure_url;
    } catch (err) {
      console.log(err);
      return new Error('Failed to upload image to Cloudinary');
    }
  } else {
    return badResponse(res, 'Image is required');
  }
};
