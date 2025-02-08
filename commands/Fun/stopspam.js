module.exports = {
    name: 'stopspam',
    description: 'Stops the spam command.',
    async execute(message, args) {
        message.client.stopSpam = true;
        await message.edit('Spam stopped!');
    },
};