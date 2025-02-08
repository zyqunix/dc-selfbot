const fetch = require('node-fetch');

module.exports = {
  name: 'lyrics',
  description: 'Search for lyrics on Genius (private alternative)',
  execute(message, args) {
    const query = args.join(' ');
    if (!query) return message.edit('Please provide a search query');

    const url = `https://dumb-api.herokuapp.com/search?q=${encodeURIComponent(query)}`;

    fetch(url)
    .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
    .then(data => {
        const lyricsRegex = /### (.*?)\n\n(.*?)\n\n/s;
        const match = data.match(lyricsRegex);
        if (!match) return message.edit('No lyrics found');

        const lyrics = match[2].trim();
        const embed = {
          title: match[1],
          description: lyrics,
          fields: [
            {
              name: 'Artist',
              value: 'Dream Caster',
              inline: true
            },
            {
              name: 'Song',
              value: 'Rude',
              inline: true
            }
          ]
        };
        message.edit({ embed });
      })
    .catch(error => message.edit(`Error: ${error.message}`));
  },
};