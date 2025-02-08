module.exports = {
    name: 'cat',
    description: 'Sends Random Cat Image',
    async execute(message, args) {
        // Dynamically import fetch
        const { default: fetch } = await import('node-fetch');
        
        try {
            const response = await fetch('https://api.thecatapi.com/v1/images/search', {
                headers: {
                    'x-api-key': 'live_4ipTQahY7E29ZCJyZ1TYj4TKsydrehqmTV4vwCTKNXcrI0C1MOydBnnGx1Ei0Z6a'
                }
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            const catImage = data[0].url;
            
            message.edit(catImage);
        } catch (err) {
            console.error(err);
            message.edit('An error occurred while fetching the cat image.');
        }
    },
};
