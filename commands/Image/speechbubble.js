const sharp = require('sharp');
const axios = require('axios');

module.exports = {
  name:'speechbubble',
  description: 'Remove top pixels from an image to make it look like a speech bubble',
  execute(message, args) {
    if (!message.attachments.size) {
      return message.edit('Please attach an image to convert!');
    }

    const attachment = message.attachments.first();

    if (!attachment.name.endsWith('.png') &&!attachment.name.endsWith('.jpg')) {
      return message.edit('Only PNG and JPG images are supported!');
    }

    axios.get(attachment.url, { responseType: 'arraybuffer' })
 .then(response => {
        sharp(response.data)
    .metadata()
    .then(metadata => {
            const width = metadata.width;
            const height = metadata.height;

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
              height: 50
            }
          ])
        .toFormat('png')
        .toBuffer((err, maskBuffer) => {
                if (err) {
                  console.error(err);
                  return message.edit('Error processing image!');
                }

                sharp(response.data)
            .composite([{ input: maskBuffer, blend: 'dest-out' }])
            .toFormat('png')
            .toBuffer((err, finalBuffer) => {
                  if (err) {
                    console.error(err);
                    return message.edit('Error processing image!');
                  }

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
