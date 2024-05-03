const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.generateTrainingProtocolPDF = (protocol) => {
    const doc = new PDFDocument();
    const outputPath = path.join(__dirname, '../treinos', `${protocol._id}.pdf`);
    doc.pipe(fs.createWriteStream(outputPath));
    doc.fontSize(16).text('Training Protocol', { underline: true });
    doc.moveDown();
    protocol.exercises.forEach(exercise => {
        doc.fontSize(12).text(`Exercise: ${exercise.name}`, { continued: true })
        .text(`, Series: ${exercise.series}`);
        doc.moveDown();
    });
    doc.end();
    return outputPath;
};