const express = require('express');
const multer = require('multer');
const cors = require('cors');
const im = require('imagemagick');

const app = express();

// Use the cors middleware to handle CORS issues
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/convert', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    // Write the uploaded file to the current directory
    const inputFilePath = 'input.heic';
    require('fs').writeFileSync(inputFilePath, req.file.buffer);

    // Convert the uploaded HEIC file to PNG using ImageMagick
    im.convert([inputFilePath, 'output.png'], (err, stdout) => {
        if (err) {
            console.error("ImageMagick Conversion Error:", err);
            return res.status(500).send("Error during conversion.");
        }

        // Read the converted PNG file and send it as a response
        const convertedBuffer = require('fs').readFileSync('output.png');
        res.set('Content-Type', 'image/png');
        res.send(convertedBuffer);
    });
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
