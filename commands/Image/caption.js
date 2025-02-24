const sharp = require('sharp');
const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
  name: 'caption',
  description: 'Adds a caption to the first image in the message attachments.',
  execute(message, args) {
    if (!message.attachments.size) {
      return message.edit('Please attach an image to the message.');
    }

    const attachment = message.attachments.first();
    if (!attachment.contentType.startsWith('image')) {
      return message.edit('The attachment is not an image.');
    }

    const captionText = args.join(' ');

    if (!captionText) {
      return message.edit('Please provide a caption.');
    }

    axios.get(attachment.url, { responseType: 'arraybuffer' })
    .then(response => {
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
