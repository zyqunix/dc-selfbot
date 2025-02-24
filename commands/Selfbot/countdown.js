module.exports = {
    name: 'cd',
    description: 'Counts down',
    async execute(message, args) {
        if (!args.length || isNaN(args[0])) {
            return message.edit('Please provide a valid number of seconds.');
        }

        let seconds = parseInt(args[0], 10);

        if (seconds <= 0) {
            return message.edit('Please provide a positive number of seconds.');
        }

        const countdownMessage = args.slice(1).join(' ') || 'Countdown';

        const countdownMessageObject = await message.edit(`${countdownMessage} in ${seconds} seconds...`);

        const interval = setInterval(async () => {
            seconds--;

            if (seconds > 0) {
                countdownMessageObject.edit(`${countdownMessage} in ${seconds} seconds...`);
            } else {
                clearInterval(interval);
                countdownMessageObject.edit(`${countdownMessage} complete!`);
            }
        }, 1000); // Update every second
    },
};
