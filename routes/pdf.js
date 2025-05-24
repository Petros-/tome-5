const express = require('express');
const PDFDocument = require('pdfkit');
// file store is for viewing and changing the file system on the server
const fs = require('fs');
const path = require('path');

const router = express.Router();
const { authMiddleware } = require('./auth');
const artworkDAO = require('../daos/artworks');

const pdfDir = path.join(__dirname, '..', 'samplePdfs');

// Use the filestore library to determine if the folder exists
// and if not, then make the folder
if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir);
}

router.get('/generate-pdf', authMiddleware, async (req, res) => {
    // tie the .pdf creation into my database
    try {
        // get the current user's ID from the decoded JWT
        const userId = req.user._id;

        // check to make sure there's a current user
        if (!userId) {
            return res.status(404).json({ error: 'No token provided. Are you signed in?' })
        }

        // get the artworks that belong to the current user
        const userArtworks = await artworkDAO.getArtworksByUserId(userId);

        if (!userArtworks || userArtworks.length === 0) {
            return res.status(404).json({ error: 'No artworks found for this user:', userId })
        }

        // handle the file naming
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `artworks_${timestamp}.pdf`;
        const filePath = path.join(pdfDir, filename);

        // create the pdf
        const doc = new PDFDocument();
        // create a funnel or place where the pdf can be created incrementally
        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);

        // put stuff in the pdf
        doc.fontSize(20).text(`Here are ${req.user.email}'s artworks`);
        doc.moveDown();

        // for each artwork include the title and the medium
        userArtworks.forEach((art, index) => {
            doc
                .fontSize(14)
                .text(`${index + 1}. Title: ${art.title || 'No title provided'}`);
            doc.text(`Medium: ${art.medium || '—'}`);
            doc.moveDown();
        })

        doc.end();

        // send the file to the folder after it is created
        writeStream.on('finish', () => {
            res.download(filePath, filename);
        });

    } catch (error) {
        console.error(`There was a problem generating the pdf:`, error);
        res.status(500).json({ error: 'Failed to generate PDF' });
    }
});

module.exports = router;
