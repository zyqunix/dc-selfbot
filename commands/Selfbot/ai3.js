const axios = require('axios');
const { AttachmentBuilder } = require('discord.js');

const sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

module.exports = {
    name: 'askddg',
    description: 'Ask DuckDuckGo through the API and get a response',
    async execute(message, args) {
        const query = args.join(' ');
        const SERVER_URL = 'https://api.vot.wtf/askDDG'; // RIP VOT
        const API_KEY = '';

        const payload = {
            query: query,
            model: "gpt-4o-mini",
            sessionId
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': API_KEY,
            }
        };

        const startTime = Date.now();

        try {
            const response = await axios.post(SERVER_URL, payload, config);

            const responseTime = Date.now() - startTime;

            if (response.data) {
                const responseText = response.data.response || 'No valid response from the API.';
                const lineBreakCount = (responseText.match(/\n/g) || []).length;

                const responseMessage = `-# Response time: ${responseTime}ms`;

                if (lineBreakCount > 6) {
                    const attachment = new AttachmentBuilder(Buffer.from(responseText, 'utf-8'), { name: 'response.txt' });
                    message.edit({ files: [attachment] });
                } else {
                    message.edit(`${responseText}\n${responseMessage}`);
                }
            } else {
                message.edit(`Error: No valid response from the API.\n-# Response time: ${responseTime}ms`);
				console.log(response.data)
            }
        } catch (error) {
            const responseTime = Date.now() - startTime;

            if (error.response) {
                message.edit(`Error: ${error.response.data?.error || 'An error occurred'}\n-# Response time: ${responseTime}ms`);
            } else {
                message.edit(`Error: ${error.message}\n-# Response time: ${responseTime}ms`);
            }
        }
    },
};
