const Tesseract = require('tesseract.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'ocr',
    description: 'Extracts text from an image.',
    async execute(message, args) {
        if (message.attachments.size > 0) {
            const attachment = message.attachments.first();
            const imageUrl = attachment.url;

            try {
                // Fetch the image
                const response = await fetch(imageUrl);
                if (!response.ok) throw new Error('Failed to fetch image');

                // Get the image buffer
                const buffer = await response.buffer();

                // Perform OCR directly from the buffer
                const { data: { text } } = await Tesseract.recognize(
                    buffer,
                    'eng', // Language
                );

                // Send the result
                message.edit(`OCR Result:\n\`\`\`\n${text}\n\`\`\``);
            } catch (error) {
                message.edit(`An error occurred: ${error.message}`);
            }
        } else {
            message.edit('Please attach an image for OCR.');
        }
    },
};
