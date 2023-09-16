import React from 'react';
import UploadComponent from './components/UploadComponent';
import './App.css';

function App() {
    const handleFileSelect = (file) => {
        console.log(file);
    };

    return (
        <div className="App">
            <h1>FormatFusion</h1>
            <p>
                Welcome to FormatFusion, your go-to online tool for converting HEIC images to PNG format. 
                With just a few clicks, transform your high-efficiency images into widely supported PNGs.
            </p>
            <UploadComponent onFileSelect={handleFileSelect} />
            <p style={{marginTop: '20px', maxWidth: '600px'}}>
                HEIC (High Efficiency Image Format) is popular due to its space-saving features, 
                but it's not supported everywhere. FormatFusion bridges that gap, allowing you 
                to enjoy the best of both worlds.
            </p>
        </div>
    );
}

export default App;
