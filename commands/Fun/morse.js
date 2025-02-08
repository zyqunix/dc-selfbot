module.exports = {
    name: 'morse',
    description: 'Morse to Latin, vice verca',
    execute(message, args) {
        const morseToLatinMap = {
            '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
            '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
            '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
            '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
            '-.--': 'Y', '--..': 'Z',
            '-----': '0', '.----': '1', '..---': '2', '...--': '3', '....-': '4',
            '.....': '5', '-....': '6', '--...': '7', '---..': '8', '----.': '9',
            '/': ' '
        };

        const latinToMorseMap = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
            'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
            'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
            'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
            'Y': '-.--', 'Z': '--..',
            '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
            '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
            ' ': '/'
        };

        const inputText = args.join(' ');

        if (inputText.match(/[-.\/]/)) {
            const morseWords = inputText.split('   ');
            const latinText = morseWords.map(word =>
                word.split(' ').map(code => morseToLatinMap[code] || '').join('')
            ).join(' ');
            message.edit(latinText);
        } else {
            const morseText = inputText.toUpperCase().split('').map(char =>
                latinToMorseMap[char] || ''
            ).join(' ');
            message.edit(morseText);
        }
    },
};
