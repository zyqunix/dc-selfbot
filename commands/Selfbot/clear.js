module.exports = {
	name: 'c',
	description: 'Clears messages',
	async execute(message, args) {
		try {
			if (args[0] && !isNaN(args[0])) {
				const deleteCount = parseInt(args[0], 10);

				const fetched = await message.channel.messages.fetch({ limit: deleteCount + 20 });

				const userMessages = fetched.filter(msg => msg.author.id === message.author.id && msg.id !== message.id);

				const messagesToDelete = Array.from(userMessages.values()).slice(0, deleteCount);

				for (const msg of messagesToDelete) {
					if (msg.deletable) {
						setTimeout(() => {
							msg.delete().catch(error => { });
						}, Math.floor(Math.random() * 1001) );
					}
				}
			}
		} catch (error) {
			console.error('Error while deleting messages:', error);
		}
	},
};
