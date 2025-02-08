const afkMap = new Map();

module.exports = {
    name: 'afk',
    description: 'Sets your AFK status with an optional message.',
    execute(message, args) {
        const userId = message.author.id;
        const afkMessage = args.join(' ') || 'I am currently AFK.';

        if (afkMap.has(userId)) {
            afkMap.delete(userId);
            message.edit(`Welcome back, ${message.author.username}! I have removed your AFK status.`);
        } else {
            afkMap.set(userId, afkMessage);
            message.edit(`I have set your AFK status: ${afkMessage}`);
        }
    },
    checkAFK(message) {
        const mentionedUsers = message.mentions.users;
        const authorId = message.author.id;

        if (afkMap.has(authorId)) {
            afkMap.delete(authorId);
            message.edit(`Welcome back, ${message.author.username}! I have removed your AFK status.`);
        }

        mentionedUsers.forEach(user => {
            if (afkMap.has(user.id)) {
                const afkMessage = afkMap.get(user.id);
                message.edit(`${user.username} is currently AFK: ${afkMessage}`);
            }
        });
    },
};
