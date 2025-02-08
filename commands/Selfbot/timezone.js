let savedTimezone = 'Europe/Berlin'; // default timezone

module.exports = {
    name: 'timezone',
    description: 'Displays or sets the current timezone',
    execute(message, args) {
        if (args[0] === 'set') {
            const timezone = args[1];
            if (!timezone) {
                return message.edit('Please provide a valid timezone!');
            }
            savedTimezone = timezone;
            message.edit(`Timezone set to ${timezone}!`);
        } else {
            const now = new Date();
            message.edit(`The current time is: ${now.toLocaleTimeString('de-DE', { timeZone: savedTimezone })}, timezone: ${savedTimezone}`);
        }
    },
};