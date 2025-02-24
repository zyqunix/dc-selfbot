const sharp = require('sharp');
const axios = require('axios');

module.exports = {
    name: 'resize',
    description: 'Resize an image',
    execute(message, args) {
        if (!message.attachments.size) {
            return message.edit('Please attach an image to resize!');
        }

        const attachment = message.attachments.first();

        if (!attachment.name.endsWith('.png') && !attachment.name.endsWith('.jpg') && !attachment.name.endsWith('.gif')) {
            return message.edit('Only PNG, JPG, and GIF images are supported!');
        }

        let resizeWidth, resizeHeight;
        if (args[0].endsWith('%')) {
            const percentage = parseFloat(args[0].slice(0, -1));
            if (isNaN(percentage) || percentage < 1 || percentage > 100) {
                return message.edit('Invalid percentage value. Please enter a value between 1 and 100.');
            }

            axios.get(attachment.url, { responseType: 'arraybuffer' })
                .then(response => {
                    sharp(response.data)
                        .metadata()
                        .then(metadata => {
                            const resizeWidth = Math.round(metadata.width * (percentage / 100));
                            const resizeHeight = Math.round(metadata.height * (percentage / 100));
                            console.log(`Resize width: ${resizeWidth}, Resize height: ${resizeHeight}`);
                            resizeImage(response.data, resizeWidth, resizeHeight, message, attachment);
                        })
                        .catch(err => {
                            console.error(err);
                            return message.edit('Error getting image metadata!');
                        });
                })
                .catch(error => {
                    console.error(error);
                    return message.edit('Error downloading image!');
                });
        } else {
            resizeWidth = parseInt(args[0]);
            resizeHeight = parseInt(args[1]);
            if (!resizeWidth || !resizeHeight) {
                return message.edit('Please provide the new width and height for the image.');
            }

            axios.get(attachment.url, { responseType: 'arraybuffer' })
                .then(response => {
                    resizeImage(response.data, resizeWidth, resizeHeight, message, attachment);
                })
                .catch(error => {
                    console.error(error);
                    return message.edit('Error downloading image!');
                });
        }
    },
};

function resizeImage(image, resizeWidth, resizeHeight, message, attachment) {
    sharp(image)
        .resize(resizeWidth, resizeHeight)
        .toBuffer((err, buffer) => {
            if (err) {
                console.error(err);
                return message.edit('Error resizing image!');
            }

            message.edit({
                files: [{
                    attachment: buffer,
                    name: `${attachment.name.split('.')[0]}-resized.${attachment.name.split('.').pop().toLowerCase()}`
                }]
            });
        });
}
