const fs = require('fs');
const path = require('path');
const config = require(path.resolve(__dirname, '..', '..', 'config.json'));

module.exports = {
  name: 'help',
  description: 'List of all commands',
  execute(message, args) {
    let helpMessage = 'Selfbot v2\n';
    helpMessage += ' \n';

    const categories = fs.readdirSync(path.join(__dirname, '..'));

    for (const category of categories) {
      const commandFiles = fs.readdirSync(path.join(__dirname, '..', category)).filter(file => file.endsWith('.js'));
      helpMessage += `${category}\n`;
      for (const file of commandFiles) {
        const command = require(`../${category}/${file}`);
        helpMessage += `${config.prefix}${command.name} - ${command.description}\n`;
      }
      helpMessage += '\n';
    }

    const sendChunks = (msg, chunks) => {
      if (chunks.length === 0) return;
      msg.channel.send(`\`\`\`\n${chunks.shift()}\n\`\`\``)
        .then(sentMsg => {
          setTimeout(() => sentMsg.delete(), 7500);
          sendChunks(msg, chunks);
        })
        .catch(console.error);
    };

    const chunkSize = 1500;
    const helpChunks = [];
    let start = 0;
    while (start < helpMessage.length) {
      let end = start + chunkSize;
      if (end >= helpMessage.length) {
        helpChunks.push(helpMessage.substring(start));
        break;
      }
      let lastNewline = helpMessage.lastIndexOf('\n', end);
      if (lastNewline > start) {
        helpChunks.push(helpMessage.substring(start, lastNewline));
        start = lastNewline + 1;
      } else {
        helpChunks.push(helpMessage.substring(start, end));
        start = end;
      }
    }

    sendChunks(message, helpChunks);
  },
};
