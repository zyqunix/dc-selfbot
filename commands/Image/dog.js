module.exports = {
    name: 'dog',
    description: 'Sends Random Dog Image',
    async execute(message, args) {
        const { default: fetch } = await import('node-fetch');

        try {
            const response = await fetch('https://api.thedogapi.com/v1/images/search', {
                headers: {
                    'x-api-key': 'live_cMCyirT4gUSgtNmE0vFs7Aj1mYP4l80e3yxvdOlu1zLFrAABG5MTTXxXg1JJkiUQ'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const dogImage = data[0].url;

            message.edit(dogImage);
        } catch (err) {
            console.error(err);
            message.edit('An error occurred while fetching the dog image.');
        }
    },
};
