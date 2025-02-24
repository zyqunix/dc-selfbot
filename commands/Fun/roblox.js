const noblox = require('noblox.js');

module.exports = {
    name: 'roblox',
    description: 'Fetches Roblox account information by username.',
    async execute(message, args) {
        if (!args.length) {
            return message.edit('Please provide a Roblox username.');
        }

        const username = args[0];

        try {
            const userId = await noblox.getIdFromUsername(username);
            
            if (!userId) {
                return message.edit('Could not find the user. Please check the username.');
            }

            const userInfo = await noblox.getPlayerInfo(userId);

            const terminatedStatus = userInfo.isBanned ? 'Yes' : 'No';

            const userInfoMessage = `
\`\`\`
Username:       ${userInfo.username}
Display Name:   ${userInfo.displayName}
Description:    ${userInfo.blurb}
Join Date:      ${userInfo.joinDate}
Age:            ${userInfo.age} days
Friends:        ${userInfo.friendCount}
Followers:      ${userInfo.followerCount}
Following:      ${userInfo.followingCount}
Terminated:     ${terminatedStatus}
Old Names:      ${userInfo.oldNames || 'None'}
\`\`\`
            `;

            message.edit(userInfoMessage);
        } catch (error) {
            console.error(error);
            message.edit('Error fetching Roblox account information. Make sure the username is correct.');
        }
    },
};
