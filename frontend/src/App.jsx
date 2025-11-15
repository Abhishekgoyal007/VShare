import React, { useEffect, useRef, useState } from 'react'
import { UploadFile } from './service/api';
import { Upload, Link2, CheckCircle2, File } from 'lucide-react';
import './App.css'

const App = () => {
  const [file, setFile ] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [copied, setCopied] = useState(false);

  const uploadRef = useRef();
  
  const handleUpload = ()=>{
    uploadRef.current.click();
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(downloadUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const reset = () => {
    setFile(null);
    setDownloadUrl(null);
    setUploadResponse(null);
  }
  
  useEffect(()=>{
    const apiCall = async ()=>{
      if(file){
        setUploading(true);
        try {
          const response = await UploadFile(file);
          setUploadResponse(response);
          setDownloadUrl(response.path);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="w-full max-w-md mx-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">VShare</h1>
          <p className="text-slate-300">Share files instantly, anywhere</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          
          {!downloadUrl ? (
            // Upload State
            <div className="text-center">
              <div 
                onClick={handleUpload}
                className="border-2 border-dashed border-white/30 rounded-xl p-12 cursor-pointer hover:border-white/50 hover:bg-white/5 transition-all duration-200"
              >
                <Upload className="w-12 h-12 text-white/70 mx-auto mb-4" />
                <p className="text-white/90 font-medium mb-1">
                  {uploading ? 'Uploading...' : 'Click to upload'}
                </p>
                <p className="text-white/50 text-sm">Any file up to 100MB</p>
              </div>
              
              {file && !uploading && (
                <div className="mt-4 flex items-center justify-center gap-2 text-white/70">
                  <File className="w-4 h-4" />
                  <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                </div>
              )}

              <input 
                type="file" 
                ref={uploadRef} 
                className="hidden"
                onChange={(e)=>setFile(e.target.files[0])}
              />
            </div>
          ) : (
            // Success State
            <div className="text-center">
              <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">File uploaded!</h3>
              <p className="text-white/70 text-sm mb-6">Share this link with anyone</p>
              
              {/* Download Link */}
              <div className="bg-black/30 rounded-lg p-4 mb-4 break-all">
                <a 
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-200 text-sm"
                >
                  {downloadUrl}
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Link2 className="w-4 h-4" />
                      Copy Link
                    </>
                  )}
                </button>
                
                <button
                  onClick={reset}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200"
                >
                  Upload New
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-white/40 text-sm mt-6">
          Powered by Cloudinary & Vercel
        </p>
      </div>
    </div>
  )
}

export default App