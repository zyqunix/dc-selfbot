module.exports = {
    name: 'ip',
    description: 'Look up information about an IP address',
    async execute(message, args) {
        if (!args.length) {
            return message.edit('Please provide an IP address.');
        }

        const ip = args[0];
        const url = `https://ipinfo.io/${ip}/json`;

        try {
            const { default: fetch } = await import('node-fetch');
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            if (data.error) {
                return message.edit('Unable to get information for this IP address.');
            }

            const info = `
                IP: ${data.ip}
                City: ${data.city}
                Region: ${data.region}
                Country: ${data.country}
                Org: ${data.org}
                Location: ${data.loc}
                Timezone: ${data.timezone}
            `;
            message.edit(info);
        } catch (error) {
            console.error('Error fetching IP info:', error);
            message.edit('There was an error trying to fetch the IP information.');
        }
    },
};
