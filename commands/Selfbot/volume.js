module.exports = {
    name: 'vol',
    description: 'Converts between various volume units',
    execute(message, args) {
        if (!args[0]) return message.edit('Please provide a value to convert.');
        
        const units = ['l', 'ml', 'm3', 'gal', 'qt', 'pt', 'fl oz'];
        const input = args.join('').toLowerCase();
        const valueMatch = input.match(/[+-]?\d+(\.\d+)?/);
        const value = parseFloat(valueMatch[0]);
        const unitMatch = input.match(/[a-z ]+$/);
        const unit = unitMatch && unitMatch[0].trim();
        
        if (isNaN(value)) {
            return message.edit('Please provide a valid number.');
        }

        if (value < 0) {
            return message.edit('Negative numbers don\'t work.');
        }
        
        if (!units.includes(unit)) {
            return message.edit(`Please specify a valid unit (${units.join(', ')}).`);
        }
        
        let result = '';
        
        switch(unit) {
            case 'l':
                result = `${value} liters =\nImperial: \`${convertLToGal(value).toFixed(2)} gallons\`, \`${convertLToQt(value).toFixed(2)} quarts\`, \`${convertLToPt(value).toFixed(2)} pints\`, \`${convertLToFlOz(value).toFixed(2)} fluid ounces\`\nMetric: \`${convertLToMl(value).toFixed(2)} milliliters\`, \`${convertLToM3(value).toFixed(6)} cubic meters\``;
                break;
            case 'ml':
                result = `${value} milliliters =\nImperial: \`${convertMlToGal(value).toFixed(6)} gallons\`, \`${convertMlToQt(value).toFixed(6)} quarts\`, \`${convertMlToPt(value).toFixed(6)} pints\`, \`${convertMlToFlOz(value).toFixed(6)} fluid ounces\`\nMetric: \`${convertMlToL(value).toFixed(6)} liters\`, \`${convertMlToM3(value).toFixed(12)} cubic meters\``;
                break;
            case 'm3':
                result = `${value} cubic meters =\nImperial: \`${convertM3ToGal(value).toFixed(2)} gallons\`, \`${convertM3ToQt(value).toFixed(2)} quarts\`, \`${convertM3ToPt(value).toFixed(2)} pints\`, \`${convertM3ToFlOz(value).toFixed(2)} fluid ounces\`\nMetric: \`${convertM3ToL(value).toFixed(2)} liters\`, \`${convertM3ToMl(value).toFixed(2)} milliliters\``;
                break;
            case 'gal':
                result = `${value} gallons =\nImperial: \`${convertGalToQt(value).toFixed(2)} quarts\`, \`${convertGalToPt(value).toFixed(2)} pints\`, \`${convertGalToFlOz(value).toFixed(2)} fluid ounces\`\nMetric: \`${convertGalToL(value).toFixed(2)} liters\`, \`${convertGalToMl(value).toFixed(2)} milliliters\`, \`${convertGalToM3(value).toFixed(6)} cubic meters\``;
                break;
            case 'qt':
                result = `${value} quarts =\nImperial: \`${convertQtToGal(value).toFixed(2)} gallons\`, \`${convertQtToPt(value).toFixed(2)} pints\`, \`${convertQtToFlOz(value).toFixed(2)} fluid ounces\`\nMetric: \`${convertQtToL(value).toFixed(2)} liters\`, \`${convertQtToMl(value).toFixed(2)} milliliters\`, \`${convertQtToM3(value).toFixed(6)} cubic meters\``;
                break;
            case 'pt':
                result = `${value} pints =\nImperial: \`${convertPtToGal(value).toFixed(2)} gallons\`, \`${convertPtToQt(value).toFixed(2)} quarts\`, \`${convertPtToFlOz(value).toFixed(2)} fluid ounces\`\nMetric: \`${convertPtToL(value).toFixed(2)} liters\`, \`${convertPtToMl(value).toFixed(2)} milliliters\`, \`${convertPtToM3(value).toFixed(6)} cubic meters\``;
                break;
            case 'fl oz':
                result = `${value} fluid ounces =\nImperial: \`${convertFlOzToGal(value).toFixed(6)} gallons\`, \`${convertFlOzToQt(value).toFixed(6)} quarts\`, \`${convertFlOzToPt(value).toFixed(6)} pints\`\nMetric: \`${convertFlOzToL(value).toFixed(6)} liters\`, \`${convertFlOzToMl(value).toFixed(2)} milliliters\`, \`${convertFlOzToM3(value).toFixed(12)} cubic meters\``;
                break;
            default:
                return message.edit('Conversion not supported yet.');
        }
        
        return message.edit(result);
    },
};

function convertLToMl(l) { return l * 1000; }
function convertLToM3(l) { return l / 1000; }
function convertLToGal(l) { return l / 3.78541; }
function convertLToQt(l) { return l / 0.946353; }
function convertLToPt(l) { return l * 2.11338; }
function convertLToFlOz(l) { return l * 33.814; }

function convertMlToL(ml) { return ml / 1000; }
function convertMlToM3(ml) { return ml / 1000000; }
function convertMlToGal(ml) { return ml / 3785.41; }
function convertMlToQt(ml) { return ml / 946.353; }
function convertMlToPt(ml) { return ml / 473.176; }
function convertMlToFlOz(ml) { return ml / 29.5735; }

function convertM3ToL(m3) { return m3 * 1000; }
function convertM3ToMl(m3) { return m3 * 1000000; }
function convertM3ToGal(m3) { return m3 * 264.172; }
function convertM3ToQt(m3) { return m3 * 1056.69; }
function convertM3ToPt(m3) { return m3 * 2113.38; }
function convertM3ToFlOz(m3) { return m3 * 33814; }

function convertGalToL(gal) { return gal * 3.78541; }
function convertGalToMl(gal) { return gal * 3785.41; }
function convertGalToM3(gal) { return gal / 264.172; }
function convertGalToQt(gal) { return gal * 4; }
function convertGalToPt(gal) { return gal * 8; }
function convertGalToFlOz(gal) { return gal * 128; }

function convertQtToGal(qt) { return qt / 4; }
function convertQtToL(qt) { return qt * 0.946353; }
function convertQtToMl(qt) { return qt * 946.353; }
function convertQtToM3(qt) { return qt / 1056.69; }
function convertQtToPt(qt) { return qt * 2; }
function convertQtToFlOz(qt) { return qt * 32; }

function convertPtToGal(pt) { return pt / 8; }
function convertPtToQt(pt) { return pt / 2; }
function convertPtToL(pt) { return pt * 0.473176; }
function convertPtToMl(pt) { return pt * 473.176; }
function convertPtToM3(pt) { return pt / 2113.38; }
function convertPtToFlOz(pt) { return pt * 16; }

function convertFlOzToGal(flOz) { return flOz / 128; }
function convertFlOzToQt(flOz) { return flOz / 32; }
function convertFlOzToPt(flOz) { return flOz / 16; }
function convertFlOzToL(flOz) { return flOz / 33.814; }
function convertFlOzToMl(flOz) { return flOz * 29.5735; }
function convertFlOzToM3(flOz) { return flOz / 33814; }
