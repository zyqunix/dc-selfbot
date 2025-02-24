const { Client } = require("discord.js-selfbot-v13");

let autoReact = false;
const reactUserIDs = new Set();
const specificUserID = [];

module.exports = {
    name: 'react',
    description: 'Auto-react a message',
    execute(message, args, client, emojiMap) {
        if (args.length === 1 && args[0] === 'on') {
            autoReact = true;
            message.edit("Auto-react is now ON.");
        } else if (args.length === 1 && args[0] === 'off') {
            autoReact = false;
            message.edit("Auto-react is now OFF.");
        } else if (args.length === 2 && args[0] === 'add') {
            const userId = args[1];
            reactUserIDs.add(userId);
            message.edit(`Now reacting to messages from user ID: ${userId}.`);
        } else if (args.length === 2 && args[0] === 'remove') {
            const userId = args[1];
            reactUserIDs.delete(userId);
            message.edit(`No longer reacting to messages from user ID: ${userId}.`);
        } else {
            if (message.author.id !== specificUserID) {
                return;
            }

            const content = args.join(' ').toLowerCase();

            const alphanumericChars = [...new Set(content.replace(/[^a-zA-Z0-9]/g, '').split(''))];

            message.edit(content).then(async sentMessage => {
                for (const char of alphanumericChars) {
                    const emoji = emojiMap[char];
                    if (emoji) {
                        try {
                            await sentMessage.react(emoji);
                        } catch (error) {
                            console.error(`Could not react with ${char}:`, error);
                        }
                    }
                }
            });
        }
    },
    shouldAutoReact() { 
        return autoReact;
    }
};
