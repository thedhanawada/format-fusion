import React, { useState } from 'react';
import '../App.css';

const UploadComponent = () => {
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  const handleFileChange = async (e) => {
    setProgress(0);  // Reset progress
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10; // Increase by 10 every time, adjust as needed
      });
    }, 500); // Update every half second, adjust as needed

    try {
      const response = await fetch("http://localhost:3002/convert", {
        method: 'POST',
        body: formData
      });
      
      clearInterval(interval);  // Clear the progress interval
      setProgress(100);  // Set progress to 100%

      const blob = await response.blob();

      // Create a blob URL
      const url = window.URL.createObjectURL(blob);
      setDownloadURL(url);
    } catch (error) {
      clearInterval(interval);  // Clear the progress interval
      setProgress(0);  // Reset progress
      console.error("Error uploading and converting image:", error);
    }
  };

  const downloadFile = () => {
    if (downloadURL) {
      const a = document.createElement('a');
      a.href = downloadURL;
      a.download = "output.png";
      a.click();
      window.URL.revokeObjectURL(downloadURL);
      setDownloadURL(null);  // Clear the download URL
    }
  };

  return (
    <div className="App">
      <div className="upload-container">
        <input type="file" onChange={handleFileChange} />
        <progress value={progress} max="100"></progress>
        {downloadURL && <button onClick={downloadFile}>Download PNG</button>}
      </div>
    </div>
  );
};

export default UploadComponent;
