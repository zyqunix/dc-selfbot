module.exports = {
    name: 'ping',
    description: 'Latency between client and server',
    async execute(message) {
        const startTime = message.createdTimestamp;
        await message.edit(`Pong! \`${Math.abs(Date.now() - startTime)}ms\``);
    },
};