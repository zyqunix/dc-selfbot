const fs = require('fs').promises;

module.exports = {
    name: 'kill',
    description: 'Kill the selfbot and clear the log file.',
    async execute(message, args, client, config) {
        try {
            await message.delete();
            await fs.writeFile('stdout.log', '');
            client.destroy();
            process.exit(0);
        } catch (err) {
            console.error('An error occurred while shutting down the selfbot:', err);
            message.edit('qwerty');
        }
    },
};
