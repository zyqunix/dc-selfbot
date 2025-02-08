module.exports = {
  name: 'guild',
  description: 'Displays server information & statistics',
  async execute(client, message, args) {
    if (!message.guild) return;

    const serverInfo = `**Server Information**\n` +
      `**Name:** ${message.guild.name}\n` +
      `**Owner:** ${message.guild.owner.user.tag} (${message.guild.owner.id})\n` +
      `**Member Count:** ${message.guild.memberCount - message.guild.members.cache.filter(m => m.user.bot).size} (${message.guild.members.cache.filter(m => m.user.bot).size} bots)\n` +
      `**Creation Date:** ${message.guild.createdAt.toDateString()}\n` +
      `**Verification Level:** ${message.guild.verificationLevel}\n` +
      `**Role Count:** ${message.guild.roles.cache.size}\n` +
      `**Channel Count:** ${message.guild.channels.cache.size}`;

    const channel = await client.channels.fetch(message.channel.id);
    channel.send(serverInfo);
  }
};