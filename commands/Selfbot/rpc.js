const rpc = require('discord-rpc');
const config = require('../../config.json');

const client = new rpc.Client({ transport: 'ipc' });

client.on('ready', () => {
  console.log('Discord RPC client ready');
});

client.on('error', (error) => {
  console.error('Discord RPC error:', error);
});

client.on('disconnect', () => {
  console.log('Discord RPC client disconnected');
});

module.exports = {
  name:'setrpc',
  description: 'Change your Discord Rich Presence.',
  async execute(message, args) {
    if (message.author.id!== config.userId) {
      return message.edit("You do not have permission to use this command.");
    }

    if (!args.length) {
      return message.edit("Please provide the RPC details.");
    }

    try {
      await client.login({ clientId: config.clientId });
    } catch (error) {
      console.error('Failed to login to Discord RPC:', error);
      return message.edit("Failed to set Rich Presence. Please try again later.");
    }

    const rpcDetails = {
      details: args[0] || 'Default Details',
      state: args[1] || 'Default State',
      startTimestamp: new Date(),
      largeImageKey: args[2] || 'default_image',
      largeImageText: args[3] || 'Large Image Text',
      smallImageKey: args[4] ||'small_image',
      smallImageText: args[5] || 'Small Image Text',
      instance: false,
    };

    try {
      client.setActivity(rpcDetails).then(() => {
        console.log('RPC set successfully!');
        message.edit("Rich Presence updated!");
      }).catch((error) => {
        console.error('Failed to set RPC:', error);
        message.edit("Failed to set Rich Presence. Please try again later.");
      });
    } catch (error) {
      console.error('Error setting RPC:', error);
      message.edit("Failed to set Rich Presence. Please try again later.");
    }
  },
};