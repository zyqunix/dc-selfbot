const fs = require('fs');
const path = require('path');
const config = require(path.resolve(__dirname, '..', '..', 'config.json'));

module.exports = {
  name: 'prefix',
  description: 'Changes the prefix',
  execute(message, args) {
    if (!args[0]) {
      return message.edit('```No prefix set.```');
    }

    config.prefix = args[0];
    fs.writeFile(path.resolve(__dirname, '..', '..', 'config.json'), JSON.stringify(config, null, 4), (err) => {
      if (err) throw err;
      message.edit(`Prefix has been changed to \`${args[0]}\``);
    });
  },
};