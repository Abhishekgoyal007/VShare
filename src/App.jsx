import React, { useEffect, useRef, useState } from 'react'
import './App.css'

const App = () => {
  const [file, setFile ] = useState(null);

  const uploadRef = useRef(); // Reference to the file input element
  const handleUpload = ()=>{
    uploadRef.current.click();
  }
  
  // api call with data
  useEffect(()=>{
    const apiCall = ()=>{

      // call the api with the file data
      const fileData = new FormData();
      fileData.append("name", file.name);
      fileData.append("file", file);

      // call the function from api.js with fileData


    }
    apiCall();
  }, [file])

  return (
    <div className="app">
      <h1>File Sharing App</h1>
      <div>
        <button onClick={handleUpload}>Upload</button>
        <input type="file" ref={uploadRef} style={{display:"none"}} onChange={(event)=>setFile(event.target.files[0])}/>
      </div>
    </div>
  )
}

export default App