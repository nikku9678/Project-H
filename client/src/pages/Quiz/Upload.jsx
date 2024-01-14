import React, { useState } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Upload.css'
import { useNavigate } from 'react-router-dom';
import Progress from './Progress';

const Upload = () => {
const navigate= useNavigate();
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      toast.error('Please select a file to upload.');
      return;
    }

    setUploading(true);

    // Simulate file upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const newProgress = prevProgress + 20;
        if (newProgress === 100) {
          clearInterval(uploadInterval);
          setTimeout(() => {
            setProcessing(true);
            toast.success('PDF uploaded successfully!');
            // Simulate generating MCQs and processing PDF
            setTimeout(() => {
              setProcessing(false);
              toast.success('MCQs generated and PDF processed successfully!');
              // Open a new page or redirect to an image display page
              navigate('/takequiz')
            }, 5000);
          }, 3000);
        }
        return newProgress;
      });
    }, 1000);
  };

  return (
    <div className='upload' style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>PDF Upload and Processing</h2>
      <input type="file" onChange={handleFileChange} />
      <br />
      <Button variant="primary" onClick={handleUpload}>
        Upload PDF
      </Button>

      {uploading && (
        <div className='process'>
          <p>Processing your pdf...</p>
          <Progress/>
          <ProgressBar label={`${uploadProgress}%`} />
        </div>
      )}

      {processing && (
        <div className='generate'>
          <p>Generating MCQs...</p>
        </div>
      )}

      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default Upload;
