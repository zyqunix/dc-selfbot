const { Client } = require("discord.js-selfbot-v13");

let autoReact = false; // Variable to track the auto-react state
const reactUserIDs = new Set(); // Set to store user IDs to react to
const specificUserID = ['1199435367733022752', '972154765893062796', '822878227995164683', '1205233705476689933', '776150381280886815']; // Specific user ID to react to

module.exports = {
    name: 'react',
    description: 'Auto-react a message',
    execute(message, args, client, emojiMap) { // Assuming emojiMap is passed from index.js
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
            // Check if the message is sent by the specific user
            if (message.author.id !== specificUserID) {
                return; // Exit if message author is not the specific user
            }

            // Join the args to get the message content
            const content = args.join(' ').toLowerCase();

            // Find all unique alphanumeric characters in the content
            const alphanumericChars = [...new Set(content.replace(/[^a-zA-Z0-9]/g, '').split(''))];

            // React to the message with each alphanumeric character if it's a valid emoji
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
