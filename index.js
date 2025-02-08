const { Client, Intents } = require("discord.js-selfbot-v13");
const fs = require('fs').promises;
const config = require('./config.json');
process.noDeprecation = true;

const logFile = require('fs').createWriteStream('stdout.log', { flags: 'a' });
const logStdout = process.stdout;
console.log = function(...args) {
    logFile.write(require('util').format(...args) + '\n');
    logStdout.write(require('util').format(...args) + '\n');
};
console.error = console.log;

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    checkUpdate: false,
    restTimeOffset: 0,
});

const snipedMessages = new Map();
const editedMessages = new Map();
const reactUserIDs = new Set();

client.on('messageDelete', message => {
    snipedMessages.set(message.channel.id, message);
});

client.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage.content !== newMessage.content) {
        editedMessages.set(newMessage.channel.id, { oldMessage, newMessage });
    }
});

client.commands = new Map();

const loadCommands = async () => {
    const categories = await fs.readdir('./commands');
    for (const category of categories) {
        const commandFiles = await fs.readdir(`./commands/${category}`);
        for (const file of commandFiles) {
            const command = require(`./commands/${category}/${file}`);
            client.commands.set(command.name, command);
        }
    }
};

client.once('ready', async () => {
    console.log('Connected!');
    console.log(`${config.prefix}help for a list of commands`);
    const user = await client.users.fetch(client.user.id);
    config.userId = user.id;

    await loadCommands();

    if (!client.commands.has('afk')) {
        console.error("Error: 'afk' command not found in client.commands");
    }
});

const emojiMap = {
    '0': '0️⃣', '1': '1️⃣', '2': '2️⃣', '3': '3️⃣', '4': '4️⃣',
    '5': '5️⃣', '6': '6️⃣', '7': '7️⃣', '8': '8️⃣', '9': '9️⃣',
    'a': '🇦', 'b': '🇧', 'c': '🇨', 'd': '🇩', 'e': '🇪', 'f': '🇫',
    'g': '🇬', 'h': '🇭', 'i': '🇮', 'j': '🇯', 'k': '🇰', 'l': '🇱',
    'm': '🇲', 'n': '🇳', 'o': '🇴', 'p': '🇵', 'q': '🇶', 'r': '🇷',
    's': '🇸', 't': '🇹', 'u': '🇺', 'v': '🇻', 'w': '🇼', 'x': '🇽',
    'y': '🇾', 'z': '🇿'
};

client.on('messageCreate', async message => {
    if (message.author.bot || (!reactUserIDs.has(message.author.id) && message.author.id !== config.userId)) return;

    if (!message.content.startsWith(config.prefix)) {
        const afkCommand = client.commands.get('afk');
        if (afkCommand && afkCommand.checkAFK) {
            afkCommand.checkAFK(message);
        } else {
            console.error("Error: 'afk' command or 'checkAFK' method is undefined");
        }
    }

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (message.content.startsWith(config.prefix)) {
        if (!command) {
            return;
        }

        if (args.length > 0) {
            console.log(`${config.prefix}${commandName} ${args.join(' ')}`);
        } else {
            console.log(`${config.prefix}${commandName}`);
        }

        try {
            const isValid = command.validateArgs ? command.validateArgs(args) : true;
            if (!isValid) {
                message.reply("Invalid usage");
                return;
            }
            if (commandName === 's') {
                await command.execute(message, args, client, snipedMessages);
            } else if (commandName === 'sedit') {
                await command.execute(message, args, client, editedMessages);
            } else if (commandName === 'logs') {
                await command.execute(message, args, client, config);
            } else if (commandName === 'clearlogs') {
                await command.execute(message, args, client, config);
            } else if (commandName === 'kill') {
                await command.execute(message, args, client, config);
            } else {
                await command.execute(message, args, client, snipedMessages, editedMessages);
            }
        } catch (error) {
            console.error(error);
            message.reply('Nope');
        } finally {
            message.edit().catch(console.error);
        }
    } else if (client.commands.get('react').shouldAutoReact() && message.reference === null) {
        const content = message.content.toLowerCase();
        const alphanumericChars = [...new Set(content.replace(/[^a-zA-Z0-9]/g, '').split(''))];

        for (const char of alphanumericChars) {
            const emoji = emojiMap[char];
            if (emoji) {
                try {
                    await message.react(emoji);
                } catch (error) {
                    console.error(`Could not react with ${char}:`, error);
                }
            }
        }
    }
});

client.login(config.token);
