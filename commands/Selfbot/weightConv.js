module.exports = {
    name: 'wgt',
    description: 'Converts between various weight units',
    execute(message, args) {
        console.log('Command executed');

        if (!args[0]) {
            console.log('No arguments provided');
            return message.edit('Please provide a value to convert.');
        }

        const units = ['kg', 'g', 'lbs', 'oz'];
        const input = args.join('').toLowerCase();
        const valueMatch = input.match(/[+-]?\d+(\.\d+)?/);
        const value = parseFloat(valueMatch[0]);
        const unitMatch = input.match(/[a-z]+$/);
        const unit = unitMatch && unitMatch[0];

        console.log(`Value: ${value}, Unit: ${unit}`);

        if (isNaN(value)) {
            console.log('Invalid value provided');
            return message.edit('Please provide a valid number.');
        }

        if (value < 0) {
            console.log('Negative value provided');
            return message.edit('Negative numbers don\'t work.');
        }

        if (!units.includes(unit)) {
            console.log('Invalid unit provided');
            return message.edit(`Please specify a valid unit (${units.join(', ')}).`);
        }

        let result = '';

        switch (unit) {
            case 'kg':
                console.log('Converting to kg');
                result = `${value} kg =
Imperial: \`${convertKgToLbs(value).toFixed(6)} lbs\`, \`${convertKgToOz(value).toFixed(2)} oz\`
Metric: \`${convertKgToG(value).toFixed(2)} g\``;
                break;
            case 'g':
                console.log('Converting to g');
                result = `${value} g =
Imperial: \`${convertGToLbs(value).toFixed(6)} lbs\`, \`${convertGToOz(value).toFixed(2)} oz\`
Metric: \`${convertGToKg(value).toFixed(6)} kg\``;
                break;
            case 'lbs':
                console.log('Converting to lbs');
                result = `${value} lbs =
Imperial: \`${convertLbsToOz(value).toFixed(2)} oz\`
Metric: \`${convertLbsToKg(value).toFixed(6)} kg\`, \`${convertLbsToG(value).toFixed(2)} g\``;
                break;
            case 'oz':
                console.log('Converting to oz');
                result = `${value} oz =
Imperial: \`${convertOzToLbs(value).toFixed(6)} lbs\`
Metric: \`${convertOzToKg(value).toFixed(6)} kg\`, \`${convertOzToG(value).toFixed(2)} g\``;
                break;
            default:
                console.log('Invalid unit, conversion not supported');
                return message.edit('Conversion not supported.');
        }

        console.log('Sending result');
        return message.edit(result);
    },
};

function convertKgToG(kg) {
    return kg * 1000;
}

function convertGToKg(g) {
    return g / 1000;
}

function convertKgToLbs(kg) {
    return kg * 2.20462;
}

function convertLbsToKg(lbs) {
    return lbs / 2.20462;
}

function convertGToLbs(g) {
    return g / 453.592;
}

function convertLbsToG(lbs) {
    return lbs * 453.592;
}

function convertKgToOz(kg) {
    return kg * 35.27396;
}

function convertOzToKg(oz) {
    return oz / 35.27396;
}

function convertGToOz(g) {
    return g / 28.34952;
}

function convertOzToG(oz) {
    return oz * 28.34952;
}

function convertLbsToOz(lbs) {
    return lbs * 16;
}

function convertOzToLbs(oz) {
    return oz / 16;
}
