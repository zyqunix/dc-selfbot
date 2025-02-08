module.exports = {
    name: 'time',
    description: 'Converts between various time units',
    execute(message, args) {
        if (!args[0]) return message.edit('Please provide a value to convert.');
        
        const units = ['ms', 's', 'min', 'h', 'd', 'wk', 'yr'];
        const input = args.join('').toLowerCase();
        const valueMatch = input.match(/[+-]?\d+(\.\d+)?/);
        const value = parseFloat(valueMatch[0]);
        const unitMatch = input.match(/[a-z]+$/);
        const unit = unitMatch && unitMatch[0];
        
        if (isNaN(value)) {
            return message.edit('Please provide a valid number.');
        }
        
        if (!units.includes(unit)) {
            return message.edit(`Please specify a valid unit (${units.join(', ')}).`);
        }
        
        let result = convertTime(value, unit);
        
        return message.edit(result);
    },
};

function convertTime(value, unit) {
    switch(unit) {
        case 'ms':
            return `${value} milliseconds = \`${convertMsToS(value).toFixed(2)} seconds\`, \`${convertMsToMin(value).toFixed(2)} minutes\`, \`${convertMsToH(value).toFixed(2)} hours\`, \`${convertMsToD(value).toFixed(2)} days\`, \`${convertMsToWk(value).toFixed(2)} weeks\`, \`${convertMsToYr(value).toFixed(6).replace(/\.?0+$/, '')} years\``;
        case 's':
            return `${value} seconds = \`${convertSToMs(value).toFixed(2)} milliseconds\`, \`${convertSToMin(value).toFixed(2)} minutes\`, \`${convertSToH(value).toFixed(2)} hours\`, \`${convertSToD(value).toFixed(2)} days\`, \`${convertSToWk(value).toFixed(2)} weeks\`, \`${convertSToYr(value).toFixed(6).replace(/\.?0+$/, '')} years\``;
        case 'in':
            return `${value} minutes = \`${convertMinToMs(value).toFixed(2)} milliseconds\`, \`${convertMinToS(value).toFixed(2)} seconds\`, \`${convertMinToH(value).toFixed(2)} hours\`, \`${convertMinToD(value).toFixed(2)} days\`, \`${convertMinToWk(value).toFixed(2)} weeks\`, \`${convertMinToYr(value).toFixed(6).replace(/\.?0+$/, '')} years\``;
        case 'h':
            return `${value} hours = \`${convertHToMs(value).toFixed(2)} milliseconds\`, \`${convertHToS(value).toFixed(2)} seconds\`, \`${convertHToMin(value).toFixed(2)} minutes\`, \`${convertHToD(value).toFixed(2)} days\`, \`${convertHToWk(value).toFixed(2)} weeks\`, \`${convertHToYr(value).toFixed(6).replace(/\.?0+$/, '')} years\``;
        case 'd':
            return `${value} days = \`${convertDToMs(value).toFixed(2)} milliseconds\`, \`${convertDToS(value).toFixed(2)} seconds\`, \`${convertDToMin(value).toFixed(2)} minutes\`, \`${convertDToH(value).toFixed(2)} hours\`, \`${convertDToWk(value).toFixed(2)} weeks\`, \`${convertDToYr(value).toFixed(6).replace(/\.?0+$/, '')} years\``;
        case 'wk':
            return `${value} weeks = \`${convertWkToMs(value).toFixed(2)} milliseconds\`, \`${convertWkToS(value).toFixed(2)} seconds\`, \`${convertWkToMin(value).toFixed(2)} minutes\`, \`${convertWkToH(value).toFixed(2)} hours\`, \`${convertWkToD(value).toFixed(2)} days\`, \`${convertWkToYr(value).toFixed(6).replace(/\.?0+$/, '')} years\``;
        case 'yr':
            return `${value} years = \`${convertYrToMs(value).toFixed(2)} milliseconds\`, \`${convertYrToS(value).toFixed(2)} seconds\`, \`${convertYrToMin(value).toFixed(2)} minutes\`, \`${convertYrToH(value).toFixed(2)} hours\`, \`${convertYrToD(value).toFixed(2)} days\`, \`${convertYrToWk(value).toFixed(2)} weeks\``;
        default:
            return 'Conversion not supported yet.';
    }
}

// Conversion functions for time units
function convertMsToS(milliseconds) { return milliseconds / 1000; }
function convertMsToMin(milliseconds) { return milliseconds / 60000; }
function convertMsToH(milliseconds) { return milliseconds / 3600000; }
function convertMsToD(milliseconds) { return milliseconds / 86400000; }
function convertMsToWk(milliseconds) { return milliseconds / 604800000; }
function convertMsToYr(milliseconds) { return milliseconds / 31536000000; }

function convertSToMs(seconds) { return seconds * 1000; }
function convertSToMin(seconds) { return seconds / 60; }
function convertSToH(seconds) { return seconds / 3600; }
function convertSToD(seconds) { return seconds / 86400; }
function convertSToWk(seconds) { return seconds / 604800; }
function convertSToYr(seconds) { return seconds / 31536000; }

function convertMinToMs(minutes) { return minutes * 60000; }
function convertMinToS(minutes) { return minutes * 60; }
function convertMinToH(minutes) { return minutes / 60; }
function convertMinToD(minutes) { return minutes / 1440; }
function convertMinToWk(minutes) { return minutes / 10080; }
function convertMinToYr(minutes) { return minutes / 525600; }

function convertHToMs(hours) { return hours * 3600000; }
function convertHToS(hours) { return hours * 3600; }
function convertHToMin(hours) { return hours * 60; }
function convertHToD(hours) { return hours / 24; }
function convertHToWk(hours) { return hours / 168; }
function convertHToYr(hours) { return hours / 8760; }

function convertDToMs(days) { return days * 86400000; }
function convertDToS(days) { return days * 86400; }
function convertDToMin(days) { return days * 1440; }
function convertDToH(days) { return days * 24; }
function convertDToWk(days) { return days / 7; }
function convertDToYr(days) { return days / 365; }

function convertWkToMs(weeks) { return weeks * 604800000; }
function convertWkToS(weeks) { return weeks * 604800; }
function convertWkToMin(weeks) { return weeks * 10080; }
function convertWkToH(weeks) { return weeks * 168; }
function convertWkToD(weeks) { return weeks * 7; }
function convertWkToYr(weeks) { return weeks / 52.1429; }

function convertYrToMs(years) { return years * 31536000000; }
function convertYrToS(years) { return years * 31536000; }
function convertYrToMin(years) { return years * 525600; }
function convertYrToH(years) { return years * 8760; }
function convertYrToD(years) { return years * 365; }
function convertYrToWk(years) { return years * 52.1429; }