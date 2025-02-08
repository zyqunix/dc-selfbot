module.exports = {
    name: 'dis',
    description: 'Converts between various units',
    execute(message, args) {
        if (!args[0]) return message.edit('Please provide a value to convert.');

        const units = ['ft', 'in', 'cm', 'mi', 'yd', 'km', 'm', 'mm'];
        const input = args.join('').toLowerCase();

        // Declare result at the beginning
        let result = '';

        // Regex to capture feet and inches format like "5'6ft"
        const feetInchesMatch = input.match(/(\d+)'(\d+)/);

        if (feetInchesMatch) {
            const feet = parseInt(feetInchesMatch[1], 10);
            const inches = parseInt(feetInchesMatch[2], 10);
            const totalInches = (feet * 12) + inches;

            result = `${feet} feet and ${inches} inches =
Imperial: \`${totalInches} inches\`, \`${(totalInches / 36).toFixed(2)} yards\`, \`${(totalInches / 63360).toFixed(6).replace(/\.?0+$/, '')} miles\`
Metric: \`${convertInToMm(totalInches).toFixed(2)} mm\`, \`${convertInToCm(totalInches).toFixed(2)} cm\`, \`${convertInToM(totalInches).toFixed(2)} meters\`, \`${(convertInToCm(totalInches) / 100000).toFixed(6).replace(/\.?0+$/, '')} km\``;

            return message.edit(result);
        }

        const valueMatch = input.match(/[+-]?\d+(\.\d+)?/);
        const value = parseFloat(valueMatch[0]);
        const unitMatch = input.match(/[a-z]+$/);
        const unit = unitMatch && unitMatch[0];

        if (isNaN(value)) {
            return message.edit('Please provide a valid number.');
        }

        if (value < 0) {
            return message.edit('Negative numbers don\'t work.');
        }

        if (!units.includes(unit)) {
            return message.edit(`Please specify a valid unit (${units.join(', ')}).`);
        }

        switch (unit) {
            case 'ft':
                result = `${value} feet =
Imperial: \`${convertFtToIn(value).toFixed(2)} inches\`, \`${convertFtToYd(value).toFixed(2)} yards\`, \`${convertFtToMi(value).toFixed(6).replace(/\.?0+$/, '')} miles\`
Metric: \`${convertFtToMm(value).toFixed(2)} mm\`, \`${convertFtToCm(value).toFixed(2)} cm\`, \`${convertFtToM(value).toFixed(2)} meters\`, \`${convertFtToKm(value).toFixed(6).replace(/\.?0+$/, '')} km\``;
                break;
            case 'in':
                const ftFromIn = convertInToFt(value);
                const cmFromIn = convertFtToCm(ftFromIn);
                result = `${value} inches =
Imperial: \`${ftFromIn.toFixed(2)} feet\`, \`${(cmFromIn / 91.44).toFixed(2)} yards\`, \`${(cmFromIn / 100000).toFixed(6).replace(/\.?0+$/, '')} miles\`
Metric: \`${convertInToMm(value).toFixed(2)} mm\`, \`${cmFromIn.toFixed(2)} cm\`, \`${convertInToM(value).toFixed(2)} meters\`, \`${(cmFromIn / 100000).toFixed(6).replace(/\.?0+$/, '')} km\``;
                break;
            case 'cm':
                result = `${value} cm =
Imperial: \`${convertCmToIn(value).toFixed(2)} inches\`, \`${convertCmToFt(value).toFixed(2)} feet\`, \`${(value / 91.44).toFixed(2)} yards\`, \`${(value / 100000).toFixed(6).replace(/\.?0+$/, '')} miles\`
Metric: \`${convertCmToMm(value).toFixed(2)} mm\`, \`${convertCmToM(value).toFixed(2)} meters\`, \`${(value / 100000).toFixed(6).replace(/\.?0+$/, '')} km\``;
                break;
            case 'mi':
                const ftFromMi = convertMiToFt(value);
                result = `${value} miles =
Imperial: \`${ftFromMi.toFixed(2)} feet\`, \`${convertMiToYd(value).toFixed(2)} yards\`
Metric: \`${convertMiToMm(value).toFixed(2)} mm\`, \`${convertMiToCm(value).toFixed(2)} cm\`, \`${convertMiToM(value).toFixed(2)} meters\`, \`${convertMiToKm(value).toFixed(2)} km\``;
                break;
            case 'yd':
                result = `${value} yards =
Imperial: \`${convertYdToFt(value).toFixed(2)} feet\`, \`${(value / 1760).toFixed(6).replace(/\.?0+$/, '')} miles\`
Metric: \`${convertYdToMm(value).toFixed(2)} mm\`, \`${convertYdToCm(value).toFixed(2)} cm\`, \`${convertYdToM(value).toFixed(2)} meters\`, \`${(value / 1093.61).toFixed(6).replace(/\.?0+$/, '')} km\``;
                break;
            case 'km':
                result = `${value} kilometers =
Imperial: \`${convertKmToFt(value).toFixed(2)} feet\`, \`${(value * 0.6213).toFixed(6).replace(/\.?0+$/, '')} miles\`, \`${(value * 1093.61).toFixed(2)} yards\`
Metric: \`${convertKmToMm(value).toFixed(2)} mm\`, \`${(value * 100000).toFixed(2)} cm\`, \`${convertKmToM(value).toFixed(2)} meters\``;
                break;
            case 'm':
                result = `${value} meters =
Imperial: \`${convertMToIn(value).toFixed(2)} inches\`, \`${convertMToFt(value).toFixed(2)} feet\`, \`${convertMToYd(value).toFixed(2)} yards\`, \`${convertMToMi(value).toFixed(6).replace(/\.?0+$/, '')} miles\`
Metric: \`${convertMToMm(value).toFixed(2)} mm\`, \`${convertMToCm(value).toFixed(2)} cm\`, \`${convertMToKm(value).toFixed(6).replace(/\.?0+$/, '')} km\``;
                break;
            case 'mm':
                result = `${value} millimeters =
Imperial: \`${convertMmToIn(value).toFixed(2)} inches\`, \`${convertMmToFt(value).toFixed(2)} feet\`, \`${(convertMmToYd(value).toFixed(2))} yards\`, \`${convertMmToMi(value).toFixed(6).replace(/\.?0+$/, '')} miles\`
Metric: \`${convertMmToCm(value).toFixed(2)} cm\`, \`${convertMmToM(value).toFixed(2)} meters\`, \`${convertMmToKm(value).toFixed(6).replace(/\.?0+$/, '')} km\``;
                break;
            default:
                return message.edit('Conversion not supported yet.');
        }

        return message.edit(result);
    },
};

function convertFtToCm(ft) { return ft * 30.48; }
function convertFtToIn(ft) { return ft * 12; }
function convertFtToMi(ft) { return ft / 5280; }
function convertFtToYd(ft) { return ft / 3; }
function convertFtToKm(ft) { return ft / 3280.84; }
function convertFtToM(ft) { return ft / 3.28084; }
function convertFtToMm(ft) { return ft * 304.8; }

function convertInToFt(inches) { return inches / 12; }
function convertInToCm(inches) { return inches * 2.54; }
function convertInToM(inches) { return inches * 0.0254; }
function convertInToMm(inches) { return inches * 25.4; }

function convertCmToFt(cm) { return cm / 30.48; }
function convertCmToIn(cm) { return cm / 2.54; }
function convertCmToM(cm) { return cm / 100; }
function convertCmToMm(cm) { return cm * 10; }

function convertMiToFt(mi) { return mi * 5280; }
function convertMiToCm(mi) { return mi * 160934; }
function convertMiToYd(mi) { return mi * 1760; }
function convertMiToKm(mi) { return mi * 1.60934; }
function convertMiToM(mi) { return mi * 1609.34; }
function convertMiToMm(mi) { return mi * 1609344; }

function convertYdToFt(yd) { return yd * 3; }
function convertYdToCm(yd) { return yd * 91.44; }
function convertYdToM(yd) { return yd * 0.9144; }
function convertYdToMm(yd) { return yd * 914.4; }

function convertKmToFt(km) { return km * 3280.84; }
function convertKmToM(km) { return km * 1000; }
function convertKmToMm(km) { return km * 1000000; }

function convertMToFt(m) { return m * 3.28084; }
function convertMToIn(m) { return m * 39.3701; }
function convertMToCm(m) { return m * 100; }
function convertMToMi(m) { return m / 1609.34; }
function convertMToYd(m) { return m * 1.09361; }
function convertMToKm(m) { return m / 1000; }
function convertMToMm(m) { return m * 1000; }

function convertMmToFt(mm) { return mm / 304.8; }
function convertMmToIn(mm) { return mm / 25.4; }
function convertMmToCm(mm) { return mm / 10; }
function convertMmToM(mm) { return mm / 1000; }
function convertMmToMi(mm) { return mm / 1609344; }
function convertMmToYd(mm) { return mm / 914.4; }
function convertMmToKm(mm) { return mm / 1000000; }
