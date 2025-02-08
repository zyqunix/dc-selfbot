module.exports = {
    name: 'femboyrate',
    description: 'Are you secretely a femboy?',
    execute(message, args) {
        let user = message.mentions.users.first() || message.author;
        let rate = Math.floor(Math.random() * 101);
        message.edit(`**${user} is ${rate}% a femboy**`);
        if (rate > 74) {
            message.edit('https://tenor.com/view/femboy-thighs-gif-24834955');
        }
    },
};