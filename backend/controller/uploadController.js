import fileModel from "./../model/fileModel.js";

export const UploadController = async (req, res) => {
    try{
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        
        const backendUrl = process.env.BACKEND_URL || 'http://localhost:9000';

        const fileObject = {
            path: req.file.path, // Cloudinary URL
            name: req.file.originalname,
            cloudinaryId: req.file.filename // Store Cloudinary public_id for deletion if needed
        }

        const file = await fileModel.create(fileObject);
        console.log("File uploaded successfully to Cloudinary:", file);
        return res.status(200).json({ path: `${backendUrl}/api/files/${file._id}` });
    }catch(err){
        console.error("Upload error:", err);
        res.status(500).json({error: "Error while uploading file"});
    }
}

export const DownloadController = async (req, res) => {
    try{
        const file = await fileModel.findById(req.params.fileId);

        if(!file){
            return res.status(404).json({error: "File not found"});
        }

        // For Cloudinary URLs, add fl_attachment flag to force download
        let downloadUrl = file.path;
        
        if (downloadUrl.includes('cloudinary.com')) {
            // Encode filename to handle special characters
            const encodedFilename = encodeURIComponent(file.name);
            downloadUrl = downloadUrl.replace('/upload/', `/upload/fl_attachment:${encodedFilename}/`);
        }
        
        res.redirect(downloadUrl);
        
    }catch(err){
        console.error("Download error:", err);
        return res.status(500).json({error: "Error while downloading file"});
    }
}