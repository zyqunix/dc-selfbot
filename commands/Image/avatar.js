module.exports = {
    name: 'av',
    description: 'Displays the avatar of the specified user by their ID.',
    execute(message, args, client) {
        if (args.length !== 1) {
            return message.edit('Please provide the user ID to get their avatar.').catch(console.error);
        }
        
        const userID = args[0];
        const mentionedUser = client.users.cache.get(userID);
        
        if (!mentionedUser) {
            return message.edit('User not found.').catch(console.error);
        }
        
        const userAvatarURL = mentionedUser.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
        
        message.edit(`${mentionedUser.username}'s avatar: [⁥](${userAvatarURL})`).catch(console.error);
    }
};
