import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'vshare-uploads', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'zip', 'rar', 'txt', 'mp4', 'mp3'],
        resource_type: 'auto', // Automatically detect file type
    },
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

export default upload;