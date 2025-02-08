const { LoremIpsum } = require('lorem-ipsum');

module.exports = {
    name: 'lorem',
    description: 'Generates random Lorem Ipsum text with a specified number of sentences',
    execute(message, args) {
        if (!args.length || isNaN(args[0])) {
            return message.edit('Please provide a valid number of sentences.');
        }

        let sentenceCount = parseInt(args[0], 10);

        if (sentenceCount <= 0) {
            return message.edit('Please provide a positive number of sentences.');
        }

        const lorem = new LoremIpsum({
            sentencesPerParagraph: {
                max: sentenceCount,
                min: sentenceCount
            },
            wordsPerSentence: {
                max: 16,
                min: 4
            }
        });

        const loremText = lorem.generateSentences(sentenceCount);

        message.edit(loremText);
    },
};
