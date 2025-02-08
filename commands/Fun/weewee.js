module.exports = {
    name: 'weewee',
    description: 'weewee',
    execute(message, args) {
        let user = message.mentions.users.first() || message.author;
    
        let randomString = [...Array(Math.floor(Math.random() * 15) + 1)].map(() => '=').join('');
        message.edit(`${user}'s dick is \n 8${randomString}D \n long :3`);
    },
};