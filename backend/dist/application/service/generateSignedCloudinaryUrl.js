"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSignedCloudinaryUrl = generateSignedCloudinaryUrl;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
function generateSignedCloudinaryUrl(publicId) {
    if (!publicId)
        return '';
    const signedUrl = cloudinary_1.v2.url(publicId, {
        secure: true,
        sign_url: true,
        type: 'authenticated',
        transformation: [{ width: 300, crop: 'scale' }],
        timestamp: Math.floor(Date.now() / 1000) + 300, // Expires in 5 minutes
    });
    return signedUrl;
}
