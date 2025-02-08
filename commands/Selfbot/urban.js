const axios = require('axios');

module.exports = {
  name: 'urban',
  description: 'Search the Urban Dictionary for a term',
  async execute(message, args) {
    if (!args.length) {
      return message.edit('Please provide a term to search for!');
    }

    const term = args.join(' ');
    const url = `https://api.urbandictionary.com/v0/define?term=${term}`;

    try {
      const response = await axios.get(url);
      const definitions = response.data.list;
      
      if (!definitions.length) {
        return message.edit(`No definition found for ${term}`);
      }

      let currentIndex = 0;

      const sendDefinition = (index) => {
        const definition = definitions[index];
        const output = `
**${definition.word}**: 
${definition.definition}

**Example**: 
${definition.example}
👍: \`${definition.thumbs_up}\` | 👎: \`${definition.thumbs_down}\`
        `;
        return output;
      };

      const initialMessage = await message.edit(sendDefinition(currentIndex));

      // Set up a message collector for "next"
      const filter = (m) => m.author.id === message.author.id && m.content.toLowerCase() === 'next';
      const collector = message.channel.createMessageCollector({ filter, time: 60000 });

      collector.on('collect', async () => {
        currentIndex++;
        if (currentIndex < definitions.length) {
          await initialMessage.edit(sendDefinition(currentIndex));
        } else {
          await initialMessage.edit('No more definitions.');
          collector.stop();
        }
      });

    } catch (error) {
      console.error(error);
      message.edit('Error searching Urban Dictionary');
    }
  },
};