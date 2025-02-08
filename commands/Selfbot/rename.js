const config = require('../../config.json');

module.exports = {
    name: 'rename',
    description: 'Renames an existing command to a new name.',
    execute(message, args, client) {

        if (!Array.isArray(args) || args.length < 2) {
            return message.edit(`Usage: ${config.prefix}rename <oldCommandName> <newCommandName>`).catch(console.error);
        }

        const [oldCommandName, newCommandName] = args;

        // Check if the old command exists
        const oldCommand = client.commands.get(oldCommandName);
        if (!oldCommand) {
            return message.edit(`Command \`${oldCommandName}\` does not exist.`).catch(console.error);
        }

        // Check if the new command name is already taken
        if (client.commands.has(newCommandName)) {
            return message.edit(`Command \`${newCommandName}\` already exists.`).catch(console.error);
        }

        // Rename the command
        client.commands.set(newCommandName, oldCommand);
        client.commands.delete(oldCommandName);

        // Update the command name in the command object
        oldCommand.name = newCommandName;

        return message.edit(`Command \`${oldCommandName}\` has been renamed to \`${newCommandName}\`.`).catch(console.error);
    }
};
