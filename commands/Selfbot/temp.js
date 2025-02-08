module.exports = {
    name: 'temp',
    description: 'Converts Temperatures',
    execute(message, args) {
        if (!args[0]) return message.edit('Please provide a value to convert.');

        const arg = args[0].toLowerCase();
        const unit = arg.slice(-1);
        const value = parseFloat(arg.slice(0, -1));

        if (isNaN(value)) {
            return message.edit('Please provide a valid number.');
        }

        if (unit === 'f' || unit === 'F') {
            const c = convertFToC(value);
            const k = convertCToK(c);
            return message.edit(`${value}°F = \`${c.toFixed(2)}°C\` = \`${k.toFixed(2)}K\``);
        } else if (unit === 'c' || unit === 'C') {
            const f = convertCToF(value);
            const k = convertCToK(value);
            return message.edit(`${value}°C = \`${f.toFixed(2)}°F\` = \`${k.toFixed(2)}K\``);
        } else if (unit === 'k' || unit === 'K') {
            const c = convertKToC(value);
            const f = convertKToF(value);
            return message.edit(`${value}K = \`${c.toFixed(2)}°C\` = \`${f.toFixed(2)}°F\``);
        } else {
            return message.edit('Please specify the unit (F, C, or K).');
        }
    },
};

function convertFToC(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function convertCToF(celsius) {
    return (celsius * 9 / 5) + 32;
}

function convertCToK(celsius) {
    return celsius + 273.15;
}

function convertKToC(kelvin) {
    return kelvin - 273.15;
}

function convertKToF(kelvin) {
    return (kelvin - 273.15) * 9 / 5 + 32;
}
