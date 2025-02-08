module.exports = {
    name: 'sedit',
    description: 'Get the last edited message in the channel.',
    execute(message, args, client, editedMessages) {
        const editedMessage = editedMessages.get(message.channel.id);
        if (!editedMessage) {
            return message.edit('There are no edited messages to snipe!');
        }

        const { oldMessage, newMessage } = editedMessage;
        const authorTag = oldMessage.author.tag || 'Unknown User';
        const createdAt = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(oldMessage.createdAt);
        const editedAt = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(newMessage.editedAt || new Date());

        message.edit(`**Edited Message:**\n**${authorTag}:**\n**Before:** ${oldMessage.content} (\`${createdAt}\`)\n**After:** ${newMessage.content} (\`${editedAt}\`)`);
    },
};
