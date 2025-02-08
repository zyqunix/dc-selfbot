const sharp = require('sharp');
const axios = require('axios');

module.exports = {
  name:'speechbubble',
  description: 'Remove top pixels from an image to make it look like a speech bubble',
  execute(message, args) {
    // Check if the message has an attachment
    if (!message.attachments.size) {
      return message.edit('Please attach an image to convert!');
    }

    // Get the attachment
    const attachment = message.attachments.first();

    // Check if the attachment is an image
    if (!attachment.name.endsWith('.png') &&!attachment.name.endsWith('.jpg')) {
      return message.edit('Only PNG and JPG images are supported!');
    }

    // Download the attachment
    axios.get(attachment.url, { responseType: 'arraybuffer' })
 .then(response => {
        // Get the dimensions of the original image
        sharp(response.data)
    .metadata()
    .then(metadata => {
            const width = metadata.width;
            const height = metadata.height;

            // Create a mask image with a white rectangle at the top
            sharp({
              create: {
                width,
                height,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 0 }
              }
            })
        .composite([
            {
              input: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64'),
              left: 0,
              top: 0,
              width,
              height: 50 // adjust the value to remove more or less pixels
            }
          ])
        .toFormat('png')
        .toBuffer((err, maskBuffer) => {
                if (err) {
                  console.error(err);
                  return message.edit('Error processing image!');
                }

                // Composite the mask image onto the original image
                sharp(response.data)
            .composite([{ input: maskBuffer, blend: 'dest-out' }])
            .toFormat('png')
            .toBuffer((err, finalBuffer) => {
                  if (err) {
                    console.error(err);
                    return message.edit('Error processing image!');
                  }

                  // Send the modified image
                  message.edit({
                    files: [{
                      attachment: finalBuffer,
                      name: `${attachment.name.split('.')[0]}_speechbubble.png`
                    }]
                  });
                });
              });
          });
      })
.catch(error => {
        console.error(error);
        return message.edit('Error downloading image!');
      });
  },
};