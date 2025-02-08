module.exports = {
    name: 'uwu',
    description: 'Replaces "r" and "l" with "w" in the given message.',
    execute(message, args) {
        if (args.length === 0) {
            return message.edit('Please provide a message to transform.');
        }

        const inputMessage = args.join(' ');
        
        const uwuMessage = inputMessage.replace(/r/gi, 'w').replace(/l/gi, 'w');

        message.edit(uwuMessage);
    },
};
