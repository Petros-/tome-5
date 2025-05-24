const express = require('express');
const PDFDocument = require('pdfkit');
// file store is for viewing and changing the file system on the server
const fs = require('fs');
const path = require('path');

const router = express.Router();

const pdfDir = path.join(__dirname, '..', 'samplePdfs');

// Use the filestore library to determine if the folder exists
// and if not, then make the folder
if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir);
}

router.get('/generate-pdf', (req, res) => {

    // define how you want the pdf to be named
    const filePath = path.join(pdfDir, 'blue_circle.pdf');
    const doc = new PDFDocument();

    // create a place or "stream" into which the file can be created incrementally
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Draw blue circle
    doc.fillColor('blue').circle(300, 300, 100).fill();

    // Add text
    doc.fillColor('black').fontSize(20).text('this is a blue circle', 200, 450);

    doc.end();

    writeStream.on('finish', () => {
        res.download(filePath, 'blue_circle.pdf');
    });
});

module.exports = router;
