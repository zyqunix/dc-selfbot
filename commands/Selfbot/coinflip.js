module.exports = {
    name: 'coin',
    description: 'Flips a coin for you!',
    execute(message, args) {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        message.edit(`The coin landed on: \`${result}\``);
    },
};
