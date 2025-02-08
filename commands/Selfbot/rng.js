module.exports = {
    name: 'rng',
    description: 'Generates a random number within a specified range',
    execute(message, args) {
        if (args.length !== 2) {
            message.edit('Please provide two numbers: the starting number and the ending number.');
            return;
        }

        const startNum = parseInt(args[0]);
        const endNum = parseInt(args[1]);

        if (isNaN(startNum) || isNaN(endNum)) {
            message.edit('Please provide valid numbers.');
            return;
        }

        const randomNumber = Math.floor(Math.random() * (endNum - startNum + 1)) + startNum;
        message.edit(`Random number between ${startNum} and ${endNum}: \`${randomNumber}\``);
    },
};
