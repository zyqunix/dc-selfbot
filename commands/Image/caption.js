const sharp = require('sharp');
const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
  name: 'caption',
  description: 'Adds a caption to the first image in the message attachments.',
  execute(message, args) {
    // Check if the message has attachments
    if (!message.attachments.size) {
      return message.edit('Please attach an image to the message.');
    }

    // Ensure the attachment is an image
    const attachment = message.attachments.first();
    if (!attachment.contentType.startsWith('image')) {
      return message.edit('The attachment is not an image.');
    }

    // Define the caption text
    const captionText = args.join(' ');

    // Check if a caption was provided
    if (!captionText) {
      return message.edit('Please provide a caption.');
    }

    // Download the attachment
    axios.get(attachment.url, { responseType: 'arraybuffer' })
    .then(response => {
        // Process the image with Sharp
        sharp(response.data)
        .composite([
            {
              input: 'C:\\Users\\Fabio\\OneDrive\\Documents\\the\\futur.ttf',
              gravity:'southeast',
              text: captionText,
              fontSize: 32,
              color: 'white',
              background: 'rgba(0, 0, 0, 0.5)',
              padding: 10,
            },
          ])
        .toFormat('png')
        .toBuffer((err, buffer) => {
            if (err) {
              console.error(err);
              message.edit('Failed to process the image.');
              return;
            }

            // Send the image back
            message.edit({
              files: [{
                attachment: buffer,
                name: 'captioned_image.png'
              }]
            });
          });
      })
    .catch(err => {
        console.error(err);
        message.edit('Failed to download the image.');
      });
  },
};