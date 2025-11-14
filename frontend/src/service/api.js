export const UploadFile = async (file) => {
    try{
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:9000';
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${backendUrl}/api/upload`,{
            method: 'POST',
            body: formData
            // Don't set Content-Type header - browser will set it with boundary
        })

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
        }

        return await response.json();
    }catch(err){
        console.error("Error uploading file:", err);
        throw err;
    }
}