const sharp = require('sharp');
const axios = require('axios');

module.exports = {
  name: 'gif',
  description: 'Converts a PNG or JPG image to GIF',
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
         .gif()
         .toBuffer((err, buffer) => {
            if (err) {
              console.error(err);
              return message.edit('Error converting image!');
            }

            message.edit({
              files: [{
                attachment: buffer,
                name: `${attachment.name.split('.')[0]}.gif`
              }]
            });
          });
      })
     .catch(error => {
        console.error(error);
        return message.edit('Error downloading image!');
      });
  },
};