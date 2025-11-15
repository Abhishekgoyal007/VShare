import React, { useEffect, useRef, useState } from 'react'
import { UploadFile } from './service/api';
import { Upload, Link2, CheckCircle2, File, Zap, Shield, Sparkles } from 'lucide-react';
import './App.css'

const App = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [copied, setCopied] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const uploadRef = useRef();
  
  const handleUpload = () => {
    uploadRef.current?.click();
  }

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  }

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles[0]) {
      setFile(droppedFiles[0]);
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  }

  const copyToClipboard = () => {
    if (downloadUrl) {
      navigator.clipboard.writeText(downloadUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const reset = () => {
    setFile(null);
    setDownloadUrl(null);
    setCopied(false);
  }
  
  useEffect(() => {
    const apiCall = async () => {
      if (file && !uploading) {
        setUploading(true);
        try {
          const response = await UploadFile(file);
          setDownloadUrl(response.path);
        } catch (error) {
          console.error("Upload failed:", error);
        } finally {
          setUploading(false);
        }
      }
    }
    apiCall();
  }, [file])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
        
        {/* Header section */}
        <div className="text-center mb-16 max-w-2xl">
          <div className="mb-8 flex items-center justify-center gap-3">
            <Zap className="w-10 h-10 text-blue-400" />
            <h1 className="text-6xl md:text-7xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
              VShare
            </h1>
          </div>
          <p className="text-xl text-slate-400 leading-relaxed px-4">
            Share files instantly, anywhere. Fast, secure, and hassle-free.
          </p>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <div className="flex items-center gap-2 px-5 py-3 bg-slate-900/80 backdrop-blur border border-slate-800 rounded-full text-sm text-slate-400">
            <Zap className="w-4 h-4 text-blue-400" />
            Lightning Fast
          </div>
          <div className="flex items-center gap-2 px-5 py-3 bg-slate-900/80 backdrop-blur border border-slate-800 rounded-full text-sm text-slate-400">
            <Shield className="w-4 h-4 text-green-400" />
            Secure Transfer
          </div>
          <div className="flex items-center gap-2 px-5 py-3 bg-slate-900/80 backdrop-blur border border-slate-800 rounded-full text-sm text-slate-400">
            <Sparkles className="w-4 h-4 text-purple-400" />
            100MB Limit
          </div>
        </div>

        {/* Main card */}
        <div className="w-full max-w-3xl px-4">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 shadow-2xl">
            
            {!downloadUrl ? (
              // Upload state
              <div className="text-center">
                <div
                  onClick={handleUpload}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-16 cursor-pointer transition-all duration-300 ${
                    dragActive
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-slate-700 hover:border-slate-600 hover:bg-slate-800/50'
                  }`}
                >
                  <Upload className={`w-20 h-20 mx-auto mb-6 transition-all ${
                    uploading ? 'animate-bounce text-blue-400' : 'text-slate-500'
                  }`} />
                  <p className="text-2xl font-semibold text-white mb-2">
                    {uploading ? 'Uploading...' : 'Click to upload or drag file'}
                  </p>
                  <p className="text-slate-500 text-base">
                    Any file up to 100MB
                  </p>
                </div>

                {file && !uploading && (
                  <div className="mt-8 flex items-center justify-center gap-4 p-5 bg-slate-800/80 border border-slate-700 rounded-xl">
                    <File className="w-6 h-6 text-blue-400 shrink-0" />
                    <span className="text-slate-300 text-base truncate">{file.name}</span>
                  </div>
                )}

                <input
                  type="file"
                  ref={uploadRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              // Success state
              <div className="text-center">
                <div className="mb-8 flex justify-center">
                  <CheckCircle2 className="w-24 h-24 text-green-400" />
                </div>

                <h3 className="text-3xl font-bold text-white mb-3">
                  Success! 🎉
                </h3>
                <p className="text-slate-500 text-base mb-8">
                  Your file has been uploaded and is ready to share
                </p>

                {/* Download link */}
                <div className="mb-8 p-6 bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
                  <p className="text-sm text-slate-500 mb-3 text-left">Share link:</p>
                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm break-all font-mono transition-colors text-left block"
                  >
                    {downloadUrl}
                  </a>
                </div>

                {/* Action buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={copyToClipboard}
                    className={`flex-1 flex items-center justify-center gap-2 font-medium py-4 px-6 rounded-xl transition-all duration-200 text-base ${
                      copied
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Link2 className="w-5 h-5" />
                        Copy Link
                      </>
                    )}
                  </button>

                  <button
                    onClick={reset}
                    className="flex-1 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200"
                  >
                    Upload New
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-16 text-center text-slate-500 text-sm max-w-md px-4">
          <p className="mb-2">
            Files are securely stored in the cloud with Cloudinary.
          </p>
          <p>
            Powered by modern web technology • Fast & Reliable
          </p>
        </div>
      </div>
    </div>
  )
}

export default App