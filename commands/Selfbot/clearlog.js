const fs = require('fs').promises;

module.exports = {
    name: 'clog',
    description: 'Clear the contents of the log file.',
    async execute(message, args, client, config) {
        try {
            await fs.writeFile('stdout.log', '');
        } catch (err) {
            console.error('Failed to clear the log file:', err);
            message.edit('PPAP');
        }
    },
};
