module.exports = {
    name: 's',
    description: 'Get the last deleted message in the channel.',
    execute(message, args, client, snipedMessages) {
        const snipedMessage = snipedMessages.get(message.channel.id);
        if (!snipedMessage) {
            return message.edit('There are no deleted messages to snipe!');
        }

        const authorTag = snipedMessage.author ? snipedMessage.author.tag : 'Unknown User';
        const createdAt = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(snipedMessage.createdAt);
        const deletedAt = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date());

        message.edit(`\`\`\`ansi\n\u001b[34mDeleted Message:\u001b[0m\n@${authorTag}: ${snipedMessage.content}\n\u001b[32mSent at:\u001b[0m ${createdAt}\n\u001b[31mDeleted at\u001b[0m ${deletedAt}\n\`\`\``);
    },
};
