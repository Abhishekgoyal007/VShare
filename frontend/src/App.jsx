import React, { useEffect, useRef, useState } from 'react'
import { UploadFile } from './service/api';
import './App.css'

const App = () => {
  const [file, setFile ] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [res, setRes] = useState(null);

  const uploadRef = useRef(); // Reference to the file input element
  const handleUpload = ()=>{
    uploadRef.current.click();
  }
  
  // api call with data
  useEffect(()=>{
    const apiCall = async ()=>{
      if(file){
        setUploading(true);
        try {
          // Pass just the file - api.js will handle FormData creation
          const response = await UploadFile(file);
          console.log("response from api: ", response);
          setUploadResponse(response);
          setRes(response.path);
        } catch (error) {
          console.error("Upload failed:", error);
          setUploadResponse({ error: error.message });
        } finally {
          setUploading(false);
        }
      }
    }
    apiCall();
  }, [file])

  return (
    <div className="app">
      <h1>File Sharing App</h1>
      <div>
        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        <input 
          type="file" 
          ref={uploadRef} 
          style={{display:"none"}} 
          onChange={(event)=>setFile(event.target.files[0])}
        />
      </div>
      {/* {file && (
        <div style={{marginTop: '20px'}}>
          <p>Selected: {file.name}</p>
        </div>
      )} */}

      <a href={res}>{res}</a>
    </div>
  )
}

export default App