const axios = require('axios');

module.exports = {
  name: 'wiki',
  description: 'Search Wikipedia for a term',
  async execute(message, args) {
    if (!args.length) {
      return message.edit('Please provide a search term!');
    }

    const term = args.join(' ');
    const url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${term}&limit=10&format=json`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      if (!data[1].length) {
        return message.edit(`No results found for ${term}`);
      }

      let currentIndex = 0;

      const sendResult = async (index) => {
        const result = data[1][index];
        const wikiUrl = data[3][index];
        const summaryUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&titles=${result}&exintro=1&explaintext=1`;
        const summaryResponse = await axios.get(summaryUrl);
        const summaryData = summaryResponse.data;
        const summary = summaryData.query.pages[Object.keys(summaryData.query.pages)[0]].extract;
        const truncatedSummary = summary.substring(0, 250); // truncate the summary to 2000 characters
        const output = `
**${result}**: 
\`\`\`${truncatedSummary}...\`\`\`

[Read more on Wikipedia](<${wikiUrl}>)
`;
        return output;
      };

      const initialMessage = await message.edit(await sendResult(currentIndex));

      const filter = (m) => m.author.id === message.author.id && m.content.toLowerCase() === 'next';
      const collector = message.channel.createMessageCollector({ filter, time: 60000 });

      collector.on('collect', async () => {
        currentIndex++;
        if (currentIndex < data[1].length) {
          await initialMessage.edit(await sendResult(currentIndex));
        } else {
          await initialMessage.edit('No more results.');
          collector.stop();
        }
      });
    } catch (error) {
      console.error(error);
      message.edit('Error searching Wikipedia');
    }
  },
};