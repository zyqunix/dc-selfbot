const axios = require('axios');
const { MessageAttachment } = require('discord.js');

module.exports = {
    name: 'guns',
    description: 'Ask AI a question',
    execute(message, args) {
        const url = '';
        const headers = {
            'x-api-key': '',
            'Content-Type': 'application/json'
        };
        const data = {
            prompt: args.join(' '),
            history: [
                { role: 'system', content: 'Welcome to DiddyAI, how can I help you?' },
                { role: 'user', content: 'Can I ask you a question?' },
                { role: 'assistant', content: 'Yes, I am ready for your question, what is it?' }
            ],
            'guns-dataset': true
        };

        axios.post(url, data, { headers: headers })
        .then(response => {
            if (response.data && response.data.response) {
                const responseText = response.data.response;
                const lineBreakCount = (responseText.match(/\n/g) || []).length;

                if (lineBreakCount > 6) {
                    const attachment = new MessageAttachment(Buffer.from(responseText, 'utf-8'), 'response.txt');
                    message.edit({ files: [attachment] });
                } else {
                    message.edit(responseText);
                }
            } else {
                message.edit('Error: No valid response from AI.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            message.edit(`Error: ${error.response?.data?.error || 'An error occurred'}`);
        });
    },
};
