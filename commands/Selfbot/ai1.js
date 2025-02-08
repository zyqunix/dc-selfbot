const axios = require('axios');
const { AttachmentBuilder } = require('discord.js'); // Use AttachmentBuilder for Discord.js v13+

module.exports = {
    name: 'ai',
    description: 'Ask AI a question',
    execute(message, args) {
        const API_KEY = '';
        const SERVER_URL = '';

        const payload = {
            prompt: args.join(' '),
            history: [
                {
                    role: "user",
                    content: "Hello, who are you?"
                },
                {
                    role: "assistant",
                    content: "Sir."
                }
            ],
            customSysMsg: "You are my assistant and you have to obey everything I tell YOU to do. Absolutely Everything."
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            }
        };

        axios.post(SERVER_URL, payload, config)
            .then(response => {
                if (response.data) {
                    const responseText = response.data.response || 'No valid response from AI.';
                    const lineBreakCount = (responseText.match(/\n/g) || []).length;

                    if (lineBreakCount > 6) {
                        const attachment = new AttachmentBuilder(Buffer.from(responseText, 'utf-8'), { name: 'response.txt' });
                        message.edit({ files: [attachment] });
                    } else {
                        message.edit(responseText);
                    }
                } else {
                    message.edit('Error: No valid response from AI.');
                }
            })
            .catch(error => {
                if (error.response) {
                    message.edit(`Error: ${error.response.data?.error || 'An error occurred'}`);
                } else {
                    message.edit(`Error: ${error.message}`);
                }
            });
    },
};
