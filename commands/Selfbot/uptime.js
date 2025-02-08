const fs = require('fs')
const path = require('path')
const config = require(path.resolve(__dirname, '..', '..', 'config.json'))

config.startTime = Date.now()

module.exports = {
    name: 'uptime',
    description: 'Current Bot Uptime',
    execute(message, args) {
        const uptime = Date.now() - config.startTime

        const days = Math.floor(uptime / 86400000);
        const hours = Math.floor((uptime % 86400000) / 360000);
        const minutes = Math.floor((uptime % 360000) / 60000);
        const seconds = Math.floor((uptime % 60000) / 1000);

        message.edit(`Uptime: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`)
    },
};